import { useMemo } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { GPTSoVITSSlotInfo, GPTSoVITSModelVersion } from "tts-client-typescript-client-lib";
import { useAppState } from "../../002_AppStateProvider";
import { useAppRoot } from "../../001_AppRootProvider";
import { BasicInput } from "../../styles/style-components/inputs/01_basic-input.css";
export const TextInputAreaFasterSetting = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();
    const { currentVoiceCharacterSlotIndex, currentReferenceVoiceIndexes } = useAppState();

    const area = useMemo(() => {
        if (!serverConfigState.serverConfiguration) return;
        if (!serverConfigState.serverSlotInfos) return;
        const slotIndex = serverConfigState.serverConfiguration.current_slot_index;
        const slotInfo = serverConfigState.serverSlotInfos[slotIndex];
        if (!slotInfo) return;

        let enableFasterChecked = false;
        let batchSize = 20;
        let gptSovitsModelVersion: GPTSoVITSModelVersion | null = null;
        if (slotInfo.tts_type == "GPT-SoVITS") {
            const gptSovitsSlotInfo = slotInfo as GPTSoVITSSlotInfo;
            enableFasterChecked = gptSovitsSlotInfo.enable_faster;
            batchSize = gptSovitsSlotInfo.batch_size;
            gptSovitsModelVersion = gptSovitsSlotInfo.model_version;
        }

        const useFasterCheckBox = (
            <>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        if (!serverConfigState.serverConfiguration) return;
                        if (!serverConfigState.serverSlotInfos) return;

                        if (slotInfo.tts_type == "GPT-SoVITS") {
                            const gptSoVITSSlotInfo = slotInfo as GPTSoVITSSlotInfo;
                            gptSoVITSSlotInfo.enable_faster = e.target.checked;
                            serverConfigState.updateServerSlotInfo(gptSoVITSSlotInfo);
                        }
                    }}
                    checked={enableFasterChecked}
                />
                <div>{t("text_input_area_enable faster inference_label")}</div>
            </>
        );

        const batchSizeOptions = Array(200)
            .fill(0)
            .map((x, i) => {
                return (
                    <option key={i} value={i + 1}>
                        {i + 1}
                    </option>
                );
            });
        const batchSizeSelector = (
            <select
                value={batchSize}
                id="inference-voice-area-batch-size-select"
                onChange={(e) => {
                    if (!serverConfigState.serverConfiguration) return;
                    if (!serverConfigState.serverSlotInfos) return;

                    if (slotInfo.tts_type == "GPT-SoVITS") {
                        const gptSoVITSSlotInfo = slotInfo as GPTSoVITSSlotInfo;
                        gptSoVITSSlotInfo.batch_size = parseInt(e.target.value);
                        serverConfigState.updateServerSlotInfo(gptSoVITSSlotInfo);
                    }
                }}
                className={BasicInput()}
            >
                {batchSizeOptions}
            </select>
        );

        let fastControl = <></>;
        if (gptSovitsModelVersion == "v2") {
            fastControl = (
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>{useFasterCheckBox}</div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                        <div>{t("text_input_area_batch_size_label")}</div>
                        <div>{batchSizeSelector}</div>
                    </div>
                </div>
            );
        }

        return fastControl;
    }, [currentVoiceCharacterSlotIndex, currentReferenceVoiceIndexes, serverConfigState.serverSlotInfos, serverConfigState.serverConfiguration]);
    return area;
};
