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
  *Aliae linguae machina translatae sunt.

TTSClient
---

Client programmatio Textus ad Vocem (TTS). Plures AI exemplaria sustinere destinatur (nunc solum GPT-SoVITS v2, v3).

- AI Sustentata
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - mox...

# Exempla

## Vox Feminea

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Multilingua

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Particularia

https://youtu.be/Fy7qifNB5T0

## Nova!
- v.1.0.21
  - nova functio:
    - Additum est auxilium ad [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) ex exemplis zundamon-speech-webui.

- v.1.0.20
  - nova functio:
    - Additum est auxilium ad modulationem intonationis in GPT-SoVITS.

- v.1.0.13
  - nova functio:
    - Additum est auxilium ad GPT-SoVITS v3, inclusis exemplaribus LoRA optimizatis.
    - Meliorata est vox referentiae recordatio. Nunc potes recordari directe per microphonum vel audio PC, et transcriptio textus automatice fit.

## Programmatio Coniuncta
- [VCClient Mutator Vocis in Tempore Reali](https://github.com/w-okada/voice-changer)

## Download

[チュートリアル 日本語](https://youtu.be/deOsmixKfbw) /
[Tutorial English](https://youtu.be/BhSIvoxSuxQ) /
[튜토리얼 한국어](https://youtu.be/FZINjbzdUgg)/
[教程 中文(zh)](https://youtu.be/IkOMV6rViog)/
[教程 中文(yue)](https://youtu.be/4Ms_9SBIbKk)/

Ex [Hugging Face repository](https://huggingface.co/wok000/ttsclient000/tree/main) quaeso download.

- editio win_std: Editio Windows quae in CPU operatur. Tardior quam editio CUDA, sed in CPU recentibus cum bonis specificationibus operatur.
- editio win_cuda: Editio Windows quae in GPU NVIDIA operatur. Celerius operatur cum acceleratione hardware GPU.
- editio mac: Editio pro Mac (Apple silicon (M1, M2, M3, etc)).

## Usus
- Post extractionem file zip, `start_http.bat` exequere. Ad URL in navigatro tuo monstratum accede.
- Usando `start_https.bat` a locis remotis accedere potes.
- (Pro usuariis peritis) Usando `start_http_with_ngrok.bat` per tunnel ngrok accedere potes.
- Si Coreanum in Windows uti vis, primum download_korean_module.bat exequere.
Nota: Pro editione mac, .bat cum .command muta.

### GPT-SoVITS

Pro particularibus exemplaris, consule repositorium officiale [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS).

In GPT-SoVITS, selige exemplar, vocem referentiae et textum referentiae antequam vocem generes. TTSClient habet conceptum loquentium referentiae, ubi loquens referentiae potest habere plures voces et textus referentiae.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Generatio Vocis

1. Selige exemplar et loquentem referentiae ((1), (2)).
2. Selige vocem referentiae et textum referentiae recordatos pro loquente referentiae (3).
3. Insere textum quem vis generare et crea vocem (4).

#### Recordatio Exemplaris

Recordare ex button modificationis in area selectionis exemplaris.

#### Recordatio Loquentis Referentiae

Recordare ex button modificationis in area recordationis loquentis referentiae.

#### Recordatio Vocis et Textus Referentiae

Selige slot non recordatum in area selectionis vocis referentiae ad recordandum.

## Inceptio ex Repositorio (Proficientibus)

### Ubuntu

* Requisita
  
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
Pro accessu remoto, adde `--https true`.
---
$ poetry run main cui --https true
```

## Usus CUDA
Substitue modulos sic:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Usus DirectML
Substitue modulos sic:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Gratiarum Actio
- [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus) 