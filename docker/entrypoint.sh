#!/usr/bin/env bash
set -euo pipefail

HOST_ARG=("--host" "${HOST:-0.0.0.0}")
PORT_ARG=("--port" "${PORT:-19000}")
HTTPS_ARG=("--https" "${HTTPS:-false}")
LAUNCH_CLIENT_ARG=("--launch_client" "${LAUNCH_CLIENT:-false}")

# Ensure expected directories exist when mounted as empty volumes
mkdir -p /app/models /app/voice_characters /app/modules /app/upload_dir /app/ssl_key /app/settings

# Run via Poetry to mirror local usage
exec poetry run main cui "${HOST_ARG[@]}" "${PORT_ARG[@]}" "${HTTPS_ARG[@]}" "${LAUNCH_CLIENT_ARG[@]}"

