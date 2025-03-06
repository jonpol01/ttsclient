[일본어](/README.md) /
[영어](/docs_i18n/README_en.md) /
[한국어](/docs_i18n/README_ko.md)/
[중국어](/docs_i18n/README_zh.md)/
[독일어](/docs_i18n/README_de.md)/
[아랍어](/docs_i18n/README_ar.md)/
[그리스어](/docs_i18n/README_el.md)/
[스페인어](/docs_i18n/README_es.md)/
[프랑스어](/docs_i18n/README_fr.md)/
[이탈리아어](/docs_i18n/README_it.md)/
[라틴어](/docs_i18n/README_la.md)/
[말레이어](/docs_i18n/README_ms.md)/
[러시아어](/docs_i18n/README_ru.md)
*일본어 이외는 기계 번역입니다.

## TTSClient

Text To Speech(TTS)의 클라이언트 소프트웨어입니다.
각종 AI에 대응할 계획입니다.(현재는 GPT-SoVITS v2, v3만)

* 대응 AI
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * 곧 출시...

## What's New!

* v.1.0.13
  * 새로운 기능:
    * GPT-SoVITS v3에 대응. lora에 의한 미세 조정된 모델에도 대응하고 있습니다.
    * 참조 음성 등록 강화. 직접 마이크나 PC 음성을 녹음할 수 있게 되었습니다. 또한, 자동으로 텍스트의 기록도 수행됩니다.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## 관련 소프트웨어

* [실시간 보이스 체인저 VCClient](https://github.com/w-okada/voice-changer)

## 다운로드

[Hugging Face의 리포지토리](https://huggingface.co/wok000/ttsclient000/tree/main)에서 다운로드하세요.

* win_std 에디션: Windows용 CPU에서 작동하는 에디션입니다. cuda 버전과 비교하여 느리지만, 최근의 적당한 사양의 CPU라면 작동합니다.
* win_cuda 에디션: Windows용 NVIDIA GPU에서 작동하는 에디션입니다. GPU의 하드웨어 가속을 통해 빠르게 작동합니다.
* mac 에디션: Mac(Apple silicon(M1, M2, M3, etc))용 에디션입니다.

## 사용 방법

* zip 파일을 해제한 후,`start_http.bat`를 실행하세요. 표시된 URL에 브라우저로 접근하세요.
* `start_https.bat`를 사용하면, 원격에서도 접근할 수 있습니다.
* (고급 사용자용)`start_http_with_ngrok.bat`를 사용하면 ngrok을 사용한 터널링을 통해 접근할 수 있습니다.

참고: mac 에디션은 .bat을 .command로 읽어주세요.

### GPT-SoVITS

모델의 세부 사항은[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)의 공식 리포지토리를 참조하세요.

GPT-SoVITS에서는 모델과 참조 음성 및 참조 텍스트를 선택한 후, 음성 생성을 수행합니다. TTSClient에서는 참조 화자라는 개념이 있으며, 참조 화자에 여러 참조 음성과 참조 텍스트를 가질 수 있습니다.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### 음성 생성

1. 모델과 참조 화자를 선택합니다((1), (2)).
2. 참조 화자에 등록된 참조 음성과 참조 텍스트를 선택합니다(3).
3. 생성하고자 하는 텍스트를 입력하여 음성을 생성합니다(4).

#### 모델 등록

모델 선택 영역의 편집 버튼에서 등록하세요.

#### 참조 화자 등록

참조 화자 등록 영역의 편집 버튼에서 등록하세요.

#### 참조 음성, 텍스트 등록

참조 음성 선택 영역에서 미등록 슬롯을 선택하여 등록하세요.

## 리포지토리에서의 시작(고급)

```
$ git clone https://github.com/w-okada/ttsclient.git
$ cd ttsclient/
$ poetry install
$ poetry run main cui
---

リモートからアクセスする場合は`--https true`を付与してください。
---
$ poetry run main cui --https true
```

### cuda를 사용할 경우

모듈을 교체하세요.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### directml을 사용할 경우

모듈을 교체하세요.

```
$ poetry add onnxruntime-directml==1.19.2
```

## 감사의 말

* [JVNV 코퍼스](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
