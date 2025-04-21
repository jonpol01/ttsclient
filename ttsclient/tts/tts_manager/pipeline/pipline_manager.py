from ttsclient.tts.tts_manager.pipeline.gpt_sovits_faster_pipeline import GPTSoVITSFasterPipeline
from ttsclient.tts.tts_manager.pipeline.pipeline import Pipeline
from ttsclient.tts.tts_manager.pipeline.gpt_sovits_pipeline import GPTSoVITSPipeline
from ttsclient.tts.tts_manager.pipeline.gpt_sovits_v3_pipeline import GPTSoVITSV3Pipeline
from ttsclient.tts.tts_manager.pipeline.gpt_sovits_v4_pipeline import GPTSoVITSV4Pipeline
from ...data_types.slot_manager_data_types import GPTSoVITSSlotInfo, SlotInfo


class PipelineManager:

    @classmethod
    def get_pipeline(cls, slot_info: SlotInfo) -> Pipeline:
        if slot_info.tts_type == "GPT-SoVITS":
            assert isinstance(slot_info, GPTSoVITSSlotInfo)
            if slot_info.model_version == "v2":
                if slot_info.enable_faster:
                    pipeline: GPTSoVITSFasterPipeline | GPTSoVITSPipeline = GPTSoVITSFasterPipeline(slot_info)
                else:
                    pipeline = GPTSoVITSPipeline(slot_info)
            if slot_info.model_version == "v3":
                pipeline = GPTSoVITSV3Pipeline(slot_info)
            if slot_info.model_version == "v4":
                pipeline = GPTSoVITSV4Pipeline(slot_info)
            return pipeline
        else:
            raise RuntimeError(f"Unknown tts type:{slot_info.tts_type}")
