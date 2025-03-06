[Japonés](/README.md) /
[Inglés](/docs_i18n/README_en.md) /
[Coreano](/docs_i18n/README_ko.md)/
[Chino](/docs_i18n/README_zh.md)/
[Alemán](/docs_i18n/README_de.md)/
[Árabe](/docs_i18n/README_ar.md)/
[Griego](/docs_i18n/README_el.md)/
[Español](/docs_i18n/README_es.md)/
[Francés](/docs_i18n/README_fr.md)/
[Italiano](/docs_i18n/README_it.md)/
[Latín](/docs_i18n/README_la.md)/
[Malayo](/docs_i18n/README_ms.md)/
[Ruso](/docs_i18n/README_ru.md)
*Los idiomas distintos al japonés son traducciones automáticas.

## TTSClient

Es un software cliente de Texto a Voz (TTS).
Planeamos soportar varios tipos de IA. (Actualmente solo GPT-SoVITS v2, v3)

* IA compatible
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * Próximamente...

## ¡Novedades!

* v.1.0.13
  * nueva característica:
    * Compatible con GPT-SoVITS v3. También es compatible con modelos afinados con lora.
    * Mejora en el registro de voz de referencia. Ahora se puede grabar directamente desde el micrófono o el audio de la PC. Además, se realiza automáticamente la transcripción del texto.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Software relacionado

* [Cambiador de voz en tiempo real VCClient](https://github.com/w-okada/voice-changer)

## Descargar

[Repositorio de Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main)por favor descargue desde allí.

* Edición win_std: Es una edición que funciona en CPU para Windows. Es más lenta en comparación con la versión cuda, pero funciona en CPUs de especificaciones recientes.
* Edición win_cuda: Es una edición que funciona en GPU NVIDIA para Windows. Funciona rápidamente gracias a la aceleración de hardware de la GPU.
* Edición mac: Es una edición para Mac (Apple silicon (M1, M2, M3, etc)).

## Cómo usar

* Después de descomprimir el archivo zip,`start_http.bat`ejecútelo. Acceda a la URL mostrada en su navegador.
* `start_https.bat`Al usarlo, puede acceder de forma remota.
* (Para usuarios avanzados)`start_http_with_ngrok.bat`Al usarlo, puede acceder utilizando túneles con ngrok.

nota: en la edición mac, reemplace .bat por .command.

### GPT-SoVITS

Para más detalles sobre el modelo, consulte[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)el repositorio oficial.

En GPT-SoVITS, se selecciona el modelo, la voz de referencia y el texto de referencia antes de generar la voz. En TTSClient existe el concepto de hablante de referencia, que puede tener múltiples voces de referencia y textos de referencia.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Generación de voz

1. Seleccione el modelo y el hablante de referencia ((1), (2)).
2. Seleccione la voz de referencia y el texto de referencia registrados en el hablante de referencia (3).
3. Ingrese el texto que desea generar y genere la voz (4).

#### Registro del modelo

Regístrese desde el botón de edición en el área de selección del modelo.

#### Registro del hablante de referencia

Regístrese desde el botón de edición en el área de registro del hablante de referencia.

#### Registro de voz de referencia y texto

Seleccione una ranura no registrada en el área de selección de voz de referencia para registrarse.

## Inicio desde el repositorio (Avanzado)

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

### Si usa cuda

Reemplace los módulos.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### Si usa directml

Reemplace los módulos.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Agradecimientos

* [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
