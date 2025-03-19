[Japanese](/README.md) /
[English](/docs_i18n/README_en.md) /
[Korean](/docs_i18n/README_ko.md)/
[Chinese](/docs_i18n/README_zh.md)/
[German](/docs_i18n/README_de.md)/
[Arabic](/docs_i18n/README_ar.md)/
[Greek](/docs_i18n/README_el.md)/
[Spanish](/docs_i18n/README_es.md)/
[French](/docs_i18n/README_fr.md)/
[Italian](/docs_i18n/README_it.md)/
[Latin](/docs_i18n/README_la.md)/
[Malay](/docs_i18n/README_ms.md)/
[Russian](/docs_i18n/README_ru.md)
*Languages other than Japanese are machine translated.

## TTSClient

This is client software for Text To Speech (TTS).
There are plans to support various AIs. (Currently only GPT-SoVITS v2, v3)

* Supported AI
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * coming soon...

## What's New!

* v.1.0.21
  * new feature:
    * [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) from zundamon-speech-webui can now be downloaded from samples.

* v.1.0.20
  * new feature:
    * Added the ability to adjust intonation in GPT-SoVITS.

* v.1.0.13
  * new feature:
    * Support for GPT-SoVITS v3. Also supports models fine-tuned with lora.
    * Enhanced reference voice registration. You can now record directly from a microphone or PC audio. Automatic transcription of text is also performed.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Related Software

* [Real-time Voice Changer VCClient](https://github.com/w-okada/voice-changer)

## Download

[Hugging Face repository](https://huggingface.co/wok000/ttsclient000/tree/main)Please download from.

* win_std edition: An edition that runs on CPUs for Windows. It is slower compared to the cuda version, but it works on reasonably recent CPUs.
* win_cuda edition: An edition that runs on NVIDIA GPUs for Windows. It runs fast due to GPU hardware acceleration.
* mac edition: An edition for Mac (Apple silicon (M1, M2, M3, etc)).

## Usage

* After extracting the zip file,`start_http.bat`please execute. Access the displayed URL with a browser.
* `start_https.bat`By using, you can access it remotely.
* (For advanced users)`start_http_with_ngrok.bat`By using, you can access it using tunneling with ngrok.

note: For the mac edition, replace .bat with .command.

### GPT-SoVITS

For model details,[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)please refer to the official repository.

In GPT-SoVITS, you perform voice generation after selecting a model, reference voice, and reference text. In TTSClient, there is a concept of a reference speaker, and a reference speaker can have multiple reference voices and reference texts.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Voice Generation

1. Select a model and reference speaker ((1), (2)).
2. Select the reference voice and reference text registered to the reference speaker (3).
3. Enter the text you want to generate and generate the voice (4).

#### Model Registration

Please register from the edit button in the model selection area.

#### Reference Speaker Registration

Please register from the edit button in the reference speaker registration area.

#### Reference Voice and Text Registration

Please select an unregistered slot in the reference voice selection area to register.

## Launching from Repository (Advanced)

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

### When using cuda

Please replace the module.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### When using directml

Please replace the module.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Acknowledgements

* [JVNV Corpus](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
