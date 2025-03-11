import io
import logging
import os
from pathlib import Path
import shutil
import uuid
import zipfile

from faster_whisper import WhisperModel
from ttsclient.const import LOGGER_NAME, MAX_REFERENCE_VOICE_SLOT_INDEX, MAX_VOICE_CHARACTER_SLOT_INDEX, OPENJTALK_USER_DICT_CSV_FILE, VOICE_CHARACTER_SLOT_PARAM_FILE, TranscriberComputeType, TranscriberDevice, TranscriberModelSize, VoiceCharacterDir
from ttsclient.tts.configuration_manager.configuration_manager import ConfigurationManager
from ttsclient.tts.data_types.slot_manager_data_types import MoveModelParam, MoveReferenceVoiceParam, ReferenceVoice, ReferenceVoiceImportParam, SetIconParam, VoiceCharacter, VoiceCharacterImportParam
from ttsclient.tts.data_types.tts_manager_data_types import OpenJTalkUserDictRecord
from ttsclient.tts.voice_character_slot_manager.importer.importer import import_voice_character


def load_slot_info(model_dir: Path, slot_index: int) -> VoiceCharacter:
    slot_dir = model_dir / str(slot_index)
    json_file = slot_dir / VOICE_CHARACTER_SLOT_PARAM_FILE
    if not os.path.exists(json_file):
        # return None
        blank = VoiceCharacter()
        blank.tts_type = None
        blank.slot_index = slot_index
        return blank

    try:
        tmp_slot_info = VoiceCharacter.model_validate_json(open(json_file, encoding="utf-8").read())
        logging.getLogger(LOGGER_NAME).debug(tmp_slot_info)
        if tmp_slot_info.tts_type == "GPT-SoVITS":
            slot_info = VoiceCharacter.model_validate_json(open(json_file, encoding="utf-8").read())

        return slot_info
    except Exception as e:
        logging.getLogger(LOGGER_NAME).error(f"Error in loading slot info: {e}")
        broken = VoiceCharacter()
        broken.tts_type = "BROKEN"
        broken.slot_index = slot_index
        return broken


def reload_slot_infos(model_dir: Path) -> list[VoiceCharacter]:
    slot_infos = []
    for i in range(MAX_VOICE_CHARACTER_SLOT_INDEX):
        slot_info = load_slot_info(model_dir, i)
        slot_infos.append(slot_info)

    return slot_infos


class VoiceCharacterSlotManager:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:

            cls._instance = cls()
            return cls._instance

        return cls._instance

    def __init__(self):
        self.reload()
        self.transcriber: WhisperModel | None = None
        self.current_transcriber_model_size: TranscriberModelSize | None = None
        self.current_transcriber_device: TranscriberDevice | None = None
        self.current_transcriber_compute_type: TranscriberComputeType | None = None

    def reload(self, use_log=True) -> list[VoiceCharacter]:
        logging.getLogger(LOGGER_NAME).debug("Reloading Slot info")
        self.slot_infos = reload_slot_infos(VoiceCharacterDir)
        return self.slot_infos

    def get_slot_infos(self) -> list[VoiceCharacter]:
        return self.slot_infos

    def get_slot_info(self, index: int):
        slot_info_array = [slot_info for slot_info in self.get_slot_infos() if slot_info.slot_index == index]
        if len(slot_info_array) == 0:
            raise RuntimeError(f"slot_index:{index} is not found.")
        return slot_info_array[0]

    def get_blank_slot_index(self) -> int:
        self.reload(use_log=False)
        exist_slot_index = {slot_info.slot_index for slot_info in self.slot_infos if slot_info.tts_type is not None}
        next_index = next((i for i in range(MAX_VOICE_CHARACTER_SLOT_INDEX) if i not in exist_slot_index), -1)
        if next_index == -1:
            raise RuntimeError("No blank slot index")
        return next_index

    def set_new_slot(self, voice_character_import_param: VoiceCharacterImportParam, remove_src: bool = False):
        if voice_character_import_param.slot_index is None:
            voice_character_import_param.slot_index = self.get_blank_slot_index()

        assert self.get_slot_info(voice_character_import_param.slot_index).tts_type is None, f"slot_index:{voice_character_import_param.slot_index} is already exists."

        logging.getLogger(LOGGER_NAME).info(f"set new slot: {voice_character_import_param}")
        import_voice_character(VoiceCharacterDir, voice_character_import_param, remove_src)
        self.reload()

    def delete_slot(self, slot_index: int):
        slot_dir = VoiceCharacterDir / str(slot_index)
        if os.path.exists(slot_dir):
            shutil.rmtree(slot_dir)
        self.reload(use_log=False)

    def update_slot_info(self, slot_info: VoiceCharacter):
        org_slot_info = self.get_slot_info(slot_info.slot_index)
        logging.getLogger(LOGGER_NAME).debug(f"updating slot info: org => {org_slot_info}")
        assert org_slot_info.tts_type is not None, f"src:{slot_info.slot_index} is not exist."
        logging.getLogger(LOGGER_NAME).debug(f"updating slot info: new => {slot_info}")
        slot_dir = VoiceCharacterDir / f"{slot_info.slot_index}"
        slot_dir.mkdir(parents=True, exist_ok=True)
        config_file = slot_dir / VOICE_CHARACTER_SLOT_PARAM_FILE

        with open(config_file, "w", encoding="utf-8") as f:
            f.write(slot_info.model_dump_json(indent=4))

        index_in_slot_info = [i for i, s in enumerate(self.get_slot_infos()) if s.slot_index == org_slot_info.slot_index]
        assert len(index_in_slot_info) == 1
        self.slot_infos[index_in_slot_info[0]] = slot_info

    def move_model_slot(self, param: MoveModelParam):
        assert param.dst <= MAX_VOICE_CHARACTER_SLOT_INDEX, f"dst:{param.dst} is over MAX_SLOT_INDEX:{MAX_VOICE_CHARACTER_SLOT_INDEX}"
        # logging.getLogger(LOGGER_NAME).info(f"move_model_slot src: {self.get_slot_info(param.src)}")
        # logging.getLogger(LOGGER_NAME).info(f"move_model_slot src: {self.get_slot_info(param.src).voice_changer_type}")
        # logging.getLogger(LOGGER_NAME).info(f"move_model_slot src: {self.get_slot_info(param.src).voice_changer_type is not None}")
        # logging.getLogger(LOGGER_NAME).info(f"move_model_slot dst: {self.get_slot_info(param.dst)}")
        # logging.getLogger(LOGGER_NAME).info(f"move_model_slot dst: {self.get_slot_info(param.dst).voice_changer_type}")
        # logging.getLogger(LOGGER_NAME).info(f"move_model_slot dst: {self.get_slot_info(param.dst).voice_changer_type is None}")

        assert self.get_slot_info(param.dst).tts_type is None, f"dst:{param.dst} is already exists."
        assert self.get_slot_info(param.src).tts_type is not None, f"src:{param.src} is not exist."

        slot_info = self.get_slot_info(param.src)
        slot_info.slot_index = param.dst

        src_path = VoiceCharacterDir / str(param.src)
        dst_path = VoiceCharacterDir / str(param.dst)
        if os.path.exists(src_path):
            shutil.move(src_path, dst_path)

        # self._validate_slot_index(param.dst)

        slot_dir = VoiceCharacterDir / f"{param.dst}"
        config_file = slot_dir / VOICE_CHARACTER_SLOT_PARAM_FILE
        with open(config_file, "w", encoding="utf-8") as f:
            f.write(slot_info.model_dump_json(indent=4))
        self.reload(use_log=False)

    def zip_and_download(self, index: int):
        slot_info = self.get_slot_info(index)
        slot_dir = VoiceCharacterDir / str(index)
        if not os.path.exists(slot_dir):
            raise RuntimeError(f"slot_index:{index} is not exists.")

        io_buffer = io.BytesIO()
        # `zipfile`モジュールを使ってメモリ内にZIPファイルを作成
        with zipfile.ZipFile(io_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
            for root, _, files in os.walk(slot_dir):
                for file in files:
                    file_path = os.path.join(root, file)
                    arcname = os.path.relpath(file_path, slot_dir)
                    zip_file.write(file_path, arcname)
                    # print("zipping... arcname:", arcname)

        io_buffer.seek(0)
        # print("zipping... done")

        return slot_info.name, io_buffer

    def set_icon_file(self, voice_character_slot_index: int, param: SetIconParam):
        try:
            icon_name = uuid.uuid4()
            icon_dst_path = VoiceCharacterDir / f"{voice_character_slot_index}" / f"{icon_name}{param.icon_file.suffix}"
            shutil.move(param.icon_file, icon_dst_path)
            slot_info = self.get_slot_info(voice_character_slot_index)
            assert slot_info is not None, f"slot_index:{voice_character_slot_index} is not exists."
            slot_info.icon_file = Path(icon_dst_path.name)
            self.update_slot_info(slot_info)
        finally:
            if param.icon_file.exists():
                param.icon_file.unlink()

    def get_voice_blank_slot_index(self, voice_character_slot_index: int):
        self.reload(use_log=False)
        voice_character = self.get_slot_info(voice_character_slot_index)
        assert voice_character.tts_type is not None, f"voice_character_slot_index:{voice_character_slot_index} is not exists."

        exist_slot_index = {voice.slot_index for voice in voice_character.reference_voices}
        next_index = next((i for i in range(MAX_REFERENCE_VOICE_SLOT_INDEX) if i not in exist_slot_index), -1)
        if next_index == -1:
            raise RuntimeError("No blank slot index")
        return next_index

    def add_voice_audio(self, index: int, import_params: ReferenceVoiceImportParam, remove_src: bool = False):
        config = ConfigurationManager.get_instance().get_tts_configuration()
        try:
            voice_character = self.get_slot_info(index)
            assert voice_character.tts_type is not None, f"voice_character_slot_index:{index} is not exists."

            if import_params.slot_index is None:
                import_params.slot_index = self.get_voice_blank_slot_index(index)
            assert import_params.slot_index <= MAX_REFERENCE_VOICE_SLOT_INDEX, f"slot_index:{import_params.slot_index} is over MAX_REFERENCE_VOICE_SLOT_INDEX:{MAX_REFERENCE_VOICE_SLOT_INDEX}"

            wav_name = uuid.uuid4()
            audio_dst_path = VoiceCharacterDir / f"{index}" / f"{wav_name}.wav"
            shutil.move(import_params.wav_file, audio_dst_path)

            # パディング
            import librosa
            import soundfile as sf

            # audio_dst_pathのファイルを読み込み
            y, sr = librosa.load(audio_dst_path, sr=None)
            # 3秒未満の場合、3秒になるようにパディング
            if len(y) < sr * 3:
                y = librosa.util.fix_length(y, size=sr * 3)
                sf.write(audio_dst_path, y, sr)
            # 10秒以上の場合、10秒になるようにカット
            elif len(y) > sr * 10:
                y = y[: sr * 10]
                sf.write(audio_dst_path, y, sr)

            # 音声書き起こし
            # モデルのロード
            try:
                if config.transcribe_audio is True:
                    if self.transcriber is None or self.current_transcriber_model_size != config.transcriber_model_size or self.current_transcriber_device != config.transcriber_device or self.current_transcriber_compute_type != config.transcriber_compute_type:
                        print(f"Initialize Transcriber.... {config.transcriber_model_size}, {config.transcriber_device}, {config.transcriber_compute_type}")
                        os.environ["KMP_DUPLICATE_LIB_OK"] = "TRUE"
                        self.transcriber = WhisperModel(config.transcriber_model_size, device=config.transcriber_device, compute_type=config.transcriber_compute_type)
                        self.current_transcriber_model_size = config.transcriber_model_size
                        self.current_transcriber_device = config.transcriber_device
                        self.current_transcriber_compute_type = config.transcriber_compute_type
                        print("Initialize Transcriber.... done.")
                else:
                    self.transcriber = None
            except Exception as e:
                print(f"Error in initializing Transcriber: {e}")
                self.transcriber = None

            # 書き起こし
            text = ""
            if self.transcriber is not None:
                segments, info = self.transcriber.transcribe(
                    audio_dst_path,
                    beam_size=5,
                    vad_filter=True,
                    without_timestamps=True,
                )
                print("Detected language '%s' with probability %f" % (info.language, info.language_probability))
                for segment in segments:
                    print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
                    text += segment.text

            if import_params.icon_file is not None:
                logging.getLogger(LOGGER_NAME).info(f"icon_file: {import_params.icon_file}")
                icon_name = uuid.uuid4()
                icon_dst_path = VoiceCharacterDir / f"{index}" / f"{icon_name}{import_params.icon_file.suffix}"
                shutil.move(import_params.icon_file, icon_dst_path)
                import_params.icon_file = Path(icon_dst_path.name)
            else:
                logging.getLogger(LOGGER_NAME).info(f"no icon_file: {import_params}")

            voice_info = ReferenceVoice(
                voice_type=import_params.voice_type,
                slot_index=import_params.slot_index,
                wav_file=Path(audio_dst_path.name),
                text=import_params.text if import_params.text is not None else text,
                language="all_ja",
                icon_file=import_params.icon_file if import_params.icon_file is not None else None,
            )

            voice_character.reference_voices.append(voice_info)
            self.update_slot_info(voice_character)
        finally:
            if import_params.wav_file.exists() and remove_src:
                import_params.wav_file.unlink()

    def delete_voice_audio(self, voice_character_slot_index: int, voice_index: int):
        voice_character = self.get_slot_info(voice_character_slot_index)
        assert voice_character.tts_type is not None, f"voice_character_slot_index:{voice_character_slot_index} is not exists."

        # voice_character.reference_voices　から voice.slot_index == voice_indexのものを取りだす。⇒ファイル削除
        voice = [voice for voice in voice_character.reference_voices if voice.slot_index == voice_index]
        assert len(voice) == 1, f"voice_index:{voice_index} is not exists."
        voice_path = VoiceCharacterDir / f"{voice_character_slot_index}" / voice[0].wav_file
        voice_path.unlink()

        # voice_character.reference_voices　から voice.slot_index == voice_indexのものを取り除く
        voice_character.reference_voices = [voice for voice in voice_character.reference_voices if voice.slot_index != voice_index]
        self.update_slot_info(voice_character)

    def update_voice_audio(self, voice_character_slot_index: int, voice_index: int, reference_voice: ReferenceVoice):
        voice_character = self.get_slot_info(voice_character_slot_index)
        assert voice_character.tts_type is not None, f"voice_character_slot_index:{voice_character_slot_index} is not exists."

        # voice_character.reference_voices　から voice.slot_index == voice_indexのものを取りだす。⇒編集
        voice = [voice for voice in voice_character.reference_voices if voice.slot_index == voice_index]
        assert len(voice) == 1, f"voice_index:{voice_index} is not exists."

        # 編集可能な項目のみ更新
        voice[0].voice_type = reference_voice.voice_type
        voice[0].text = reference_voice.text
        voice[0].language = reference_voice.language
        self.update_slot_info(voice_character)

    def move_voice_audio(self, voice_character_slot_index: int, param: MoveReferenceVoiceParam):
        voice_character = self.get_slot_info(voice_character_slot_index)
        assert voice_character.tts_type is not None, f"voice_character_slot_index:{voice_character_slot_index} is not exists."

        assert param.dst <= MAX_REFERENCE_VOICE_SLOT_INDEX, f"dst:{param.dst} is over MAX_SLOT_INDEX:{MAX_REFERENCE_VOICE_SLOT_INDEX}"

        # voice_character.reference_voices　から voice.slot_index == voice_indexのものを取りだす。⇒ファイル削除
        src_voice = [voice for voice in voice_character.reference_voices if voice.slot_index == param.src]
        assert len(src_voice) == 1, f"src voice_index:{param.src} is not exists."

        dst_voice = [voice for voice in voice_character.reference_voices if voice.slot_index == param.dst]
        assert len(dst_voice) == 0, f"dst voice_index:{param.dst} is exists."

        # src_voiceのindexをdstのindexに変更
        src_voice[0].slot_index = param.dst
        # ↓ファイル名をUUIDにしたので、slotで一意なファイルになっている。ファイル名の変更などは不要なはず
        # # wavファイル移動
        # dst_filename = VoiceCharacterDir / f"{voice_character_slot_index}" / f"{param.dst:04d}.wav"
        # shutil.move(src_voice[0].wav_file, dst_filename)
        # src_voice[0].wav_file = dst_filename.name
        # # iconファイル移動
        # if src_voice[0].icon_file is not None:
        #     dst_icon_filename = VoiceCharacterDir / f"{voice_character_slot_index}" / f"{param.dst:04d}{src_voice[0].icon_file.suffix}"
        #     shutil.move(src_voice[0].icon_file, dst_icon_filename)
        #     src_voice[0].icon_file = dst_icon_filename.name

        self.update_slot_info(voice_character)

    def set_voice_icon_file(self, voice_character_slot_index: int, voice_index: int, param: SetIconParam):
        voice_character = self.get_slot_info(voice_character_slot_index)
        assert voice_character.tts_type is not None, f"voice_character_slot_index:{voice_character_slot_index} is not exists."

        # voice_character.reference_voices　から voice.slot_index == voice_indexのものを取りだす。⇒編集
        voice = [voice for voice in voice_character.reference_voices if voice.slot_index == voice_index]
        assert len(voice) == 1, f"voice_index:{voice_index} is not exists."
        icon_name = uuid.uuid4()
        try:
            icon_dst_path = VoiceCharacterDir / f"{voice_character_slot_index}" / f"{icon_name}{param.icon_file.suffix}"
            shutil.move(param.icon_file, icon_dst_path)
            voice[0].icon_file = Path(icon_dst_path.name)
            self.update_slot_info(voice_character)
        finally:
            if param.icon_file.exists():
                param.icon_file.unlink()

    def add_user_dict_record(self, index: int, param: OpenJTalkUserDictRecord):
        slot_info = self.get_slot_info(index)
        assert slot_info.tts_type is not None, f"slot_index:{index} is not exists."

        user_dict_file = VoiceCharacterDir / f"{index}" / OPENJTALK_USER_DICT_CSV_FILE

        # Create new entry
        entry = f"{param.string},*,*,-32767,{param.pos},{param.pos_group1},{param.pos_group2},{param.pos_group3},{param.ctype},{param.cform},{param.orig},{param.read},{param.pron},{param.acc}/{param.mora_size},{param.chain_rule}\n"

        # Read existing entries
        existing_entries = []
        if user_dict_file.exists():
            with open(user_dict_file, "r", encoding="utf-8") as f:
                existing_entries = f.readlines()

        # Remove entries with matching first column
        updated_entries = [e for e in existing_entries if e.split(",")[0] != param.string]

        # Add new entry
        updated_entries.append(entry)

        # Write back all entries
        with open(user_dict_file, "w", encoding="utf-8") as f:
            f.writelines(updated_entries)

        logging.getLogger(LOGGER_NAME).debug(f"add_user_dict_record: {entry}")
        self.reload(use_log=False)
