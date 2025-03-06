[日语](/README.md) /
[英语](/docs_i18n/README_en.md) /
[韩语](/docs_i18n/README_ko.md)/
[中文](/docs_i18n/README_zh.md)/
[德语](/docs_i18n/README_de.md)/
[阿拉伯语](/docs_i18n/README_ar.md)/
[希腊语](/docs_i18n/README_el.md)/
[西班牙语](/docs_i18n/README_es.md)/
[法语](/docs_i18n/README_fr.md)/
[意大利语](/docs_i18n/README_it.md)/
[拉丁语](/docs_i18n/README_la.md)/
[马来语](/docs_i18n/README_ms.md)/
[俄语](/docs_i18n/README_ru.md)
*日语以外为机器翻译。

## TTSClient

这是一个文本转语音（TTS）的客户端软件。
计划支持各种AI。（目前仅支持GPT-SoVITS v2, v3）

* 支持的AI
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * 即将推出...

## 最新动态！

* v.1.0.13
  * 新功能：
    * 支持GPT-SoVITS v3。也支持通过lora进行微调的模型。
    * 增强了参考音频的注册。现在可以直接录制麦克风或PC音频。此外，还会自动进行文本转录。

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## 相关软件

* [实时语音转换器 VCClient](https://github.com/w-okada/voice-changer)

## 下载

[请从Hugging Face的仓库](https://huggingface.co/wok000/ttsclient000/tree/main)下载。

* win_std版：适用于Windows的CPU版本。与cuda版相比速度较慢，但在最近的中等规格CPU上可以运行。
* win_cuda版：适用于Windows的NVIDIA GPU版本。通过GPU硬件加速运行速度更快。
* mac版：适用于Mac（Apple silicon（M1, M2, M3, etc））的版本。

## 使用方法

* 解压zip文件后，`start_http.bat`请执行。然后在浏览器中访问显示的URL。
* `start_https.bat`使用时，可以从远程访问。
* （高级用户）`start_http_with_ngrok.bat`使用时可以通过ngrok进行隧道访问。

注意：mac版请将.bat替换为.command。

### GPT-SoVITS

关于模型的详细信息，请参阅[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)的官方仓库。

在GPT-SoVITS中，选择模型、参考音频和参考文本后进行语音生成。在TTSClient中有一个参考说话者的概念，参考说话者可以拥有多个参考音频和参考文本。

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### 语音生成

1. 选择模型和参考说话者((1), (2))。
2. 选择注册到参考说话者的参考音频和参考文本(3)。
3. 输入要生成的文本并生成语音(4)。

#### 模型注册

请从模型选择区域的编辑按钮进行注册。

#### 参考说话者注册

请从参考说话者注册区域的编辑按钮进行注册。

#### 参考音频、文本注册

请在参考音频选择区域选择未注册的插槽进行注册。

## 从仓库启动（高级）

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

### 使用cuda时

请更换模块。

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### 使用directml时

请更换模块。

```
$ poetry add onnxruntime-directml==1.19.2
```

## 致谢

* [JVNV语料库](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
