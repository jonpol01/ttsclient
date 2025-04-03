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
  *Andere Sprachen sind maschinell übersetzt.

TTSClient
---

Eine Text-zu-Sprache (TTS) Client-Software. Es ist geplant, verschiedene KI-Modelle zu unterstützen (derzeit nur GPT-SoVITS v2, v3).

- Unterstützte KI
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - Kommt bald...

# Beispiele

## Weibliche Stimme

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Mehrsprachig

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Details

https://youtu.be/Fy7qifNB5T0

## Was ist neu!
- v.1.0.21
  - Neue Funktion:
    - Unterstützung für den Download von [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) aus zundamon-speech-webui Beispielen.

- v.1.0.20
  - Neue Funktion:
    - Unterstützung für GPT-SoVITS Intonationsanpassung.

- v.1.0.13
  - Neue Funktion:
    - Unterstützung für GPT-SoVITS v3, einschließlich mit LoRA feinabgestimmter Modelle.
    - Verbesserte Referenzsprachregistrierung. Sie können jetzt direkt von Mikrofon oder PC-Audio aufnehmen, und automatische Texttranskription wird ebenfalls durchgeführt.

## Verwandte Software
- [Echtzeit-Stimmwandler VCClient](https://github.com/w-okada/voice-changer)

## Download
Bitte laden Sie von der [Hugging Face Repository](https://huggingface.co/wok000/ttsclient000/tree/main) herunter.

- win_std Edition: Windows Edition, die auf CPU läuft. Langsamer als die CUDA-Version, aber funktioniert auf aktuellen CPUs mit anständiger Spezifikation.
- win_cuda Edition: Windows Edition, die auf NVIDIA GPU läuft. Läuft schneller mit GPU-Hardwarebeschleunigung.
- mac Edition: Edition für Mac (Apple silicon (M1, M2, M3, etc)).

## Verwendung
- Nach dem Entpacken der zip-Datei, führen Sie `start_http.bat` aus. Greifen Sie auf die angezeigte URL in Ihrem Browser zu.
- Mit `start_https.bat` können Sie von entfernten Standorten aus zugreifen.
- (Fortgeschritten) Mit `start_http_with_ngrok.bat` können Sie über ngrok-Tunneling zugreifen.

Hinweis: Für mac Edition ersetzen Sie .bat durch .command.

### GPT-SoVITS

Für Modelldetails, siehe die offizielle [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) Repository.

In GPT-SoVITS wählen Sie ein Modell, Referenzstimme und Referenztext, bevor Sie Sprache generieren. TTSClient hat ein Konzept von Referenzsprechern, wo ein Referenzsprecher mehrere Referenzstimmen und Referenztexte haben kann.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Sprachgenerierung

1. Wählen Sie das Modell und den Referenzsprecher ((1), (2)).
2. Wählen Sie die für den Referenzsprecher registrierte Referenzstimme und den Referenztext (3).
3. Geben Sie den zu generierenden Text ein und erstellen Sie die Stimme (4).

#### Modellregistrierung

Registrieren Sie sich über die Bearbeiten-Schaltfläche im Modellauswahlbereich.

#### Referenzsprecherregistrierung

Registrieren Sie sich über die Bearbeiten-Schaltfläche im Referenzsprecherregistrierungsbereich.

#### Referenzstimme und Textregistrierung

Wählen Sie einen nicht registrierten Slot im Referenzstimmenauswahlbereich zur Registrierung.

## Starten vom Repository (Fortgeschritten)

### Ubuntu

* Anforderungen
  
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
Für Remote-Zugriff fügen Sie `--https true` hinzu.
---
$ poetry run main cui --https true
```

## CUDA verwenden
Ersetzen Sie die Module wie folgt:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## DirectML verwenden
Ersetzen Sie die Module wie folgt:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Danksagungen
- [JVNV Korpus](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
