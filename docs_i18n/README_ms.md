[Bahasa Jepun](/README.md) /
[Bahasa Inggeris](/docs_i18n/README_en.md) /
[Bahasa Korea](/docs_i18n/README_ko.md)/
[Bahasa Cina](/docs_i18n/README_zh.md)/
[Bahasa Jerman](/docs_i18n/README_de.md)/
[Bahasa Arab](/docs_i18n/README_ar.md)/
[Bahasa Greek](/docs_i18n/README_el.md)/
[Bahasa Sepanyol](/docs_i18n/README_es.md)/
[Bahasa Perancis](/docs_i18n/README_fr.md)/
[Bahasa Itali](/docs_i18n/README_it.md)/
[Bahasa Latin](/docs_i18n/README_la.md)/
[Bahasa Melayu](/docs_i18n/README_ms.md)/
[Bahasa Rusia](/docs_i18n/README_ru.md)
*Selain bahasa Jepun, terjemahan adalah terjemahan mesin.

## TTSClient

Perisian klien untuk Teks ke Ucapan (TTS).
Rancangan untuk menyokong pelbagai AI. (Pada masa ini hanya GPT-SoVITS v2, v3)

* AI yang disokong
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * Akan datang...

## Apa yang Baru!

* v.1.0.20
  * ciri baru:
    * Menambah keupayaan untuk melaraskan intonasi dalam GPT-SoVITS.

* v.1.0.13
  * ciri baru:
    * Menyokong GPT-SoVITS v3. Juga menyokong model yang disesuaikan dengan lora.
    * Peningkatan pendaftaran suara rujukan. Kini boleh merakam suara dari mikrofon atau PC secara langsung. Selain itu, transkripsi teks juga dilakukan secara automatik.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Perisian berkaitan

* [Penukar Suara Masa Nyata VCClient](https://github.com/w-okada/voice-changer)

## Muat turun

[Repositori Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main)sila muat turun dari.

* Edisi win_std: Edisi yang berfungsi pada CPU untuk Windows. Lebih perlahan berbanding versi cuda, tetapi berfungsi pada CPU dengan spesifikasi yang agak baik.
* Edisi win_cuda: Edisi yang berfungsi pada GPU NVIDIA untuk Windows. Berfungsi dengan pantas dengan pecutan perkakasan GPU.
* Edisi mac: Edisi untuk Mac (Apple silicon (M1, M2, M3, dll)).

## Cara Penggunaan

* Selepas mengekstrak fail zip,`start_http.bat`sila jalankan. Akses URL yang dipaparkan melalui pelayar.
* `start_https.bat`Dengan menggunakan ini, anda boleh mengakses dari jauh.
* (Untuk pengguna berpengalaman)`start_http_with_ngrok.bat`Dengan menggunakan ini, anda boleh mengakses menggunakan terowong ngrok.

nota: Untuk edisi mac, gantikan .bat dengan .command.

### GPT-SoVITS

Untuk butiran model, sila rujuk[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)repositori rasmi.

Dalam GPT-SoVITS, anda memilih model, suara rujukan, dan teks rujukan sebelum menjana suara. Dalam TTSClient, terdapat konsep penceramah rujukan, yang boleh mempunyai pelbagai suara rujukan dan teks rujukan.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Penjanaan Suara

1. Pilih model dan penceramah rujukan ((1), (2)).
2. Pilih suara rujukan dan teks rujukan yang didaftarkan kepada penceramah rujukan (3).
3. Masukkan teks yang ingin dijana dan hasilkan suara (4).

#### Pendaftaran Model

Sila daftar dari butang edit di kawasan pemilihan model.

#### Pendaftaran Penceramah Rujukan

Sila daftar dari butang edit di kawasan pendaftaran penceramah rujukan.

#### Pendaftaran Suara Rujukan, Teks

Sila pilih slot yang tidak didaftarkan di kawasan pemilihan suara rujukan dan daftar.

## Pelancaran dari repositori (Advanced)

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

### Apabila menggunakan cuda

Sila tukar modul.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### Apabila menggunakan directml

Sila tukar modul.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Penghargaan

* [Korpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
