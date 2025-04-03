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
  *اللغات الأخرى مترجمة آلياً.

TTSClient
---

برنامج عميل تحويل النص إلى كلام (TTS). من المخطط دعم نماذج الذكاء الاصطناعي المختلفة (حالياً فقط GPT-SoVITS v2, v3).

- الذكاء الاصطناعي المدعوم
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - قريباً...

# عينات

## صوت أنثوي

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## متعدد اللغات

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## تفاصيل

https://youtu.be/Fy7qifNB5T0

## ما الجديد!
- v.1.0.21
  - ميزة جديدة:
    - إضافة دعم لتحميل [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) من عينات zundamon-speech-webui.

- v.1.0.20
  - ميزة جديدة:
    - إضافة دعم لضبط نبرة الصوت في GPT-SoVITS.

- v.1.0.13
  - ميزة جديدة:
    - دعم GPT-SoVITS v3، بما في ذلك النماذج المدربة بدقة باستخدام LoRA.
    - تحسين تسجيل الصوت المرجعي. يمكنك الآن التسجيل مباشرة من الميكروفون أو صوت الكمبيوتر، كما يتم إجراء نسخ النص تلقائياً.

## البرامج ذات الصلة
- [مغير الصوت في الوقت الفعلي VCClient](https://github.com/w-okada/voice-changer)

## التحميل

[チュートリアル 日本語](https://youtu.be/deOsmixKfbw) /
[Tutorial English](https://youtu.be/BhSIvoxSuxQ) /
[튜토리얼 한국어](https://youtu.be/FZINjbzdUgg)/
[教程 中文(zh)](https://youtu.be/IkOMV6rViog)/
[教程 中文(yue)](https://youtu.be/4Ms_9SBIbKk)/

يرجى التحميل من [مستودع Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main).

- إصدار win_std: إصدار Windows الذي يعمل على وحدة المعالجة المركزية. أبطأ مقارنة بإصدار CUDA، ولكنه يعمل على وحدات المعالجة المركزية الحديثة ذات المواصفات الجيدة.
- إصدار win_cuda: إصدار Windows الذي يعمل على وحدة معالجة الرسومات NVIDIA. يعمل بشكل أسرع مع تسريع الأجهزة بوحدة معالجة الرسومات.
- إصدار mac: إصدار لـ Mac (Apple silicon (M1, M2, M3, etc)).

## طريقة الاستخدام
- بعد فك ضغط ملف zip، قم بتشغيل `start_http.bat`. قم بالوصول إلى عنوان URL المعروض في متصفحك.
- باستخدام `start_https.bat` يمكنك الوصول من المواقع البعيدة.
- (متقدم) باستخدام `start_http_with_ngrok.bat` يمكنك الوصول من خلال نفق ngrok.
- إذا كنت تريد استخدام اللغة الكورية في Windows، قم أولاً بتشغيل download_korean_module.bat.
ملاحظة: لإصدار mac، استبدل .bat بـ .command.

### GPT-SoVITS

للحصول على تفاصيل النموذج، يرجى الرجوع إلى [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) الرسمي.

في GPT-SoVITS، تختار نموذجاً وصوتاً مرجعياً ونصاً مرجعياً قبل إنشاء الكلام. لدى TTSClient مفهوم المتحدثين المرجعيين، حيث يمكن للمتحدث المرجعي أن يكون لديه أصوات مرجعية ونصوص مرجعية متعددة.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### إنشاء الكلام

1. اختر النموذج والمتحدث المرجعي ((1)، (2)).
2. اختر الصوت المرجعي والنص المرجعي المسجل للمتحدث المرجعي (3).
3. أدخل النص الذي تريد إنشاؤه وأنشئ الصوت (4).

#### تسجيل النموذج

سجل من زر التحرير في منطقة اختيار النموذج.

#### تسجيل المتحدث المرجعي

سجل من زر التحرير في منطقة تسجيل المتحدث المرجعي.

#### تسجيل الصوت المرجعي والنص

اختر فتحة غير مسجلة في منطقة اختيار الصوت المرجعي للتسجيل.

## البدء من المستودع (متقدم)

### Ubuntu

* المتطلبات
  
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
للوصول عن بعد، أضف `--https true`.
---
$ poetry run main cui --https true
```

## استخدام CUDA
استبدل الوحدات النمطية كما يلي:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## استخدام DirectML
استبدل الوحدات النمطية كما يلي:
```
$ poetry add onnxruntime-directml==1.19.2
```

## الشكر والتقدير
- [مجموعة بيانات JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
