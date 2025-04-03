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
  *다른 언어는 기계 번역입니다.

TTSClient
---

텍스트 투 스피치(TTS) 클라이언트 소프트웨어입니다. 다양한 AI 모델을 지원할 계획입니다 (현재는 GPT-SoVITS v2, v3만 지원).

- 지원 AI
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - 곧 추가 예정...

# 샘플

## 여성 음성

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## 다국어

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## 상세 정보

https://youtu.be/Fy7qifNB5T0

## 새로운 기능!
- v.1.0.21
  - 새로운 기능:
    - zundamon-speech-webui의 [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) 샘플을 다운로드할 수 있게 되었습니다.

- v.1.0.20
  - 새로운 기능:
    - GPT-SoVITS의 억양 조정이 가능해졌습니다.

- v.1.0.13
  - 새로운 기능:
    - GPT-SoVITS v3를 지원하며, LoRA로 파인튜닝된 모델도 지원합니다.
    - 참조 음성 등록이 강화되었습니다. 마이크나 PC 음성을 직접 녹음할 수 있으며, 자동으로 텍스트 전사도 수행됩니다.

## 관련 소프트웨어
- [실시간 음성 변조 VCClient](https://github.com/w-okada/voice-changer)

## 다운로드

[チュートリアル 日本語](https://youtu.be/deOsmixKfbw) /
[Tutorial English](https://youtu.be/BhSIvoxSuxQ) /
[튜토리얼 한국어](https://youtu.be/FZINjbzdUgg)/
[教程 中文(zh)](https://youtu.be/IkOMV6rViog)/
[教程 中文(yue)](https://youtu.be/4Ms_9SBIbKk)/

[Hugging Face 저장소](https://huggingface.co/wok000/ttsclient000/tree/main)에서 다운로드하세요.

- win_std 에디션: CPU에서 실행되는 Windows용 에디션입니다. CUDA 버전에 비해 느리지만, 최근의 적절한 사양의 CPU에서는 작동합니다.
- win_cuda 에디션: NVIDIA GPU에서 실행되는 Windows용 에디션입니다. GPU 하드웨어 가속으로 더 빠르게 실행됩니다.
- mac 에디션: Mac (Apple silicon (M1, M2, M3 등))용 에디션입니다.

## 사용 방법
- zip 파일을 압축 해제한 후, `start_http.bat`를 실행하세요. 표시된 URL을 브라우저에서 접속하세요.
- `start_https.bat`를 사용하면 원격에서도 접속할 수 있습니다.
- (고급) `start_http_with_ngrok.bat`를 사용하면 ngrok를 통한 터널링으로 접속할 수 있습니다.
- Windows에서 한국어를 사용하려면 먼저 download_korean_module.bat를 실행하세요.
참고: mac 에디션은 .bat를 .command로 바꿔서 사용하세요.

### GPT-SoVITS

모델 상세 정보는 공식 [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) 저장소를 참조하세요.

GPT-SoVITS에서는 모델, 참조 음성, 참조 텍스트를 선택한 후 음성을 생성합니다. TTSClient는 참조 스피커라는 개념이 있어, 참조 스피커에 여러 참조 음성과 참조 텍스트를 등록할 수 있습니다.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### 음성 생성

1. 모델과 참조 스피커를 선택합니다 ((1), (2)).
2. 참조 스피커에 등록된 참조 음성과 참조 텍스트를 선택합니다 (3).
3. 생성하고 싶은 텍스트를 입력하고 음성을 생성합니다 (4).

#### 모델 등록

모델 선택 영역의 편집 버튼에서 등록하세요.

#### 참조 스피커 등록

참조 스피커 등록 영역의 편집 버튼에서 등록하세요.

#### 참조 음성, 텍스트 등록

참조 음성 선택 영역에서 미등록 슬롯을 선택하여 등록하세요.

## 저장소에서 시작하기 (고급)

### Ubuntu

* 요구사항
  
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
원격에서 접속하려면 `--https true`를 추가하세요.
---
$ poetry run main cui --https true
```

## CUDA 사용하기
다음과 같이 모듈을 교체하세요:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## DirectML 사용하기
다음과 같이 모듈을 교체하세요:
```
$ poetry add onnxruntime-directml==1.19.2
```

## 감사의 말
- [JVNV 코퍼스](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
