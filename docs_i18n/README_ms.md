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
  *Bahasa lain diterjemahkan oleh mesin.

TTSClient
---

Perisian klien Teks ke Pertuturan (TTS). Dijangka menyokong pelbagai model AI (kini hanya GPT-SoVITS v2, v3).

- AI Disokong
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - akan datang...

# Contoh

## Suara Wanita

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Pelbagai Bahasa

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Butiran

https://youtu.be/Fy7qifNB5T0

## Terkini!
- v.1.0.21
  - ciri baru:
    - Ditambah sokongan untuk memuat turun [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) dari contoh zundamon-speech-webui.

- v.1.0.20
  - ciri baru:
    - Ditambah sokongan untuk pelarasan intonasi dalam GPT-SoVITS.

- v.1.0.13
  - ciri baru:
    - Sokongan untuk GPT-SoVITS v3, termasuk model yang dioptimumkan dengan LoRA.
    - Penambahbaikan rakaman suara rujukan. Kini anda boleh merakam terus dari mikrofon atau audio PC, dan transkripsi teks dilakukan secara automatik.

## Perisian Berkaitan
- [VCClient Penukar Suara Masa Nyata](https://github.com/w-okada/voice-changer)

## Muat Turun

[チュートリアル 日本語](https://youtu.be/deOsmixKfbw) /
[Tutorial English](https://youtu.be/BhSIvoxSuxQ) /
[튜토리얼 한국어](https://youtu.be/FZINjbzdUgg)/
[教程 中文(zh)](https://youtu.be/IkOMV6rViog)/
[教程 中文(yue)](https://youtu.be/4Ms_9SBIbKk)/

Sila muat turun dari [repositori Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main).

- edisi win_std: Edisi Windows yang berjalan pada CPU. Lebih perlahan berbanding edisi CUDA, tetapi berfungsi pada CPU terkini dengan spesifikasi yang baik.
- edisi win_cuda: Edisi Windows yang berjalan pada GPU NVIDIA. Berjalan lebih pantas dengan pecutan perkakasan GPU.
- edisi mac: Edisi untuk Mac (Apple silicon (M1, M2, M3, etc)).

## Penggunaan
- Selepas mengekstrak fail zip, jalankan `start_http.bat`. Akses URL yang dipaparkan dalam pelayar anda.
- Menggunakan `start_https.bat` anda boleh mengakses dari lokasi jauh.
- (Lanjutan) Menggunakan `start_http_with_ngrok.bat` anda boleh mengakses melalui terowong ngrok.
- Jika anda ingin menggunakan bahasa Korea di Windows, jalankan download_korean_module.bat terlebih dahulu.
Nota: Untuk edisi mac, gantikan .bat dengan .command.

### GPT-SoVITS

Untuk butiran model, rujuk repositori rasmi [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS).

Dalam GPT-SoVITS, anda memilih model, suara rujukan dan teks rujukan sebelum menjana suara. TTSClient mempunyai konsep penutur rujukan, di mana penutur rujukan boleh mempunyai pelbagai suara dan teks rujukan.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Penjanaan Suara

1. Pilih model dan penutur rujukan ((1), (2)).
2. Pilih suara rujukan dan teks rujukan yang telah direkodkan untuk penutur rujukan (3).
3. Masukkan teks yang anda ingin jana dan cipta suara (4).

#### Pendaftaran Model

Daftar dari butang edit dalam kawasan pemilihan model.

#### Pendaftaran Penutur Rujukan

Daftar dari butang edit dalam kawasan pendaftaran penutur rujukan.

#### Pendaftaran Suara dan Teks Rujukan

Pilih slot yang belum didaftarkan dalam kawasan pemilihan suara rujukan untuk mendaftar.

## Bermula dari Repositori (Lanjutan)

### Ubuntu

* Keperluan
  
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
Untuk akses jauh, tambah `--https true`.
---
$ poetry run main cui --https true
```

## Penggunaan CUDA
Gantikan modul seperti berikut:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Penggunaan DirectML
Gantikan modul seperti berikut:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Penghargaan
- [Korpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus) 