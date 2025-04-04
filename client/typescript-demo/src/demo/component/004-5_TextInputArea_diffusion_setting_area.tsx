import { useMemo } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { GPTSoVITSSlotInfo, GPTSoVITSModelVersion } from "tts-client-typescript-client-lib";
import { useAppState } from "../../002_AppStateProvider";
import { useAppRoot } from "../../001_AppRootProvider";
export const TextInputAreaDiffusionSettingArea = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();
    const { sampleSteps, setSampleSteps } = useAppState();

    const area = useMemo(() => {
        if (!serverConfigState.serverConfiguration) return;
        if (!serverConfigState.serverSlotInfos) return;
        const slotIndex = serverConfigState.serverConfiguration.current_slot_index;
        const slotInfo = serverConfigState.serverSlotInfos[slotIndex];
        if (!slotInfo) return;

        let gptSovitsModelVersion: GPTSoVITSModelVersion | null = null;
        if (slotInfo.tts_type == "GPT-SoVITS") {
            const gptSovitsSlotInfo = slotInfo as GPTSoVITSSlotInfo;
            gptSovitsModelVersion = gptSovitsSlotInfo.model_version;
        }
        let sampleStepsInput = <></>;
        if (gptSovitsModelVersion == "v3") {
            const sampleStepsOptions = Array(100)
                .fill(0)
                .map((x, i) => {
                    return (
                        <option key={i + 1} value={i + 1}>
                            {i + 1}
                        </option>
                    );
                });

            sampleStepsInput = (
                <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                    <div>{t("text_input_area_sample_steps_label")}</div>
                    <select
                        defaultValue={sampleSteps}
                        id="inference-voice-area-sample-steps-select"
                        onChange={(e) => {
                            setSampleSteps(parseInt(e.target.value));
                        }}
                    >
                        {sampleStepsOptions}
                    </select>
                </div>
            );
        }

        return sampleStepsInput;
    }, [serverConfigState.serverSlotInfos, serverConfigState.serverConfiguration, sampleSteps]);
    return area;
};
