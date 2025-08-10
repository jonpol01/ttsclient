# syntax=docker/dockerfile:1.6

FROM python:3.10-slim AS base

ENV DEBIAN_FRONTEND=noninteractive \
    POETRY_VERSION=1.8.3 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=1

# System dependencies for building native modules and audio support
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    git \
    ffmpeg \
    cmake \
    curl \
    ca-certificates \
    libsndfile1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy dependency files first for caching
COPY pyproject.toml poetry.lock* /app/

# Install Poetry
RUN pip install "poetry==${POETRY_VERSION}"

# Remove pyopenjtalk from Poetry deps (we'll install a patched build next)
# Also remove CUDA-specific torch sources and packages for Apple Silicon (CPU-only)
RUN sed -i '/^pyopenjtalk\b/d' pyproject.toml \
 && sed -i '/^torchaudio\b/d' pyproject.toml \
 && sed -i '/^torch\b/d' pyproject.toml \
 && sed -i '/^onnxruntime-gpu\b/d' pyproject.toml \
 && awk 'BEGIN{p=1} /\[\[tool\.poetry\.source\]\]/{p=0} p==1{print} /priority *= *"explicit"/{p=1}' pyproject.toml > pyproject.toml.tmp \
 && mv pyproject.toml.tmp pyproject.toml

# Install project dependencies (no dev)
RUN poetry config virtualenvs.create false \
 && poetry install --only main --no-interaction --no-ansi

# Install CPU wheels for PyTorch/torchaudio on ARM64 (Apple Silicon friendly)
RUN pip install --no-cache-dir --index-url https://download.pytorch.org/whl/cpu \
    torch==2.4.1 torchaudio==2.4.1

# Install patched pyopenjtalk 0.4.0 with relaxed cmake constraint
RUN curl -L -o pyopenjtalk-0.4.0.tar.gz "https://files.pythonhosted.org/packages/source/p/pyopenjtalk/pyopenjtalk-0.4.0.tar.gz" \
 && tar xzf pyopenjtalk-0.4.0.tar.gz \
 && sed -i -E 's/cmake_minimum_required\(VERSION[^\)]*\)/cmake_minimum_required(VERSION 3.5...3.31)/' pyopenjtalk-0.4.0/lib/open_jtalk/src/CMakeLists.txt \
 && pip install ./pyopenjtalk-0.4.0 \
 && rm -rf pyopenjtalk-0.4.0 pyopenjtalk-0.4.0.tar.gz

# Copy the rest of the repository
COPY . /app

# Ensure submodules are available (GPT-SoVITS)
RUN git submodule update --init --recursive

# Pre-create expected directories (also mounted as volumes at runtime)
RUN mkdir -p \
    /app/models \
    /app/voice_characters \
    /app/modules \
    /app/upload_dir \
    /app/ssl_key \
    /app/settings

ENV PYTHONUNBUFFERED=1 \
    HOST=0.0.0.0 \
    PORT=19000 \
    HTTPS=false \
    LAUNCH_CLIENT=false

# Add entrypoint
COPY docker/entrypoint.sh /usr/local/bin/ttsclient-entrypoint
RUN chmod +x /usr/local/bin/ttsclient-entrypoint

EXPOSE 19000

ENTRYPOINT ["/usr/local/bin/ttsclient-entrypoint"]

