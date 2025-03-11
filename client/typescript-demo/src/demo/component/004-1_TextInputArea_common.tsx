import { useMemo } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { CutMethod, LanguageType } from "tts-client-typescript-client-lib";
import { useAppState } from "../../002_AppStateProvider";
import { useAppRoot } from "../../001_AppRootProvider";
import { BasicInput } from "../../styles/style-components/inputs/01_basic-input.css";
export const TextInputAreaCommon = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();
    const { inferenceLanguage, setInferenceLanguage, speed, setSpeed, cutMethod, setCutMethod } = useAppState();


    const area = useMemo(() => {
        if (!serverConfigState.serverConfiguration) return
        if (!serverConfigState.serverSlotInfos) return
        const slotIndex = serverConfigState.serverConfiguration.current_slot_index
        const slotInfo = serverConfigState.serverSlotInfos[slotIndex]
        if (!slotInfo) return

        const languageSelect = (
            <select
                value={inferenceLanguage}
                id="inference-voice-area-language-select"
                onChange={(e) => {
                    setInferenceLanguage(e.target.value as LanguageType);
                }}
                className={BasicInput()}
            >
                {LanguageType.map((x, _index) => {
                    return (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    )
                })}
            </select>
        )
        const speedInput = (
            <input
                type="number"
                id="inference-voice-area-speed-input"
                value={speed}
                step="0.05"
                min="0.6"
                max="1.65"
                onChange={(e) => {
                    setSpeed(parseFloat(e.target.value));
                }}
                className={BasicInput()}
            />
        )
        const cutMethodSelect = (
            <select
                value={cutMethod}
                id="inference-voice-area-cut-method-select"
                onChange={(e) => {
                    setCutMethod(e.target.value as CutMethod);
                }}
                className={BasicInput()}
            >
                {CutMethod.map((x, _index) => {
                    return (
                        <option key={x} value={x}>
                            {x}
                        </option>
                    )
                })}
            </select>
        )

        return (
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                    <div>{t("text_input_area_language_label")}</div>
                    <div>
                        {languageSelect}
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                    <div>{t("text_input_area_speed_label")}</div>
                    <div>
                        {speedInput}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                    <div>{t("text_input_area_cut_method_label")}</div>
                    <div>
                        {cutMethodSelect}
                    </div>
                </div>
            </div>

        );
    }, [
        inferenceLanguage,
        speed,
        cutMethod,
    ]);
    return area;
};
