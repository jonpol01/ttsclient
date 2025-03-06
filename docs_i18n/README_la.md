[Lingua Iaponica](/README.md) /
[Lingua Anglica](/docs_i18n/README_en.md) /
[Lingua Coreana](/docs_i18n/README_ko.md)/
[Lingua Sinica](/docs_i18n/README_zh.md)/
[Lingua Theodisca](/docs_i18n/README_de.md)/
[Lingua Arabica](/docs_i18n/README_ar.md)/
[Lingua Graeca](/docs_i18n/README_el.md)/
[Lingua Hispanica](/docs_i18n/README_es.md)/
[Lingua Gallica](/docs_i18n/README_fr.md)/
[Lingua Italica](/docs_i18n/README_it.md)/
[Lingua Latina](/docs_i18n/README_la.md)/
[Lingua Malaica](/docs_i18n/README_ms.md)/
[Lingua Russica](/docs_i18n/README_ru.md)
*Praeter linguam Iaponicam, omnes linguae machinaliter translatae sunt.

## TTSClient

Software clientis pro Text To Speech (TTS).
Consilium est ut variis AI accommodetur. (In hoc tempore solum GPT-SoVITS v2, v3)

* AI accommodatio
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * mox veniet...

## Quid Novum!

* v.1.0.13
  * nova functio:
    * GPT-SoVITS v3 accommodatum. Etiam accommodatum ad exempla finetuning per lora.
    * Fortificatio registrationis vocis referentis. Nunc directe ex microphono vel sono PC recordari potest. Etiam, transscriptio textus automatice fit.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Software relatum

* [Mutator vocis in tempore reali VCClient](https://github.com/w-okada/voice-changer)

## Download

[Ex repositorio Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main)placet download.

* editio win_std: Editio quae in CPU pro Fenestra operatur. Cum comparatur ad versionem cuda, tardior est, sed operatur si CPU recentioris speciei est.
* editio win_cuda: Editio quae in NVIDIA GPU pro Fenestra operatur. Per accelerationem hardware GPU celeriter operatur.
* editio mac: Editio pro Mac (Apple silicon (M1, M2, M3, etc)).

## Usus Methodus

* Post extractionem fasciculi zip,`start_http.bat`exsequi placet. Accedite ad URL in navigatro quod ostenditur.
* `start_https.bat`Si uti, etiam a remoto accedere potes.
* (Pro peritis)`start_http_with_ngrok.bat`Si uti, potes accedere per tunneling cum ngrok.

nota: editio mac .bat cum .command reponi debet.

### GPT-SoVITS

Pro singularibus de exemplis[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)vide officialem repositorium.

In GPT-SoVITS, postquam exemplar, vocem referentem, et textum referentem eligis, vox generatur. In TTSClient, conceptus referentis oratoris est, qui plures voces et textus referentes habere potest.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Generatio vocis

1. Exemplar et oratorem referentem elige ((1), (2)).
2. Elige vocem et textum referentem in oratore referenti registratos (3).
3. Textum quem generare vis inserens, vocem generas (4).

#### Registratio exemplaris

Ex area selectionis exemplaris per puga edendi registra.

#### Registratio oratoris referentis

Ex area registrationis oratoris referentis per puga edendi registra.

#### Registratio vocis, textus referentis

Ex area selectionis vocis referentis, slot non registratum elige et registra.

## Ex repositorio initium (Advanced)

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

### Si cuda uti

Modulos commuta.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### Si directml uti

Modulos commuta.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Gratias

* [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
