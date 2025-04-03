import logging
import platform
import subprocess
import threading
from typing import Callable

from ttsclient.const import (
    LOGGER_NAME,
    NATIVE_CLIENT_FILE_WIN,
    NATIVE_CLIENT_FILE_MAC,
)


class ClientLauncher:

    def __init__(self, terminate_callback: Callable):
        self.terminate_callback = terminate_callback
        pass

    def launch(self, port: int, https: bool = False):
        threading.Thread(
            target=self._launch_client,
            args=(
                port,
                https,
            ),
        ).start()

    def _launch_client(self, port: int, https: bool = False):
        protocol = "https" if https else "http"
        url = f"{protocol}://localhost:{port}/"
        try:
            client_path = str(NATIVE_CLIENT_FILE_WIN)
            if platform.system() == "Windows":
                client_path = str(NATIVE_CLIENT_FILE_WIN)
            elif platform.system() == "Linux":
                client_path = str(NATIVE_CLIENT_FILE_WIN)
            elif platform.system() == "Darwin":
                client_path = str(NATIVE_CLIENT_FILE_MAC)

            self.process = subprocess.Popen(
                [
                    client_path,
                    "--disable-gpu",
                    "-u",
                    url,
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )
            stdout_thread = threading.Thread(
                target=self.read_output,
                args=(self.process.stdout, logging.getLogger(LOGGER_NAME).warn),
                daemon=True,
            )
            stderr_thread = threading.Thread(
                target=self.read_output,
                args=(self.process.stderr, logging.getLogger(LOGGER_NAME).warn),
                daemon=True,
            )
            stdout_thread.start()
            stderr_thread.start()

            return_code = self.process.wait()
            logging.getLogger(LOGGER_NAME).info(f"native client closed. {return_code}")
            # print(f"native client closed. {return_code}")

            # time.sleep(2)
            self.terminate_callback()

        except Exception as e:
            logging.getLogger(LOGGER_NAME).error(e)

    def stop(self):
        if hasattr(self, "process") and self.process:
            if self.process.poll() is None:
                self.process.terminate()

    def read_output(self, pipe, log_function):
        with pipe:
            for line in iter(pipe.readline, b""):
                log_function(line.decode("utf-8").strip())
