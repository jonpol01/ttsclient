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
  *Le altre lingue sono tradotte automaticamente.

TTSClient
---

Software client di Sintesi Vocale (TTS). È previsto il supporto per vari modelli di IA (attualmente solo GPT-SoVITS v2, v3).

- IA Supportata
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - prossimamente...

# Esempi

## Voce femminile

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Multilingue

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Dettagli

https://youtu.be/Fy7qifNB5T0

## Novità!
- v.1.0.21
  - nuova funzionalità:
    - Aggiunto supporto per scaricare [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) dagli esempi di zundamon-speech-webui.

- v.1.0.20
  - nuova funzionalità:
    - Aggiunto supporto per la regolazione dell'intonazione in GPT-SoVITS.

- v.1.0.13
  - nuova funzionalità:
    - Supporto per GPT-SoVITS v3, inclusi i modelli ottimizzati con LoRA.
    - Miglioramento della registrazione della voce di riferimento. Ora puoi registrare direttamente dal microfono o dall'audio del PC, e la trascrizione del testo viene eseguita automaticamente.

## Software Correlato
- [Cambiatore di Voce in Tempo Reale VCClient](https://github.com/w-okada/voice-changer)

## Download

[チュートリアル 日本語](https://youtu.be/deOsmixKfbw) /
[Tutorial English](https://youtu.be/BhSIvoxSuxQ) /
[튜토리얼 한국어](https://youtu.be/FZINjbzdUgg)/
[教程 中文(zh)](https://youtu.be/IkOMV6rViog)/
[教程 中文(yue)](https://youtu.be/4Ms_9SBIbKk)/

Per favore scarica dal [repository di Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main).

- edizione win_std: Edizione per Windows che funziona su CPU. Più lenta rispetto all'edizione CUDA, ma funziona su CPU recenti con buone specifiche.
- edizione win_cuda: Edizione per Windows che funziona su GPU NVIDIA. Funziona più velocemente con l'accelerazione hardware della GPU.
- edizione mac: Edizione per Mac (Apple silicon (M1, M2, M3, etc)).

## Utilizzo
- Dopo aver estratto il file zip, esegui `start_http.bat`. Accedi all'URL mostrato nel tuo browser.
- Usando `start_https.bat` puoi accedere da posizioni remote.
- (Avanzato) Usando `start_http_with_ngrok.bat` puoi accedere attraverso il tunnel ngrok.
- Se desideri utilizzare il coreano in Windows, esegui prima download_korean_module.bat.
Nota: Per l'edizione mac, sostituisci .bat con .command.

### GPT-SoVITS

Per i dettagli del modello, consulta il repository ufficiale di [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS).

In GPT-SoVITS, selezioni un modello, una voce di riferimento e un testo di riferimento prima di generare la voce. TTSClient ha un concetto di parlanti di riferimento, dove un parlante di riferimento può avere più voci e testi di riferimento.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Generazione della Voce

1. Seleziona il modello e il parlante di riferimento ((1), (2)).
2. Seleziona la voce di riferimento e il testo di riferimento registrati per il parlante di riferimento (3).
3. Inserisci il testo che desideri generare e crea la voce (4).

#### Registrazione del Modello

Registrati dal pulsante di modifica nell'area di selezione del modello.

#### Registrazione del Parlante di Riferimento

Registrati dal pulsante di modifica nell'area di registrazione del parlante di riferimento.

#### Registrazione della Voce e del Testo di Riferimento

Seleziona uno slot non registrato nell'area di selezione della voce di riferimento per registrarti.

## Avvio dal Repository (Avanzato)

### Ubuntu

* Requisiti
  
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
Per l'accesso remoto, aggiungi `--https true`.
---
$ poetry run main cui --https true
```

## Utilizzo di CUDA
Sostituisci i moduli come segue:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Utilizzo di DirectML
Sostituisci i moduli come segue:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Ringraziamenti
- [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
