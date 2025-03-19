[اليابانية](/README.md) /
[الإنجليزية](/docs_i18n/README_en.md) /
[الكورية](/docs_i18n/README_ko.md)/
[الصينية](/docs_i18n/README_zh.md)/
[الألمانية](/docs_i18n/README_de.md)/
[العربية](/docs_i18n/README_ar.md)/
[اليونانية](/docs_i18n/README_el.md)/
[الإسبانية](/docs_i18n/README_es.md)/
[الفرنسية](/docs_i18n/README_fr.md)/
[الإيطالية](/docs_i18n/README_it.md)/
[اللاتينية](/docs_i18n/README_la.md)/
[الماليزية](/docs_i18n/README_ms.md)/
[الروسية](/docs_i18n/README_ru.md)
*جميع اللغات باستثناء اليابانية مترجمة آليًا.

## TTSClient

برنامج عميل لتحويل النص إلى كلام (TTS).
نخطط لدعم مختلف أنواع الذكاء الاصطناعي. (حاليًا يدعم فقط GPT-SoVITS v2, v3)

* الذكاء الاصطناعي المدعوم
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * قريبًا...

## ما الجديد!

* v.1.0.21
  * ميزة جديدة:
    * يمكن الآن تنزيل [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) من zundamon-speech-webui من العينات.

* v.1.0.20
  * ميزة جديدة:
    * تمت إضافة القدرة على ضبط نبرة الصوت في GPT-SoVITS.

* v.1.0.13
  * ميزة جديدة:
    * دعم لـ GPT-SoVITS v3. كما يدعم النماذج المحسنة باستخدام lora.
    * تعزيز تسجيل الصوت المرجعي. أصبح بإمكانك الآن تسجيل الصوت مباشرة من الميكروفون أو صوت الكمبيوتر. بالإضافة إلى ذلك، يتم نسخ النص تلقائيًا.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## البرامج ذات الصلة

* [مغير الصوت في الوقت الحقيقي VCClient](https://github.com/w-okada/voice-changer)

## تنزيل

[مستودع Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main)يرجى التنزيل من هناك.

* إصدار win_std: إصدار يعمل على وحدة المعالجة المركزية لنظام Windows. أبطأ مقارنة بإصدار cuda، ولكنه يعمل على وحدات المعالجة المركزية ذات المواصفات الجيدة الحديثة.
* إصدار win_cuda: إصدار يعمل على وحدة معالجة الرسومات NVIDIA لنظام Windows. يعمل بسرعة بفضل تسريع الأجهزة بواسطة وحدة معالجة الرسومات.
* إصدار mac: إصدار مخصص لأجهزة Mac (Apple silicon (M1, M2, M3, إلخ)).

## طريقة الاستخدام

* بعد فك ضغط ملف zip،`start_http.bat`يرجى تشغيله. قم بالوصول إلى عنوان URL المعروض باستخدام المتصفح.
* `start_https.bat`يمكنك الوصول عن بُعد باستخدام
* (للمستخدمين المتقدمين)`start_http_with_ngrok.bat`يمكنك الوصول باستخدام النفق باستخدام ngrok.

ملاحظة: في إصدار mac، يرجى استبدال .bat بـ .command.

### GPT-SoVITS

للحصول على تفاصيل النموذج، يرجى الرجوع إلى[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)المستودع الرسمي.

في GPT-SoVITS، يتم إنشاء الصوت بعد اختيار النموذج والصوت المرجعي والنص المرجعي. في TTSClient، هناك مفهوم المتحدث المرجعي، ويمكن أن يحتوي المتحدث المرجعي على أصوات مرجعية ونصوص مرجعية متعددة.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### توليد الصوت

1. اختر النموذج والمتحدث المرجعي ((1), (2)).
2. اختر الصوت المرجعي والنص المرجعي المسجلين للمتحدث المرجعي (3).
3. أدخل النص الذي تريد توليده كصوت (4).

#### تسجيل النموذج

يرجى التسجيل من زر التحرير في منطقة اختيار النموذج.

#### تسجيل المتحدث المرجعي

يرجى التسجيل من زر التحرير في منطقة تسجيل المتحدث المرجعي.

#### تس��يل الصوت المرجعي والنص

يرجى اختيار فتحة غير مسجلة في منطقة اختيار الصوت المرجعي للتسجيل.

## التشغيل من المستودع (متقدم)

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

### عند استخدام cuda

يرجى استبدال الوحدات.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### عند استخدام directml

يرجى استبدال الوحدات.

```
$ poetry add onnxruntime-directml==1.19.2
```

## الشكر والتقدير

* [JVNV كوربوس](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
