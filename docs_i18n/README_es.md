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
  *Los demás idiomas están traducidos por máquina.

TTSClient
---

Software cliente de Texto a Voz (TTS). Está planeado para soportar varios modelos de IA (actualmente solo GPT-SoVITS v2, v3).

- IA Soportada
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - próximamente...

# Ejemplos

## Voz femenina

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Multilingüe

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Detalles

https://youtu.be/Fy7qifNB5T0

## ¡Qué hay de nuevo!
- v.1.0.21
  - nueva característica:
    - Se ha añadido soporte para descargar [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) desde muestras de zundamon-speech-webui.

- v.1.0.20
  - nueva característica:
    - Se ha añadido soporte para ajuste de entonación en GPT-SoVITS.

- v.1.0.13
  - nueva característica:
    - Soporte para GPT-SoVITS v3, incluyendo modelos ajustados con LoRA.
    - Mejora en el registro de voz de referencia. Ahora puedes grabar directamente desde el micrófono o el audio de la PC, y se realiza la transcripción de texto automáticamente.

## Software Relacionado
- [Cambiador de Voz en Tiempo Real VCClient](https://github.com/w-okada/voice-changer)

## Descarga
Por favor descarga desde el [repositorio de Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main).

- edición win_std: Edición para Windows que se ejecuta en CPU. Más lenta en comparación con la edición CUDA, pero funciona en CPUs recientes con buenas especificaciones.
- edición win_cuda: Edición para Windows que se ejecuta en GPU NVIDIA. Se ejecuta más rápido con aceleración de hardware GPU.
- edición mac: Edición para Mac (Apple silicon (M1, M2, M3, etc)).

## Uso
- Después de descomprimir el archivo zip, ejecuta `start_http.bat`. Accede a la URL mostrada en tu navegador.
- Usando `start_https.bat` puedes acceder desde ubicaciones remotas.
- (Avanzado) Usando `start_http_with_ngrok.bat` puedes acceder a través de túnel ngrok.

Nota: Para la edición mac, reemplaza .bat por .command.

### GPT-SoVITS

Para detalles del modelo, consulta el repositorio oficial de [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS).

En GPT-SoVITS, seleccionas un modelo, voz de referencia y texto de referencia antes de generar el habla. TTSClient tiene un concepto de hablantes de referencia, donde un hablante de referencia puede tener múltiples voces y textos de referencia.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Generación de Voz

1. Selecciona el modelo y el hablante de referencia ((1), (2)).
2. Selecciona la voz de referencia y el texto de referencia registrados para el hablante de referencia (3).
3. Ingresa el texto que deseas generar y crea la voz (4).

#### Registro de Modelo

Regístrate desde el botón de edición en el área de selección de modelo.

#### Registro de Hablante de Referencia

Regístrate desde el botón de edición en el área de registro de hablante de referencia.

#### Registro de Voz y Texto de Referencia

Selecciona una ranura no registrada en el área de selección de voz de referencia para registrarte.

## Inicio desde Repositorio (Avanzado)

### Ubuntu

* Requisitos
  
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
Para acceso remoto, agrega `--https true`.
---
$ poetry run main cui --https true
```

## Usando CUDA
Reemplaza los módulos de la siguiente manera:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Usando DirectML
Reemplaza los módulos de la siguiente manera:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Agradecimientos
- [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
