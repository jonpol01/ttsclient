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
  *Другие языки переведены машинным переводом.

TTSClient
---

Клиентское программное обеспечение для преобразования текста в речь (TTS). Предполагается поддержка различных моделей ИИ (в настоящее время только GPT-SoVITS v2, v3).

- Поддерживаемые ИИ
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - скоро...

# Примеры

## Женский голос

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Многоязычный

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Подробности

https://youtu.be/Fy7qifNB5T0

## Новое!
- v.1.0.21
  - новая функция:
    - Добавлена поддержка загрузки [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) из примеров zundamon-speech-webui.

- v.1.0.20
  - новая функция:
    - Добавлена поддержка настройки интонации в GPT-SoVITS.

- v.1.0.13
  - новая функция:
    - Поддержка GPT-SoVITS v3, включая модели, оптимизированные с помощью LoRA.
    - Улучшена запись эталонного голоса. Теперь вы можете записывать напрямую с микрофона или аудио ПК, и транскрипция текста выполняется автоматически.

## Связанное программное обеспечение
- [VCClient Преобразователь голоса в реальном времени](https://github.com/w-okada/voice-changer)

## Скачать

[チュートリアル 日本語](https://youtu.be/deOsmixKfbw) /
[Tutorial English](https://youtu.be/BhSIvoxSuxQ) /
[튜토리얼 한국어](https://youtu.be/FZINjbzdUgg)/
[教程 中文(zh)](https://youtu.be/IkOMV6rViog)/
[教程 中文(yue)](https://youtu.be/4Ms_9SBIbKk)/

Пожалуйста, скачайте из [репозитория Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main).

- издание win_std: Издание для Windows, работающее на CPU. Медленнее по сравнению с изданием CUDA, но работает на современных CPU с хорошими характеристиками.
- издание win_cuda: Издание для Windows, работающее на GPU NVIDIA. Работает быстрее благодаря аппаратному ускорению GPU.
- издание mac: Издание для Mac (Apple silicon (M1, M2, M3, etc)).

## Использование
- После распаковки zip-файла запустите `start_http.bat`. Откройте URL, отображаемый в вашем браузере.
- Используя `start_https.bat`, вы можете получить доступ с удаленных мест.
- (Для продвинутых пользователей) Используя `start_http_with_ngrok.bat`, вы можете получить доступ через туннелирование ngrok.
- Если вы хотите использовать корейский язык в Windows, сначала запустите download_korean_module.bat.
Примечание: Для издания mac замените .bat на .command.

### GPT-SoVITS

Для подробностей о модели обратитесь к официальному репозиторию [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS).

В GPT-SoVITS вы выбираете модель, эталонный голос и эталонный текст перед генерацией голоса. TTSClient имеет концепцию эталонных дикторов, где эталонный диктор может иметь несколько эталонных голосов и текстов.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Генерация голоса

1. Выберите модель и эталонного диктора ((1), (2)).
2. Выберите записанные эталонный голос и эталонный текст для эталонного диктора (3).
3. Введите текст, который вы хотите сгенерировать, и создайте голос (4).

#### Регистрация модели

Зарегистрируйтесь с помощью кнопки редактирования в области выбора модели.

#### Регистрация эталонного диктора

Зарегистрируйтесь с помощью кнопки редактирования в области регистрации эталонного диктора.

#### Регистрация эталонного голоса и текста

Выберите незарегистрированный слот в области выбора эталонного голоса для регистрации.

## Запуск из репозитория (Для продвинутых)

### Ubuntu

* Требования
  
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
Для удаленного доступа добавьте `--https true`.
---
$ poetry run main cui --https true
```

## Использование CUDA
Замените модули следующим образом:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Использование DirectML
Замените модули следующим образом:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Благодарности
- [Корпус JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus) 