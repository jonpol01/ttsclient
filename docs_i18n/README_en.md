[日本語](/README.md) /
[English](/docs_i18n/README_en.md) /
[한국어](/docs_i18n/README_ko.md)/
[中文](/docs_i18n/README_zh.md)/
[Deutsch](/docs_i18n/README_de.md)/
[العربية](/docs_i18n/README_ar.md)/
[Ελληνικά](/docs_i18n/README_el.md)/
[Español](/docs_i18n/README_es.md)/
[Français](/docs_i18n/README_fr.md)/
[Italiano](/docs_i18n/README_it.md)/
[Latina](/docs_i18n/README_la.md)/
[Bahasa Melayu](/docs_i18n/README_ms.md)/
[Русский](/docs_i18n/README_ru.md) 
  *Other languages are machine-translated.

TTSClient
---

A Text To Speech (TTS) client software. It is planned to support various AI models (currently only GPT-SoVITS v2, v3).

- Supported AI
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - coming soon...

# Samples

## Female Voice

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Multilingual

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Details

https://youtu.be/Fy7qifNB5T0

## What's New!
- v.1.0.21
  - new feature:
    - Added support for downloading [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) from zundamon-speech-webui samples.

- v.1.0.20
  - new feature:
    - Added support for GPT-SoVITS intonation adjustment.

- v.1.0.13
  - new feature:
    - Added support for GPT-SoVITS v3, including models fine-tuned with LoRA.
    - Enhanced reference voice registration. Now you can record directly from microphone or PC audio, and automatic text transcription is also performed.

## Related Software
- [Real-time Voice Changer VCClient](https://github.com/w-okada/voice-changer)

## Download
Please download from the [Hugging Face repository](https://huggingface.co/wok000/ttsclient000/tree/main).

- win_std edition: Windows edition that runs on CPU. Slower compared to the CUDA version, but works on recent decent-spec CPUs.
- win_cuda edition: Windows edition that runs on NVIDIA GPU. Runs faster with GPU hardware acceleration.
- mac edition: Edition for Mac (Apple silicon (M1, M2, M3, etc)).

## Usage
- After extracting the zip file, run `start_http.bat`. Access the displayed URL in your browser.
- Using `start_https.bat` allows access from remote locations.
- (Advanced) Using `start_http_with_ngrok.bat` enables access through ngrok tunneling.

note: For mac edition, replace .bat with .command.

### GPT-SoVITS

For model details, please refer to the official [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) repository.

In GPT-SoVITS, you select a model, reference voice, and reference text before generating speech. TTSClient has a concept of reference speakers, where a reference speaker can have multiple reference voices and reference texts.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Speech Generation

1. Select the model and reference speaker ((1), (2)).
2. Select the reference voice and reference text registered for the reference speaker (3).
3. Enter the text you want to generate and create the voice (4).

#### Model Registration

Register from the edit button in the model selection area.

#### Reference Speaker Registration

Register from the edit button in the reference speaker registration area.

#### Reference Voice and Text Registration

Select an unregistered slot in the reference voice selection area to register.

## Starting from Repository (Advanced)

### Ubuntu

* Requirements
  
  cmake

```
$ git clone https://github.com/w-okada/ttsclient.git
$ cd ttsclient/
$ git submodule update --init --recursive
$ sed -i '/pyopenjtalk/d' pyproject.toml
$ poetry install

$ wget "https://files.pythonhosted.org/packages/source/p/pyopenjtalk/pyopenjtalk-0.4.0.tar.gz"
$ tar xzf pyopenjtalk-0.4.0.tar.gz
$ sed -i -E 's/cmake_minimum_required\(VERSION[^\)]*\)/cmake_minimum_required(VERSION 3.5...3.31)/' pyopenjtalk-0.4.0/lib/open_jtalk/src/CMakeLists.txt
$ rm pyopenjtalk-0.4.0.tar.gz
$ tar czf pyopenjtalk-0.4.0.tar.gz pyopenjtalk-0.4.0/
$ poetry run pip install pyopenjtalk-0.4.0.tar.gz

$ poetry run main cui
---
To access from remote, add `--https true`.
---
$ poetry run main cui --https true
```

## Using CUDA
Replace the modules as follows:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Using DirectML
Replace the modules as follows:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Acknowledgements
- [JVNV Corpus](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus) 