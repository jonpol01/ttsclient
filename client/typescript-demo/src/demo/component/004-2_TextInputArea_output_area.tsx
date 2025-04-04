import { useEffect, useMemo } from "react";
import React from "react";
import { useTranslation } from "react-i18next";

import { useAppState } from "../../002_AppStateProvider";
import { AUDIO_ELEMENT_FOR_PLAY_MONITOR, AUDIO_ELEMENT_FOR_PLAY_RESULT } from "../../const";
import { BasicButton } from "../../styles/style-components/buttons/01_basic-button.css";
import { normalButtonThema } from "../../styles/style-components/buttons/thema/button-thema.css";
import { BasicAudio } from "../../styles/style-components/audios/01_basic-audio.css";
export const TextInputAreaOutputArea = () => {
    const { t } = useTranslation();
    const { audioOutput, audioMonitor, generatedVoice } = useAppState();

    useEffect(() => {
        if (generatedVoice == null) {
            return;
        }

        const url = URL.createObjectURL(generatedVoice);
        const audioElemOutput = document.getElementById(AUDIO_ELEMENT_FOR_PLAY_RESULT) as HTMLAudioElement;
        const audioElemMonitor = document.getElementById(AUDIO_ELEMENT_FOR_PLAY_MONITOR) as HTMLAudioElement;
        audioElemOutput.src = url;
        audioElemMonitor.src = url;
    }, [generatedVoice]);

    useEffect(() => {
        const updateSink = async () => {
            const audioElemOutput = document.getElementById(AUDIO_ELEMENT_FOR_PLAY_RESULT) as HTMLAudioElement;
            if (!audioElemOutput) return;
            if (audioOutput == "none") {
                audioElemOutput.volume = 0;
                return;
            }

            audioElemOutput.volume = 1;
            await audioElemOutput.setSinkId(audioOutput);
            if (!generatedVoice) {
                return;
            }
            const url = URL.createObjectURL(generatedVoice);
            audioElemOutput.src = url;
        };
        updateSink();
    }, [audioOutput]);

    useEffect(() => {
        const updateSink = async () => {
            const audioElemMonitor = document.getElementById(AUDIO_ELEMENT_FOR_PLAY_MONITOR) as HTMLAudioElement;
            if (!audioElemMonitor) return;
            if (audioMonitor == "none") {
                audioElemMonitor.volume = 0;
                return;
            }
            audioElemMonitor.volume = 1;

            await audioElemMonitor.setSinkId(audioMonitor);
            if (!generatedVoice) {
                return;
            }
            const url = URL.createObjectURL(generatedVoice);
            audioElemMonitor.src = url;
        };
        updateSink();
    }, [audioMonitor]);

    const area = useMemo(() => {
        // if (!serverConfigState.serverConfiguration) return
        // if (!serverConfigState.serverSlotInfos) return
        // const slotIndex = serverConfigState.serverConfiguration.current_slot_index
        // const slotInfo = serverConfigState.serverSlotInfos[slotIndex]
        // if (!slotInfo) return

        return (
            <>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "5rem" }}>{t("text_input_area_audio_device_output")}</div>
                    <audio controls id={AUDIO_ELEMENT_FOR_PLAY_RESULT} className={BasicAudio()}></audio>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ width: "5rem" }}>{t("text_input_area_audio_device_monitor")}</div>
                    <audio controls id={AUDIO_ELEMENT_FOR_PLAY_MONITOR} className={BasicAudio()}></audio>
                </div>
                <div>
                    <button
                        className={`${BasicButton()} ${normalButtonThema}`}
                        disabled={!generatedVoice ? true : false}
                        onClick={() => {
                            if (!generatedVoice) {
                                return;
                            }
                            const a = document.createElement("a");
                            const url = URL.createObjectURL(generatedVoice);
                            a.href = url;
                            a.download = "output.wav";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                            URL.revokeObjectURL(url);
                        }}
                    >
                        download
                    </button>
                </div>
            </>
        );
    }, [generatedVoice]);
    return area;
};
