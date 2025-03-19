import logging
import requests
import math
from pathlib import Path
from threading import Thread
from typing import Callable

from ttsclient.const import LOGGER_NAME, UPLOAD_DIR
from ttsclient.tts.data_types.sample_manager_data_types import GPTSoVITSSampleInfo, SampleDownloadParam, SampleDownloadStatus, SampleInfoMember, VoiceCharacterSampleInfo
from ttsclient.tts.data_types.slot_manager_data_types import GPTSoVITSModelImportParam, ModelImportParamMember, VoiceCharacterImportParam
from ttsclient.tts.slot_manager.slot_manager import SlotManager
from ttsclient.tts.voice_character_slot_manager.voice_character_slot_manager import VoiceCharacterSlotManager


REGISTERD_SAMPLES: list[SampleInfoMember] = []


class SampleManager:
    _instance = None
    # module_status_list: list[ModuleStatus] = []

    @classmethod
    def get_instance(cls):
        if cls._instance is None:

            cls._instance = cls()
            return cls._instance

        return cls._instance

    def __init__(self) -> None:
        self.sample_list: list[SampleInfoMember] = []
        self.reload()
        # logging.getLogger(LOGGER_NAME).info(f"Initial sample status: {self.sample_list }")

    def reload(self):
        self.sample_list = [
            GPTSoVITSSampleInfo(
                id="Zundamon_official_v2",
                tts_type="GPT-SoVITS",
                lang="ja-JP",
                tag=[],
                name="ずんだもん(公式提供版)",
                terms_of_use_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/terms_of_use.txt",
                icon_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/icon.png",
                credit="",
                description="",
                semantic_predictor_model_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/zudamon_style_1-e15.ckpt",
                synthesizer_model_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/zudamon_style_1_e8_s96.pth",
                version="v2",
                model_version="v2",
                lora_v3=False,
            ),
            VoiceCharacterSampleInfo(
                id="VC_Zundamon_official",
                tts_type="VoiceCharacter",
                lang="ja-JP",
                tag=[],
                name="ずんだもん",
                terms_of_use_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/voice_character_terms_of_use.txt",
                icon_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/voice_character_zundamon_icon.png",
                credit="",
                description="",
                zip_url="https://huggingface.co/wok000/gpt-sovits-models/resolve/main/zundamon/voice_character_zundamon.zip",
            ),
        ]

    def get_samples(self):
        return self.sample_list

    def _download(self, upload_dir: Path, target_sample: SampleInfoMember, callback: Callable[[SampleDownloadStatus], None], rvc_skip_index: bool = False):
        upload_dir.mkdir(parents=True, exist_ok=True)

        if target_sample.tts_type == "GPT-SoVITS":
            assert isinstance(target_sample, GPTSoVITSSampleInfo)

            download_urls = []
            download_urls.append(target_sample.semantic_predictor_model_url)
            download_urls.append(target_sample.synthesizer_model_url)
            if target_sample.icon_url is not None:
                if len(target_sample.icon_url) == 0:
                    raise Exception("length of icon_url is zero.")
                download_urls.append(target_sample.icon_url)

            for url_index, url in enumerate(download_urls):
                req = requests.get(url, stream=True, allow_redirects=True)
                content_length_header = req.headers.get("content-length")
                content_length = int(content_length_header) if content_length_header is not None else 1024 * 1024 * 1024
                chunk_size = 1024 * 1024
                chunk_num = math.ceil(content_length / chunk_size)
                save_to = upload_dir / url.split("/")[-1]
                with open(save_to, "wb") as f:
                    for i, chunk in enumerate(req.iter_content(chunk_size=chunk_size)):
                        f.write(chunk)
                        file_progress = min(1.0, round((i + 1) / chunk_num, 2))
                        progress = file_progress / len(download_urls) + (1 / len(download_urls)) * url_index
                        progress = round(progress, 2)
                        callback(
                            SampleDownloadStatus(
                                id=target_sample.id,
                                status="processing",
                                progress=progress,
                            )
                        )
        elif target_sample.tts_type == "VoiceCharacter":
            assert isinstance(target_sample, VoiceCharacterSampleInfo)

            download_urls = []
            download_urls.append(target_sample.zip_url)
            if target_sample.icon_url is not None:
                if len(target_sample.icon_url) == 0:
                    raise Exception("length of icon_url is zero.")
                download_urls.append(target_sample.icon_url)

            for url_index, url in enumerate(download_urls):

                req = requests.get(url, stream=True, allow_redirects=True)
                content_length_header = req.headers.get("content-length")
                content_length = int(content_length_header) if content_length_header is not None else 1024 * 1024 * 1024
                chunk_size = 1024 * 1024
                chunk_num = math.ceil(content_length / chunk_size)
                save_to = upload_dir / url.split("/")[-1]
                with open(save_to, "wb") as f:
                    for i, chunk in enumerate(req.iter_content(chunk_size=chunk_size)):
                        f.write(chunk)
                        file_progress = min(1.0, round((i + 1) / chunk_num, 2))
                        progress = file_progress / len(download_urls) + (1 / len(download_urls)) * url_index
                        progress = round(progress, 2)
                        callback(
                            SampleDownloadStatus(
                                id=target_sample.id,
                                status="processing",
                                progress=progress,
                            )
                        )

    def download(self, upload_dir: Path, param: SampleDownloadParam):
        samples = [x for x in self.sample_list if x.id == param.sample_id]
        if len(samples) != 1:
            raise Exception(f"Sample {param.sample_id} not found.")

        sample = samples[0]

        if sample.tts_type == "VoiceCharacter":
            voice_character_slot_manager = VoiceCharacterSlotManager.get_instance()
            voice_character_slot_manager.reserve_slot_for_sample(param.slot_index)

            def callback(status: SampleDownloadStatus):
                logging.getLogger(LOGGER_NAME).debug(f"Download status: {status}")
                voice_character_slot_manager.update_slot_for_sample(param.slot_index, status.progress)

            try:
                self._download(upload_dir, sample, callback)
            except Exception as e:
                logging.getLogger(LOGGER_NAME).error(f"Failed to download: {e}")

            assert isinstance(sample, VoiceCharacterSampleInfo)
            import_params = VoiceCharacterImportParam(
                slot_index=param.slot_index,
                name="",
                tts_type="VoiceCharacter",
                zip_file=upload_dir / sample.zip_url.split("/")[-1],
            )
            voice_character_slot_manager.release_slot_from_reseved_for_sample(param.slot_index)
            voice_character_slot_manager.set_new_slot(import_params)
        else:
            slot_manager = SlotManager.get_instance()
            slot_manager.reserve_slot_for_sample(param.slot_index)

            def callback(status: SampleDownloadStatus):
                logging.getLogger(LOGGER_NAME).debug(f"Download status: {status}")
                slot_manager.update_slot_for_sample(param.slot_index, status.progress)

            self._download(upload_dir, sample, callback)

            if sample.tts_type == "GPT-SoVITS":
                assert isinstance(sample, GPTSoVITSSampleInfo)
                import_params = GPTSoVITSModelImportParam(
                    slot_index=param.slot_index,
                    name=sample.name,
                    terms_of_use_url=sample.terms_of_use_url,
                    semantic_predictor_model_path=upload_dir / sample.semantic_predictor_model_url.split("/")[-1],
                    synthesizer_model_path=upload_dir / sample.synthesizer_model_url.split("/")[-1],
                    icon_file=upload_dir / sample.icon_url.split("/")[-1] if sample.icon_url is not None else None,
                )
                slot_manager.release_slot_from_reseved_for_sample(param.slot_index)
                slot_manager.set_new_slot(import_params)

    def download_initial_samples(self, callback: Callable[[list[SampleDownloadStatus]], None]):
        INITIAL_SAMPLES: list[str] = []  # noqa
        INITIAL_SAMPLES = [  # noqa
            "Zundamon_official_v2",
        ]

        initial_samples = [x for x in self.get_samples() if x.id in INITIAL_SAMPLES]
        # x.info.idをキーにした辞書配列でstatusを管理。
        status_dict = {x.id: SampleDownloadStatus(id=x.id, status="processing", progress=0.0) for x in initial_samples}

        # status_dictをdownloadのコールバックで更新する
        def download_callback(status: SampleDownloadStatus):
            status_dict[status.id] = status
            callback(list(status_dict.values()))

        self.threads = {}

        for samples in initial_samples:
            t = Thread(
                target=self._download,
                args=(UPLOAD_DIR, samples, download_callback, True),
            )
            t.start()
            self.threads[samples.id] = t

        for id, threads in self.threads.items():
            threads.join()
            logging.getLogger(LOGGER_NAME).debug(f"Sample download status: {id} done.")
        logging.getLogger(LOGGER_NAME).debug("Sample download done.")

        for i, sample in enumerate(initial_samples):

            if sample.tts_type == "GPT-SoVITS":
                assert isinstance(sample, GPTSoVITSSampleInfo)
                import_params: ModelImportParamMember = GPTSoVITSModelImportParam(
                    slot_index=i,
                    name=sample.name,
                    terms_of_use_url=sample.terms_of_use_url,
                    model_file=UPLOAD_DIR / sample.model_url.split("/")[-1],
                    index_file=None,
                    icon_file=UPLOAD_DIR / sample.icon_url.split("/")[-1] if sample.icon_url is not None else None,
                )
                slot_manager = SlotManager.get_instance()
                slot_manager.set_new_slot(import_params, remove_src=True)
