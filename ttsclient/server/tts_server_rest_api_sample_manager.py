from fastapi import APIRouter
from ttsclient.const import UPLOAD_DIR
from ttsclient.server.validation_error_logging_route import ValidationErrorLoggingRoute
from ttsclient.tts.data_types.sample_manager_data_types import SampleDownloadParam
from ttsclient.tts.sample_manager.sample_manager import SampleManager


class RestAPISampleManager:
    def __init__(self):
        self.router = APIRouter()
        self.router.route_class = ValidationErrorLoggingRoute
        self.router.add_api_route("/api/sample-manager/samples", self.get_samples, methods=["GET"])
        self.router.add_api_route("/api/sample-manager/samples/operation/download", self.post_download, methods=["POST"])

        self.router.add_api_route("/api_sample-manager_samples", self.get_samples, methods=["GET"])
        self.router.add_api_route("/api_sample-manager_samples_operation_download", self.post_download, methods=["POST"])

    def get_samples(self, reload: bool = False):
        sample_manager = SampleManager.get_instance()
        if reload:
            sample_manager.reload()
        return sample_manager.get_samples()

    def post_download(self, param: SampleDownloadParam):
        sample_manager = SampleManager.get_instance()
        sample_manager.download(UPLOAD_DIR, param)
