import io
import wave
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ttsclient.server.validation_error_logging_route import ValidationErrorLoggingRoute
from ttsclient.tts.data_types.tts_manager_data_types import GenerateVoiceParam, GetPhonesParam, GetPhonesResponse, GetJpTextToUserDictRecordsParam
from ttsclient.tts.tts_manager.tts_manager import TTSManager

# import soundfile as sf


class RestAPITTSManager:
    def __init__(self):
        self.router = APIRouter()
        self.router.route_class = ValidationErrorLoggingRoute

        self.router.add_api_route("/api/tts-manager/operation/generateVoice", self.post_generate_voice, methods=["POST"])
        self.router.add_api_route("/api/tts-manager/operation/getPhones", self.post_get_phones, methods=["POST"])
        self.router.add_api_route("/api/tts-manager/operation/getJpTextToUserDictRecords", self.post_jp_text_to_user_dict_records, methods=["POST"])

        self.router.add_api_route("/api_tts-manager_operation_generateVoice", self.post_generate_voice, methods=["POST"])
        self.router.add_api_route("/api_tts-manager_operation_getPhones", self.post_get_phones, methods=["POST"])
        self.router.add_api_route("/api_tts-manager_operation_getJpTextToUserDictRecords", self.post_jp_text_to_user_dict_records, methods=["POST"])

    def post_get_phones(self, get_phones_param: GetPhonesParam):
        phones, phone_symboles = TTSManager.get_instance().get_phones(get_phones_param)
        res = GetPhonesResponse(phones=phones, phone_symbols=phone_symboles)
        return res

    def post_jp_text_to_user_dict_records(self, get_jp_text_to_user_dict_records_param: GetJpTextToUserDictRecordsParam):
        records = TTSManager.get_instance().jp_text_to_user_dict_records(get_jp_text_to_user_dict_records_param)
        return records

    def post_generate_voice(self, generarte_voice_param: GenerateVoiceParam):
        last_sampling_rate, last_audio_data = TTSManager.get_instance().run(generarte_voice_param)
        # sf.write("output.wav", last_audio_data, last_sampling_rate)

        audio_buffer = io.BytesIO()
        with wave.open(audio_buffer, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)  # 2 bytes for 16-bit audio
            wf.setframerate(last_sampling_rate)
            wf.writeframes(last_audio_data.tobytes())

        audio_buffer.seek(0)

        return StreamingResponse(audio_buffer, media_type="audio/wav", headers={"Content-Disposition": "attachment; filename=output.wav"})

        # with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
        #     tmp_file_name = tmp_file.name
        #     with wave.open(tmp_file_name, "w") as wf:
        #         wf.setnchannels(1)
        #         wf.setsampwidth(2)  # 2 bytes for 16-bit audio
        #         wf.setframerate(last_sampling_rate)
        #         wf.writeframes(last_audio_data.tobytes())

        # try:
        #     return FileResponse(tmp_file_name, media_type="audio/wav", filename="output.wav")
        # finally:
        #     os.remove(tmp_file_name)
