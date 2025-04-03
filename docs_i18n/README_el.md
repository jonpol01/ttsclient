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
  *Οι άλλες γλώσσες είναι μηχανικά μεταφρασμένες.

TTSClient
---

Λογισμικό πελάτη Μετατροπής Κειμένου σε Ομιλία (TTS). Σχεδιάζεται να υποστηρίζει διάφορα μοντέλα ΤΝ (επί του παρόντος μόνο GPT-SoVITS v2, v3).

- Υποστηριζόμενα ΤΝ
  - [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS)
  - σύντομα...

# Παραδείγματα

## Γυναικεία φωνή

https://github.com/user-attachments/assets/d6b94c39-b2d3-478a-bc79-29d00f85e1a0

## Πολυγλωσσικό

https://github.com/user-attachments/assets/e02e7df3-89bf-485a-9aed-b654eed4ff2a

## Λεπτομέρειες

https://youtu.be/Fy7qifNB5T0

## Τι νέο!
- v.1.0.21
  - νέο χαρακτηριστικό:
    - Προστέθηκε υποστήριξη για λήψη του [Zundamon](https://github.com/zunzun999/zundamon-speech-webui) από δείγματα zundamon-speech-webui.

- v.1.0.20
  - νέο χαρακτηριστικό:
    - Προστέθηκε υποστήριξη για προσαρμογή τονισμού στο GPT-SoVITS.

- v.1.0.13
  - νέο χαρακτηριστικό:
    - Υποστήριξη για GPT-SoVITS v3, συμπεριλαμβανομένων μοντέλων που έχουν ρυθμιστεί με LoRA.
    - Βελτιωμένη εγγραφή αναφοράς φωνής. Μπορείτε τώρα να εγγράψετε απευθείας από μικρόφωνο ή ήχο υπολογιστή, και γίνεται αυτόματα μεταγραφή κειμένου.

## Σχετικό Λογισμικό
- [Πρόγραμμα Αλλαγής Φωνής σε Πραγματικό Χρόνο VCClient](https://github.com/w-okada/voice-changer)

## Λήψη
Παρακαλώ κατεβάστε από το [αποθετήριο Hugging Face](https://huggingface.co/wok000/ttsclient000/tree/main).

- έκδοση win_std: Έκδοση Windows που εκτελείται σε CPU. Πιο αργή σε σύγκριση με την έκδοση CUDA, αλλά λειτουργεί σε πρόσφατες CPU με καλές προδιαγραφές.
- έκδοση win_cuda: Έκδοση Windows που εκτελείται σε NVIDIA GPU. Εκτελείται πιο γρήγορα με επιτάχυνση υλικού GPU.
- έκδοση mac: Έκδοση για Mac (Apple silicon (M1, M2, M3, κ.λπ.)).

## Χρήση
- Μετά την αποσυμπίεση του αρχείου zip, εκτελέστε το `start_http.bat`. Πρόσβαση στη διεύθυνση URL που εμφανίζεται στον browser σας.
- Χρησιμοποιώντας το `start_https.bat` μπορείτε να έχετε πρόσβαση από απομακρυσμένες τοποθεσίες.
- (Προχωρημένο) Χρησιμοποιώντας το `start_http_with_ngrok.bat` μπορείτε να έχετε πρόσβαση μέσω σήραγγας ngrok.

Σημείωση: Για την έκδοση mac, αντικαταστήστε το .bat με .command.

### GPT-SoVITS

Για λεπτομέρειες μοντέλου, ανατρέξτε στο επίσημο [GPT-SoVITS](https://github.com/RVC-Boss/GPT-SoVITS) αποθετήριο.

Στο GPT-SoVITS, επιλέγετε ένα μοντέλο, αναφορά φωνής και αναφορά κειμένου πριν δημιουργήσετε ομιλία. Το TTSClient έχει μια έννοια αναφοράς ομιλητών, όπου ένας αναφοράς ομιλητής μπορεί να έχει πολλαπλές αναφορές φωνής και αναφορές κειμένου.

![image](https://github.com/user-attachments/assets/032a65ed-b9d5-4f8a-8efe-73bd10b66593)

#### Δημιουργία Ομιλίας

1. Επιλέξτε το μοντέλο και τον αναφορά ομιλητή ((1), (2)).
2. Επιλέξτε την αναφορά φωνής και την αναφορά κειμένου που έχουν εγγραφεί για τον αναφορά ομιλητή (3).
3. Εισαγάγετε το κείμενο που θέλετε να δημιουργήσετε και δημιουργήστε τη φωνή (4).

#### Εγγραφή Μοντέλου

Εγγραφή από το κουμπί επεξεργασίας στην περιοχή επιλογής μοντέλου.

#### Εγγραφή Αναφοράς Ομιλητή

Εγγραφή από το κουμπί επεξεργασίας στην περιοχή εγγραφής αναφοράς ομιλητή.

#### Εγγραφή Αναφοράς Φωνής και Κειμένου

Επιλέξτε μια μη εγγεγραμμένη υποδοχή στην περιοχή επιλογής αναφοράς φωνής για εγγραφή.

## Εκκίνηση από Αποθετήριο (Προχωρημένο)

### Ubuntu

* Απαιτήσεις
  
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
Για απομακρυσμένη πρόσβαση, προσθέστε `--https true`.
---
$ poetry run main cui --https true
```

## Χρήση CUDA
Αντικαταστήστε τις ενότητες ως εξής:
```
$ poetry add onnxruntime-gpu==1.20.1
$ poetry remove torch
$ poetry add torch==2.4.1 torchaudio==2.4.1 --source torch_cuda12
```

## Χρήση DirectML
Αντικαταστήστε τις ενότητες ως εξής:
```
$ poetry add onnxruntime-directml==1.19.2
```

## Ευχαριστίες
- [JVNV Corpus](https://sites.google.com/site/shinnosuketakamichi/research-topics/jvnv_corpus)
