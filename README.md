[日本語](/README.md) /
[英語](/docs_i18n/README_en.md) /
[韓国語](/docs_i18n/README_ko.md)/
[中国語](/docs_i18n/README_zh.md)/
[ドイツ語](/docs_i18n/README_de.md)/
[アラビア語](/docs_i18n/README_ar.md)/
[ギリシャ語](/docs_i18n/README_el.md)/
[スペイン語](/docs_i18n/README_es.md)/
[フランス語](/docs_i18n/README_fr.md)/
[イタリア語](/docs_i18n/README_it.md)/
[ラテン語](/docs_i18n/README_la.md)/
[マレー語](/docs_i18n/README_ms.md)/
[ロシア語](/docs_i18n/README_ru.md) 
  *日本語以外は機械翻訳です。

TTSClient
---

Text To Speech(TTS)のクライアントソフトウェアです。
各種AIに対応していく計画です。(現時点ではGPT-SoVITS v2, v3のみ)

- 対応 AI
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - coming soon...


# サンプル

## 女性

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## 多言語

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## 詳細

https://youtu.be/Fy7qifNB5T0

## What's New!
- v.1.0.21
  - new feature:
    - zundamon-speech-webuiの[ずんだもん](https://github.com/zunzun999/zundamon-speech-webui)をサンプルからダウンロードできるようになりました。

- v.1.0.20
  - new feature:
    - GPT-SoVITSのイントネーション調整ができるようになりました。

- v.1.0.13
  - new feature:
    - GPT-SoVITS v3に対応。loraによるfinetuningしたモデルにも対応しています。
    - 参照音声登録の強化。直接マイクやPC音声を録音できるようになりました。また、自動でテキストの書き起こしも行われます。




## 関連ソフトウェア
- [リアルタイムボイスチェンジャ VCClient](https://github.com/w-okada/voice-changer)

## ダウンロード
[Hugging Faceのリポジトリ](https://huggingface.co/wok000/ttsclient000/tree/main)よりダウンロードしてください。

- win_stdエディション：Windows向けのCPUで動作するエディションです。cuda版と比較して低速ですが、最近のそれなりのスペックのCPUであれば動きます。
- win_cudaエディション：Windows向けのNVIDIAのGPUで動作するエディションです。GPUのハードウェアアクセラレーションにより高速に動きます。
- macエディション：Mac(Apple silicon(M1, M2, M3, etc))向けのエディションです。

## 使用方法
- zipファイルを展開後、`start_http.bat`を実行してください。表示された、URLにブラウザでアクセスしてください。
- `start_https.bat`を使用すると、リモートからでもアクセスすることができます。
- (上級者向け)`start_http_with_ngrok.bat`を使用するとngrokを用いたトンネリングを使用してアクセスすることができます。

note: macエディションは.batを.commandで読み替えてください。

### GPT-SoVITS

モデルの詳細は[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)の公式リポジトリを参照してください。

GPT-SoVITSでは、モデルと参照音声と参照テキストを選択してから、音声生成を行います。TTSClientでは参照話者という概念があり、参照話者に複数の参照音声と参照テキストを持たせることができます。

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### 音声生成

1. モデルと、参照話者を選択します((1), (2))。
2. 参照話者に登録された参照音声と参照テキストを選択します(3)。
3. 生成したいテキストを入力して音声を生成します(4)。

#### モデルの登録

モデル選択エリアの編集ボタンから登録してください。

#### 参照話者の登録

参照話者登録エリアの編集ボタンから登録してください。

#### 参照音声、テキストの登録

参照音声選択エリアで未登録のスロットを選択して登録してください。

## リポジトリからの起動(Advanced)

```
$ git clone https://github.com/w-okada/ttsclient.git
$ cd ttsclient/
$ git submodule update --init --recursive
$ poetry install
$ poetry run main cui
---

リモートからアクセスする場合は`--https true`を付与してください。
---
$ poetry run main cui --https true
```

### cudaを使用する場合
モジュールを入れ替えてください。
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

### directmlを使用する場合
モジュールを入れ替えてください。
```
$ poetry add onnxruntime-directml==1.19.2
```



## Acknowledgements
- [JVNVコーパス](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
