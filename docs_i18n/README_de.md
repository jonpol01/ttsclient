[Japanisch](/README.md) /
[Englisch](/docs_i18n/README_en.md) /
[Koreanisch](/docs_i18n/README_ko.md)/
[Chinesisch](/docs_i18n/README_zh.md)/
[Deutsch](/docs_i18n/README_de.md)/
[Arabisch](/docs_i18n/README_ar.md)/
[Griechisch](/docs_i18n/README_el.md)/
[Spanisch](/docs_i18n/README_es.md)/
[Französisch](/docs_i18n/README_fr.md)/
[Italienisch](/docs_i18n/README_it.md)/
[Latein](/docs_i18n/README_la.md)/
[Malaiisch](/docs_i18n/README_ms.md)/
[Russisch](/docs_i18n/README_ru.md)
*Außer Japanisch sind alle Übersetzungen maschinell erstellt.

## TTSClient

Dies ist eine Client-Software für Text To Speech (TTS).
Es ist geplant, verschiedene AIs zu unterstützen. (Derzeit nur GPT-SoVITS v2, v3)

* Unterstützte AI
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * Demnächst...

## Was ist neu!

* v.1.0.21
  * neues Feature:
    * [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) von zundamon-speech-webui kann jetzt aus den Beispielen heruntergeladen werden.

* v.1.0.20
  * neues Feature:
    * Die Möglichkeit zur Anpassung der Intonation in GPT-SoVITS wurde hinzugefügt.

* v.1.0.13
  * neues Feature:
    * Unterstützung für GPT-SoVITS v3. Auch Modelle, die mit lora feinabgestimmt wurden, werden unterstützt.
    * Verbesserung der Registrierung von Referenzstimmen. Es ist jetzt möglich, direkt über das Mikrofon oder den PC-Ton aufzunehmen. Außerdem wird automatisch eine Transkription des Textes erstellt.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Verwandte Software

* [Echtzeit-Voice-Changer VCClient](https://github.com/w-okada/voice-changer)

## Download

[Hugging Face Repository](https://huggingface.co/wok000/ttsclient000/tree/main)Bitte von dort herunterladen.

* win_std Edition: Eine Edition, die auf der CPU für Windows läuft. Sie ist langsamer im Vergleich zur CUDA-Version, funktioniert aber auf einer einigermaßen aktuellen CPU.
* win_cuda Edition: Eine Edition, die auf der NVIDIA GPU für Windows läuft. Sie läuft dank Hardwarebeschleunigung der GPU schnell.
* mac Edition: Eine Edition für Mac (Apple Silicon (M1, M2, M3, etc)).

## Verwendung

* Nach dem Entpacken der ZIP-Datei,`start_http.bat`führen Sie es aus. Greifen Sie mit einem Browser auf die angezeigte URL zu.
* `start_https.bat`Mit dieser Option können Sie auch aus der Ferne zugreifen.
* (Für Fortgeschrittene)`start_http_with_ngrok.bat`Mit dieser Option können Sie mit Ngrok Tunneling verwenden, um zuzugreifen.

Hinweis: Bei der mac Edition bitte .bat durch .command ersetzen.

### GPT-SoVITS

Für Details zum Modell,[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)siehe das offizielle Repository.

Bei GPT-SoVITS wählen Sie ein Modell, eine Referenzstimme und einen Referenztext aus, bevor Sie die Sprachsynthese durchführen. Im TTSClient gibt es das Konzept des Referenzsprechers, der mehrere Referenzstimmen und Referenztexte haben kann.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Sprachsynthese

1. Wählen Sie ein Modell und einen Referenzsprecher aus ((1), (2)).
2. Wählen Sie die registrierte Referenzstimme und den Referenztext des Referenzsprechers aus (3).
3. Geben Sie den Text ein, den Sie generieren möchten, und erzeugen Sie die Sprache (4).

#### Modellregistrierung

Bitte registrieren Sie es über die Bearbeitungsschaltfläche im Modell-Auswahlbereich.

#### Registrierung des Referenzsprechers

Bitte registrieren Sie es über die Bearbeitungsschaltfläche im Referenzsprecher-Registrierungsbereich.

#### Registrierung von Referenzstimmen und -texten

Bitte wählen Sie einen nicht registrierten Slot im Referenzstimmen-Auswahlbereich aus und registrieren Sie ihn.

## Starten aus dem Repository (Erweitert)

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

### Wenn Sie CUDA verwenden

Bitte tauschen Sie die Module aus.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### Wenn Sie DirectML verwenden

Bitte tauschen Sie die Module aus.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Danksagungen

* [JVNV-Korpus](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
