[Giapponese](/README.md) /
[Inglese](/docs_i18n/README_en.md) /
[Coreano](/docs_i18n/README_ko.md)/
[Cinese](/docs_i18n/README_zh.md)/
[Tedesco](/docs_i18n/README_de.md)/
[Arabo](/docs_i18n/README_ar.md)/
[Greco](/docs_i18n/README_el.md)/
[Spagnolo](/docs_i18n/README_es.md)/
[Francese](/docs_i18n/README_fr.md)/
[Italiano](/docs_i18n/README_it.md)/
[Latino](/docs_i18n/README_la.md)/
[Malese](/docs_i18n/README_ms.md)/
[Russo](/docs_i18n/README_ru.md)
*Le lingue diverse dal giapponese sono tradotte automaticamente.

## TTSClient

Software client per Text To Speech (TTS).
Pianificato per supportare vari AI. (Attualmente solo GPT-SoVITS v2, v3)

* AI supportati
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * prossimamente...

## Novità!

* v.1.0.20
  * nuova funzionalità:
    * Aggiunta la possibilità di regolare l'intonazione in GPT-SoVITS.

* v.1.0.13
  * nuova funzionalità:
    * Supporto per GPT-SoVITS v3. Supporta anche modelli finetuning tramite lora.
    * Miglioramento della registrazione della voce di riferimento. Ora è possibile registrare direttamente tramite microfono o audio del PC. Inoltre, la trascrizione del testo viene eseguita automaticamente.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Software correlato

* [Cambiavoce in tempo reale VCClient](https://github.com/w-okada/voice-changer)

## Scarica

[Repository di Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main)per favore scarica da qui.

* Edizione win_std: edizione che funziona su CPU per Windows. È più lenta rispetto alla versione cuda, ma funziona su CPU di recente con specifiche adeguate.
* Edizione win_cuda: edizione che funziona su GPU NVIDIA per Windows. Funziona rapidamente grazie all'accelerazione hardware della GPU.
* Edizione mac: edizione per Mac (Apple silicon (M1, M2, M3, ecc)).

## Modalità d'uso

* Dopo aver estratto il file zip,`start_http.bat`esegui. Accedi all'URL visualizzato tramite il browser.
* `start_https.bat`Utilizzando, è possibile accedere anche da remoto.
* (Per utenti avanzati)`start_http_with_ngrok.bat`Utilizzando, è possibile accedere utilizzando il tunneling tramite ngrok.

nota: per l'edizione mac, sostituire .bat con .command.

### GPT-SoVITS

Per i dettagli del modello, fare riferimento a[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)il repository ufficiale.

In GPT-SoVITS, si selezionano il modello, la voce di riferimento e il testo di riferimento prima di generare la voce. In TTSClient esiste il concetto di parlante di riferimento, che può avere più voci di riferimento e testi di riferimento.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Generazione vocale

1. Seleziona il modello e il parlante di riferimento ((1), (2)).
2. Seleziona la voce di riferimento e il testo di riferimento registrati per il parlante di riferimento (3).
3. Inserisci il testo che desideri generare e genera la voce (4).

#### Registrazione del modello

Registrati dal pulsante di modifica nell'area di selezione del modello.

#### Registrazione del parlante di riferimento

Registrati dal pulsante di modifica nell'area di registrazione del parlante di riferimento.

#### Registrazione della voce di riferimento e del testo

Seleziona uno slot non registrato nell'area di selezione della voce di riferimento e registrati.

## Avvio dal repository (Avanzato)

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

### Se si utilizza cuda

Sostituisci i moduli.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### Se si utilizza directml

Sostituisci i moduli.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Ringraziamenti

* [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
