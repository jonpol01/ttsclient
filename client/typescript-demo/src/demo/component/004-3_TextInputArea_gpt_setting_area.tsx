import { useMemo } from "react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useAppRoot } from "../../001_AppRootProvider";
import { BasicInput } from "../../styles/style-components/inputs/01_basic-input.css";
import { GPTSoVITSSlotInfo } from "tts-client-typescript-client-lib";
export const TextInputAreaGPTSettingArea = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();


    const area = useMemo(() => {

        if (!serverConfigState.serverConfiguration) return
        if (!serverConfigState.serverSlotInfos) return
        const slotIndex = serverConfigState.serverConfiguration.current_slot_index
        const slotInfo = serverConfigState.serverSlotInfos[slotIndex]
        if (!slotInfo) return

        let topK = 15 //dummy
        let topP = 1.0 //dummy
        let temperature = 1.0 //dummy
        if (slotInfo.tts_type == "GPT-SoVITS") {
            const gptSovitsSlotInfo = slotInfo as GPTSoVITSSlotInfo
            topK = gptSovitsSlotInfo.top_k
            topP = gptSovitsSlotInfo.top_p
            temperature = gptSovitsSlotInfo.temperature
        }


        const topKOptions = Array(100).fill(0).map((x, i) => { return (<option key={i} value={i + 1}>{i + 1}</option>) })
        const topKSelect = (
            <select
                value={topK}
                id="inference-voice-area-top-k-select"
                onChange={(e) => {
                    if (!serverConfigState.serverConfiguration) return
                    if (!serverConfigState.serverSlotInfos) return


                    if (slotInfo.tts_type == "GPT-SoVITS") {
                        const gptSoVITSSlotInfo = slotInfo as GPTSoVITSSlotInfo
                        gptSoVITSSlotInfo.top_k = parseInt(e.target.value)
                        serverConfigState.updateServerSlotInfo(gptSoVITSSlotInfo)
                    }
                }}
                className={BasicInput()}
            >
                {topKOptions}
            </select >
        )
        const topPOptions = Array(100).fill(0).map((x, i) => { return (<option key={i} value={(i + 1) / 100}>{(i + 1) / 100}</option>) })
        const topPSelect = (
            <select
                value={topP}
                id="inference-voice-area-top-p-select"
                onChange={(e) => {
                    if (!serverConfigState.serverConfiguration) return
                    if (!serverConfigState.serverSlotInfos) return


                    if (slotInfo.tts_type == "GPT-SoVITS") {
                        const gptSoVITSSlotInfo = slotInfo as GPTSoVITSSlotInfo
                        gptSoVITSSlotInfo.top_p = parseFloat(e.target.value)
                        serverConfigState.updateServerSlotInfo(gptSoVITSSlotInfo)
                    }
                }}
                className={BasicInput()}
            >
                {topPOptions}
            </select >
        )
        const temperatureOptions = Array(100).fill(0).map((x, i) => { return (<option key={i} value={(i + 1) / 100}>{(i + 1) / 100}</option>) })
        const temperatureSelect = (
            <select
                value={temperature}
                id="inference-voice-area-temperature-select"
                onChange={(e) => {
                    if (!serverConfigState.serverConfiguration) return
                    if (!serverConfigState.serverSlotInfos) return

                    if (slotInfo.tts_type == "GPT-SoVITS") {
                        const gptSoVITSSlotInfo = slotInfo as GPTSoVITSSlotInfo
                        gptSoVITSSlotInfo.temperature = parseFloat(e.target.value)
                        serverConfigState.updateServerSlotInfo(gptSoVITSSlotInfo)
                    }
                }}
            >
                {temperatureOptions}
            </select >
        )

        return (
            <>
                <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                        <div>{t("text_input_area_top_k_label")}</div>
                        <div>
                            {topKSelect}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                        <div>{t("text_input_area_top_p_label")}</div>
                        <div>
                            {topPSelect}
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", gap: "0.3rem" }}>
                        <div>{t("text_input_area_temperature_label")}</div>
                        <div>
                            {temperatureSelect}
                        </div>
                    </div>
                </div>
            </>

        );
    }, [
        serverConfigState.serverConfiguration,
        serverConfigState.serverSlotInfos
    ]);
    return area;
};
