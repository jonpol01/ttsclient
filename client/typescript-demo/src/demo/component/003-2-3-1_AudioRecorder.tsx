import { useEffect, useMemo, useRef, useState } from "react";
import { characterAreaControl, characterAreaControlField, characterAreaControlFieldColumn, characterAreaControlText } from "../../styles/characterArea.css";
import React from "react";
import { useAppRoot } from "../../001_AppRootProvider";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../002_AppStateProvider";
import { BasicButton } from "../../styles/style-components/buttons/01_basic-button.css";
import { normalButtonThema } from "../../styles/style-components/buttons/thema/button-thema.css";
import { BasicLabel } from "../../styles/style-components/labels/01_basic-label.css";
import { useGuiState } from "../GuiStateProvider";
import { generateAudioBlob } from "@dannadori/audio-recorder-js";
import { isDesktopApp } from "../../util/isDesctopApp";

export const AudioRecorder = () => {
    const { audioConfigState, serverConfigState, triggerToast } = useAppRoot();
    const { t } = useTranslation();
    const [audioInput, setAudioInput] = useState<string>("default")
    const [audioInputMediaStream, setAudioInputMediaStream] = useState<MediaStream | null>(null)
    const inputRecordingBuffer = useRef<Float32Array[]>([])
    const { currentReferenceVoiceIndexes, curretVoiceCharacterSlotIndex, audioRecorderState, audioOutput } = useAppState();


    useEffect(() => {
        const updateSink = async () => {
            const audioElemOutput = document.getElementById("input-record-audio") as HTMLAudioElement
            if (!audioElemOutput) return
            if (audioOutput == "none") {
                audioElemOutput.volume = 0
                return
            }

            audioElemOutput.volume = 1
            await audioElemOutput.setSinkId(audioOutput)
        }
        updateSink()
    }, [audioOutput])

    const onUploadClicked = () => {
        if (curretVoiceCharacterSlotIndex == null) {
            return <></>;
        }

        // ファイルオブジェクト生成
        const dataSize = inputRecordingBuffer.current.reduce((prev, cur) => {
            return prev + cur.length;
        }, 0);
        if (dataSize < 48000 * 3 || dataSize > 48000 * 10) {
            console.warn("file size is invalid", dataSize)
            triggerToast("error", t("reference_voice_area_invalid_audio_length"))
            return

        }
        const samples = new Float32Array(dataSize);
        let sampleIndex = 0;
        for (let i = 0; i < inputRecordingBuffer.current.length; i++) {
            for (let j = 0; j < inputRecordingBuffer.current[i].length; j++) {
                samples[sampleIndex] = inputRecordingBuffer.current[i][j];
                sampleIndex++;
            }
        }

        const b = generateAudioBlob(samples)
        const file = new File([b], "audio.wav", { type: b.type });

        // ファイルオブジェクトをサーバーにアップロード
        const voiceIndex = currentReferenceVoiceIndexes[curretVoiceCharacterSlotIndex]
        if (!voiceIndex || voiceIndex.length != 1) {
            console.warn("voiceIndex is invalid", voiceIndex)
            return
        }
        serverConfigState.addReferenceVoice(curretVoiceCharacterSlotIndex, voiceIndex[0], "misc", file, (progress: number, end: boolean) => {
            console.log("progress", progress, end)
        })
    }

    const audioInputSelector = useMemo(() => {
        return (
            <select
                style={{ width: "100%" }}
                value={audioInput}
                onChange={(e) => {
                    setAudioInput(e.target.value)
                }}
            >
                {audioConfigState.audioInputs.map((input) => {
                    return (
                        <option key={input.deviceId} value={input.deviceId}>
                            {input.label}
                        </option>
                    )
                })}
            </select>
        )
    }, [audioConfigState.audioInputs, audioInput])

    useEffect(() => {
        if (!audioRecorderState.audioRecorderInitialized) {
            return
        }
        audioRecorderState.setAudioDataCallback({
            processAudio: null,
            onAudioReceived: async (data: Float32Array) => {
                inputRecordingBuffer.current.push(data)
            }
        })

    }, [audioRecorderState.audioRecorderInitialized])


    const closeMediaStream = () => {
        if (audioInputMediaStream) {
            audioInputMediaStream.getTracks().forEach((x) => {
                x.stop();
            });
        }
    }
    useEffect(() => {
        if (audioInput == "screen") {
            closeMediaStream()
        } else {
            closeMediaStream()
            audioRecorderState.setAudioInput(audioInput)
        }
    }, [audioInput])



    const onStartClicked = async () => {
        inputRecordingBuffer.current = []
        if (audioInput == "screen") {
            closeMediaStream()
            const captureStart = async () => {
                let displayMediaStream: MediaStream | null = null;
                // 共有スタート
                try {
                    if (isDesktopApp()) {
                        const constraints = {
                            audio: {
                                mandatory: {
                                    chromeMediaSource: "desktop",
                                },
                            },
                            video: {
                                mandatory: {
                                    chromeMediaSource: "desktop",
                                },
                            },
                        };
                        // @ts-ignore
                        displayMediaStream = await navigator.mediaDevices.getUserMedia(constraints);
                    } else {
                        displayMediaStream = await navigator.mediaDevices.getDisplayMedia({
                            video: true,
                            audio: true,
                        });
                    }
                } catch (e) {
                    console.error("Capture failed.", e);
                    return;
                }
                if (!displayMediaStream) {
                    console.error("Capture failed, no media stream.");
                    return;
                }
                if (displayMediaStream.getAudioTracks().length == 0) {
                    displayMediaStream.getTracks().forEach((x) => {
                        x.stop();
                    });
                    displayMediaStream = null;
                    console.error("Capture failed, no audio track.");
                    return;
                }
                audioRecorderState.setAudioInput(displayMediaStream)
                setAudioInputMediaStream(displayMediaStream)
                audioRecorderState.audioRecorderStart()
            }
            captureStart()
        } else {
            audioRecorderState.audioRecorderStart()
        }
    }

    const onStopClicked = async () => {
        audioRecorderState.audioRecorderStop()
        const p = new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve()
            }, 1000)
        })
        await p
        closeMediaStream()

        const dataSize = inputRecordingBuffer.current.reduce((prev, cur) => {
            return prev + cur.length;
        }, 0);
        const samples = new Float32Array(dataSize);
        let sampleIndex = 0;
        for (let i = 0; i < inputRecordingBuffer.current.length; i++) {
            for (let j = 0; j < inputRecordingBuffer.current[i].length; j++) {
                samples[sampleIndex] = inputRecordingBuffer.current[i][j];
                sampleIndex++;
            }
        }

        const audio = document.getElementById("input-record-audio") as HTMLAudioElement
        const b = generateAudioBlob(samples)
        audio.src = URL.createObjectURL(b)
    }

    const component = useMemo(() => {
        return (
            <>
                <div className={characterAreaControl}>
                    <div className={characterAreaControlText}>
                        {t("reference_voice_area_capture_instruction")}

                    </div>
                </div>
                <div className={characterAreaControl}>
                    <div className={BasicLabel({ width: "large3" })}>{t("reference_voice_area_capture")}:</div>
                    <div className={characterAreaControlFieldColumn}>
                        {audioInputSelector}
                        <div>
                            <button
                                onClick={() => {
                                    onStartClicked()
                                }}
                                className={`${BasicButton({ active: audioRecorderState.audioRecorderStarted })} ${normalButtonThema}`}
                                disabled={audioRecorderState.audioRecorderStarted}
                            >{t("reference_voice_area_capture_start")}</button>
                            <button
                                onClick={() => {
                                    onStopClicked()
                                }}
                                className={`${BasicButton({ active: !audioRecorderState.audioRecorderStarted })} ${normalButtonThema}`}
                                disabled={!audioRecorderState.audioRecorderStarted}
                            >{t("reference_voice_area_capture_stop")}</button>

                        </div>
                        <div>
                            <audio id="input-record-audio" controls style={{ height: "1rem" }}></audio>
                        </div>
                        <div>
                            <button onClick={() => {
                                onUploadClicked()
                            }}>{t("reference_voice_area_upload_button_label")}</button>
                        </div>

                    </div>
                </div>
            </>
        );
    }, [
        audioInputSelector,
        audioRecorderState.audioRecorderStarted
    ]);

    return component
};
