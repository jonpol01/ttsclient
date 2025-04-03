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
  *其他语言为机器翻译。

TTSClient
---

文本转语音（TTS）客户端软件。计划支持各种AI模型（目前仅支持GPT-SoVITS v2, v3）。

- 支持的AI
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - 即将推出...

# 示例

## 女声

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## 多语言

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## 详细信息

https://youtu.be/Fy7qifNB5T0

## 新功能！
- v.1.0.21
  - 新功能：
    - 可以从zundamon-speech-webui下载[Zundamon](https://github.com/zunzun999/zundamon-speech-webui)样本。

- v.1.0.20
  - 新功能：
    - 支持GPT-SoVITS的语调调整。

- v.1.0.13
  - 新功能：
    - 支持GPT-SoVITS v3，包括使用LoRA微调的模型。
    - 增强了参考语音注册功能。现在可以直接从麦克风或PC音频录制，并自动进行文本转录。

## 相关软件
- [实时语音变声器 VCClient](https://github.com/w-okada/voice-changer)

## 下载
请从[Hugging Face仓库](https://huggingface.co/wok000/ttsclient000/tree/main)下载。

- win_std版本：Windows CPU版本。与CUDA版本相比速度较慢，但在最近的普通配置CPU上可以运行。
- win_cuda版本：Windows NVIDIA GPU版本。通过GPU硬件加速运行更快。
- mac版本：Mac（Apple silicon（M1、M2、M3等））版本。

## 使用方法
- 解压zip文件后，运行`start_http.bat`。在浏览器中访问显示的URL。
- 使用`start_https.bat`可以从远程位置访问。
- （高级）使用`start_http_with_ngrok.bat`可以通过ngrok隧道访问。

注意：mac版本请将.bat替换为.command。

### GPT-SoVITS

有关模型详情，请参考官方[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)仓库。

在GPT-SoVITS中，您需要选择模型、参考语音和参考文本才能生成语音。TTSClient有一个参考说话者的概念，一个参考说话者可以有多个参考语音和参考文本。

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### 语音生成

1. 选择模型和参考说话者（(1)、(2)）。
2. 选择参考说话者注册的参考语音和参考文本（3）。
3. 输入要生成的文本并创建语音（4）。

#### 模型注册

从模型选择区域的编辑按钮注册。

#### 参考说话者注册

从参考说话者注册区域的编辑按钮注册。

#### 参考语音和文本注册

在参考语音选择区域选择未注册的插槽进行注册。

## 从仓库启动（高级）

### Ubuntu

* 要求
  
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
要从远程访问，请添加`--https true`。
---
$ poetry run main cui --https true
```

## 使用CUDA
按如下方式替换模块：
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## 使用DirectML
按如下方式替换模块：
```
$ poetry add onnxruntime-directml==1.19.2
```

## 致谢
- [JVNV语料库](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
