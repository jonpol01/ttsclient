[Japonais](/README.md) /
[Anglais](/docs_i18n/README_en.md) /
[Coréen](/docs_i18n/README_ko.md)/
[Chinois](/docs_i18n/README_zh.md)/
[Allemand](/docs_i18n/README_de.md)/
[Arabe](/docs_i18n/README_ar.md)/
[Grec](/docs_i18n/README_el.md)/
[Espagnol](/docs_i18n/README_es.md)/
[Français](/docs_i18n/README_fr.md)/
[Italien](/docs_i18n/README_it.md)/
[Latin](/docs_i18n/README_la.md)/
[Malais](/docs_i18n/README_ms.md)/
[Russe](/docs_i18n/README_ru.md)
*Les langues autres que le japonais sont traduites automatiquement.

## TTSClient

C'est un logiciel client pour la synthèse vocale (TTS).
Nous prévoyons de prendre en charge divers types d'IA. (Actuellement, uniquement GPT-SoVITS v2, v3)

* IA prise en charge
  * [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  * bientôt disponible...

## Quoi de neuf !

* v.1.0.13
  * nouvelle fonctionnalité :
    * Prise en charge de GPT-SoVITS v3. Prend également en charge les modèles ajustés par lora.
    * Amélioration de l'enregistrement des voix de référence. Vous pouvez désormais enregistrer directement à partir d'un microphone ou du son de votre PC. De plus, la transcription automatique du texte est également effectuée.

https://github.com/user-attachments/assets/cdf33212-3077-4ff0-9fa2-8635ee5417f4

## Logiciels associés

* [Changeur de voix en temps réel VCClient](https://github.com/w-okada/voice-changer)

## Télécharger

[Depuis le dépôt Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main)veuillez télécharger.

* Édition win_std : C'est une édition fonctionnant sur un CPU pour Windows. Elle est plus lente que la version cuda, mais fonctionne sur un CPU de spécifications récentes.
* Édition win_cuda : C'est une édition fonctionnant sur un GPU NVIDIA pour Windows. Elle fonctionne rapidement grâce à l'accélération matérielle du GPU.
* Édition mac : C'est une édition pour Mac (Apple silicon (M1, M2, M3, etc)).

## Mode d'emploi

* Après avoir extrait le fichier zip,`start_http.bat`veuillez exécuter. Accédez à l'URL affichée dans votre navigateur.
* `start_https.bat`En utilisant, vous pouvez y accéder même à distance.
* (Pour utilisateurs avancés)`start_http_with_ngrok.bat`En utilisant, vous pouvez accéder en utilisant le tunneling avec ngrok.

note : pour l'édition mac, remplacez .bat par .command.

### GPT-SoVITS

Pour plus de détails sur le modèle, veuillez consulter[GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)le dépôt officiel.

Dans GPT-SoVITS, vous effectuez la génération vocale après avoir sélectionné le modèle, la voix de référence et le texte de référence. Dans TTSClient, il existe le concept de locuteur de référence, qui peut avoir plusieurs voix de référence et textes de référence.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Génération vocale

1. Sélectionnez le modèle et le locuteur de référence ((1), (2)).
2. Sélectionnez la voix de référence et le texte de référence enregistrés pour le locuteur de référence (3).
3. Entrez le texte que vous souhaitez générer et générez la voix (4).

#### Enregistrement du modèle

Veuillez enregistrer à partir du bouton d'édition de la zone de sélection du modèle.

#### Enregistrement du locuteur de référence

Veuillez enregistrer à partir du bouton d'édition de la zone d'enregistrement du locuteur de référence.

#### Enregistrement de la voix de référence et du texte

Veuillez sélectionner un emplacement non enregistré dans la zone de sélection de la voix de référence pour enregistrer.

## Démarrage à partir du dépôt (Avancé)

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

### Lors de l'utilisation de cuda

Veuillez remplacer les modules.

```
$ poetry add onnxruntime-gpu==1.19.2
$ poetry remove torch
$ poetry add torch==2.3.1 --source torch_cuda12
```

### Lors de l'utilisation de directml

Veuillez remplacer les modules.

```
$ poetry add onnxruntime-directml==1.19.2
```

## Remerciements

* [Corpus JVNV](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
