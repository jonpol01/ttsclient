import { useMemo } from "react";
import React from "react";
import { textInputArea } from "../../styles/textInputArea.css";
import { useTranslation } from "react-i18next";
import { GenerateVoiceParam, GPTSoVITSSlotInfo, GPTSoVITSModelVersion, GetPhonesParam, GetJpTextToUserDictRecordsParam, OpenJTalkUserDictRecord } from "tts-client-typescript-client-lib";
import { useAppState } from "../../002_AppStateProvider";
import { useAppRoot } from "../../001_AppRootProvider";
import { BasicButton } from "../../styles/style-components/buttons/01_basic-button.css"
import { normalButtonThema } from "../../styles/style-components/buttons/thema/button-thema.css";
import { useGuiState } from "../GuiStateProvider";
import { BasicLabel } from "../../styles/style-components/labels/01_basic-label.css";
import { SectionHeader } from "../../styles/style-components/labels/02_section-header.css";
import { TextInputAreaCommon } from "./004-1_TextInputArea_common";
import { TextInputAreaOutputArea } from "./004-2_TextInputArea_output_area";
import { TextInputAreaGPTSettingArea } from "./004-3_TextInputArea_gpt_setting_area";
import { TextInputAreaFasterSetting } from "./004-4_TextInputArea_faster_setting";
import { TextInputAreaDiffusionSettingArea } from "./004-5_TextInputArea_diffusion_setting_area";
export const TextInputArea = () => {
    const { t } = useTranslation();
    const { triggerToast, serverConfigState, generateGetPathFunc } = useAppRoot();
    const { inferenceLanguage, speed, cutMethod, curretVoiceCharacterSlotIndex, currentReferenceVoiceIndexes, setGeneratedVoice, setElapsedTime, sampleSteps, elapsedTime } = useAppState();

    const { setDialog2Name, setDialog2Props } = useGuiState()

    const [useAdvanceInputMode, setUseAdvanceInputMode] = React.useState(false)
    const [jpDictRecords, setJpDictRecords] = React.useState<OpenJTalkUserDictRecord[]>([])

    // カタカナのみかどうかをチェックする関数
    const isKatakanaOnly = (text: string): boolean => {
        // カタカナの Unicode 範囲: \u30A0-\u30FF
        // 長音記号 (ー): \u30FC
        // 空白も許可
        // アポストロフィも許可
        const katakanaRegex = /^[\u30A0-\u30FF\u30FC\s\’]+$/;
        return katakanaRegex.test(text);
    }

    const area = useMemo(() => {
        if (!serverConfigState.serverConfiguration) return
        if (!serverConfigState.serverSlotInfos) return
        const slotIndex = serverConfigState.serverConfiguration.current_slot_index
        const slotInfo = serverConfigState.serverSlotInfos[slotIndex]
        if (!slotInfo) return

        let gptSovitsModelVersion: GPTSoVITSModelVersion | null = null
        if (slotInfo.tts_type == "GPT-SoVITS") {
            const gptSovitsSlotInfo = slotInfo as GPTSoVITSSlotInfo
            gptSovitsModelVersion = gptSovitsSlotInfo.model_version
        }

        const runClicked = async () => {
            const text = (document.getElementById("text-input-area-textarea") as HTMLTextAreaElement).value;

            if (curretVoiceCharacterSlotIndex == null) {
                return
            }
            const voices = currentReferenceVoiceIndexes[curretVoiceCharacterSlotIndex]
            if (!voices || voices.length != 1) {
                triggerToast("error", `multi voice not implemented: ${voices}, ${voices.length}`)
                return
            }
            const voice = voices[0]


            const start = performance.now();
            const param: GenerateVoiceParam = {
                voice_character_slot_index: curretVoiceCharacterSlotIndex,
                reference_voice_slot_index: voice,
                text: text,
                language: inferenceLanguage,
                speed: speed,
                cutMethod: cutMethod,
                sample_steps: sampleSteps,
                phone_symbols: null,
            }

            console.log("gptSovitsModelVersion", gptSovitsModelVersion, useAdvanceInputMode)
            if ((gptSovitsModelVersion == "v3" || gptSovitsModelVersion == "v2") && useAdvanceInputMode == true) {
                // v2 or v3 かつ advance input modeの場合は、phone_symbolsを設定する。
                const phoneSymbols = (document.getElementById("text-input-area-phonearea") as HTMLTextAreaElement).value;
                param.phone_symbols = JSON.parse(phoneSymbols)
            }


            try {
                const blob = await serverConfigState.generateVoice(param)
                if (blob == null) {
                    // TODO: error handling
                    console.log("blob is null")
                    return
                }
                setGeneratedVoice(blob)

            } catch (e) {
                console.error(e)
                // 1秒スリープ
                triggerToast("error", `error occured during generating voice`)
                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve()
                    }, 1000)
                })
            }
            const end = performance.now();
            const elapsedTime = end - start;
            setElapsedTime(elapsedTime)
        }

        let useAdvanceInputModeButton = <></>
        let getWordsButton = <></>
        let wordsList = <></>
        let getPhoneButton = <></>
        let phonesInputArea = <></>
        if (gptSovitsModelVersion == "v3" || gptSovitsModelVersion == "v2") {

            useAdvanceInputModeButton = (
                <button onClick={async () => {
                    setUseAdvanceInputMode(!useAdvanceInputMode)
                }} className={`${BasicButton({ active: useAdvanceInputMode, height: "short" })} ${normalButtonThema}`}>advanced</button>
            )
            if (useAdvanceInputMode) {
                const iconUrl = generateGetPathFunc("/assets/icons/chevrons-down.svg");
                if (inferenceLanguage == "ja" || inferenceLanguage == "all_ja") {
                    getWordsButton = (
                        <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>

                            <button onClick={
                                async () => {
                                    if (curretVoiceCharacterSlotIndex == null) {
                                        return
                                    }
                                    const text = (document.getElementById("text-input-area-textarea") as HTMLTextAreaElement).value;
                                    const param_dict: GetJpTextToUserDictRecordsParam = {
                                        text: text,
                                        voice_character_slot_index: curretVoiceCharacterSlotIndex,
                                    }
                                    try {
                                        const records = await serverConfigState.getJpTextToUserDictRecords(param_dict)
                                        console.log(records)
                                        if (records == null) {
                                            return
                                        }
                                        // Store the received dictionary records in state
                                        setJpDictRecords(records)
                                    } catch (e) {
                                        console.error(e)
                                        // 1秒スリープ
                                        triggerToast("error", `error occured during generating voice`)
                                    }
                                }} className={`${BasicButton({})} ${normalButtonThema}`}
                            >

                                <img src={iconUrl} alt="get phones" />
                            </button>
                        </div>
                    )

                    wordsList = (
                        <>
                            <div className={BasicLabel({ width: "max" })}>{t("text_input_area_word_list_label")}</div>
                            <div style={{ width: "100%", maxHeight: "5rem", overflowY: "auto", overflowX: "hidden" }}>
                                <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ccc", fontSize: "0.7rem" }}>
                                    <thead>
                                        <tr>
                                            <th style={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}>{t("text_input_area_word_list_column_string")}</th>
                                            <th style={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}>{t("text_input_area_word_list_column_pronunciation")}</th>
                                            <th style={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}>{t("text_input_area_word_list_column_accent")}</th>
                                            <th style={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}>{t("text_input_area_word_list_column_mora_count")}</th>
                                            <th style={{ border: "1px solid #ccc", backgroundColor: "#f0f0f0" }}>{t("text_input_area_word_list_column_save")}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {jpDictRecords.map((record, index) => (
                                            <tr key={index}>
                                                <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                                                    <div style={{ padding: "2px" }}>{record.string || ""}</div>
                                                </td>
                                                <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                                                    <input
                                                        type="text"
                                                        value={record.pron || ""}
                                                        style={{
                                                            width: "100%",
                                                            border: isKatakanaOnly(record.pron || "") ? "none" : "1px solid red",
                                                            padding: "2px",
                                                            fontSize: "0.7rem",
                                                            // カタカナ以外の文字が使われていたら赤くする
                                                            color: isKatakanaOnly(record.pron || "") ? "inherit" : "red",
                                                            backgroundColor: isKatakanaOnly(record.pron || "") ? "inherit" : "rgba(255, 0, 0, 0.05)"
                                                        }}
                                                        title={isKatakanaOnly(record.pron || "") ? "" : "カタカナのみを入力してください"}
                                                        onChange={(e) => {
                                                            const newValue = e.target.value;
                                                            const newRecords = [...jpDictRecords];
                                                            newRecords[index] = { ...newRecords[index], pron: newValue };
                                                            setJpDictRecords(newRecords);

                                                            // // 入力時に非カタカナ文字が含まれていたら警告を表示
                                                            // if (newValue && !isKatakanaOnly(newValue)) {
                                                            //     triggerToast("warning", `"${record.string}" の発音にカタカナ以外の文字が含まれています`);
                                                            // }
                                                        }}
                                                    />
                                                </td>
                                                <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                                                    <input
                                                        type="number"
                                                        min={0}
                                                        max={record.mora_size > 0 ? record.mora_size + 1 : 0}
                                                        value={record.acc || 0}
                                                        style={{ width: "100%", border: "none", padding: "2px", fontSize: "0.7rem" }}
                                                        onChange={(e) => {
                                                            const value = parseInt(e.target.value) || 0;
                                                            const maxAccent = record.mora_size > 0 ? record.mora_size : 0;
                                                            const validValue = Math.min(Math.max(0, value), maxAccent);

                                                            const newRecords = [...jpDictRecords];
                                                            newRecords[index] = { ...newRecords[index], acc: validValue };
                                                            setJpDictRecords(newRecords);
                                                        }}
                                                    />
                                                </td>
                                                <td style={{ border: "1px solid #ccc", padding: "4px" }}>
                                                    <div style={{ padding: "2px" }}>{record.mora_size || 0}</div>
                                                </td>
                                                <td style={{ border: "1px solid #ccc", padding: "4px", textAlign: "center" }}>
                                                    <button
                                                        onClick={() => {
                                                            if (curretVoiceCharacterSlotIndex == null) {
                                                                return
                                                            }
                                                            // Save this specific word record
                                                            const recordToSave = jpDictRecords[index];
                                                            console.log("Saving record:", recordToSave);

                                                            // カタカナのみかチェック
                                                            if (!isKatakanaOnly(recordToSave.pron || "")) {
                                                                triggerToast("error", t("text_input_area_error_non_katakana", { 0: recordToSave.string }));
                                                                return;
                                                            }

                                                            // 保存処理
                                                            serverConfigState.addUserDictRecord(curretVoiceCharacterSlotIndex, recordToSave);





                                                            // Here you would implement the actual save functionality
                                                            triggerToast("success", t("text_input_area_success_save_settings", { 0: recordToSave.string }));
                                                        }}
                                                        className={`${BasicButton({ height: "short", width: "small" })} ${normalButtonThema}`}
                                                        style={{ fontSize: "0.7rem", padding: "2px 5px" }}
                                                    >
                                                        {t("text_input_area_word_list_save_button")}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {jpDictRecords.length === 0 && (
                                    <div style={{ padding: "10px", textAlign: "center", color: "#666" }}>
                                        {t("text_input_area_dict_records_empty")}
                                    </div>
                                )}
                            </div>

                        </>
                    )
                }

                getPhoneButton = (
                    <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>

                        <button onClick={
                            async () => {
                                if (curretVoiceCharacterSlotIndex == null) {
                                    return
                                }
                                // ウェイトダイアログ表示
                                setDialog2Props({
                                    title: t("wait_dialog_title_generating"),
                                    instruction: `${t("wait_dialog_instruction_generating")}`,
                                    defaultValue: "",
                                    resolve: () => { },
                                    options: null,
                                });
                                setDialog2Name("waitDialog");

                                // 処理
                                const text = (document.getElementById("text-input-area-textarea") as HTMLTextAreaElement).value;
                                // jpDictRecordsの発音にカタカナ以外が含まれていたらエラー
                                for (const record of jpDictRecords) {
                                    if (!isKatakanaOnly(record.pron || "")) {
                                        triggerToast("error", t("text_input_area_error_non_katakana", { 0: record.string }));
                                        // ウェイトダイアログ消去
                                        setDialog2Name("none");
                                        return;
                                    }
                                }

                                const param: GetPhonesParam = {
                                    text: text,
                                    language: inferenceLanguage,
                                    voice_character_slot_index: curretVoiceCharacterSlotIndex,
                                    user_dict_records: jpDictRecords,
                                }
                                try {
                                    const phones = await serverConfigState.getPhones(param)
                                    if (phones == null) {
                                        return
                                    }
                                    const phonesElement = document.getElementById("text-input-area-phonearea") as HTMLTextAreaElement
                                    phonesElement.value = JSON.stringify(phones.phone_symbols)
                                } catch (e) {
                                    console.error(e)
                                    // 1秒スリープ
                                    triggerToast("error", `error occured during generating voice`)
                                }

                                // ウェイトダイアログ消去
                                setDialog2Name("none");
                            }} className={`${BasicButton({})} ${normalButtonThema}`}
                        >

                            <img src={iconUrl} alt="get phones" />
                        </button>
                    </div>
                )
                phonesInputArea = (
                    <>
                        <div className={BasicLabel({ width: "max" })}>{t("text_input_area_phoneme_data_label")}</div>

                        <div>
                            <textarea id="text-input-area-phonearea" rows={5} cols={50} style={{ padding: "5px" }}></textarea>
                        </div>
                    </>
                )
            }
        }
        return (
            <div className={textInputArea}>
                <div className={SectionHeader()}>
                    {t("text_input_area_title")}
                </div>
                <TextInputAreaCommon></TextInputAreaCommon>

                <div style={{ display: "flex", flexDirection: "row", gap: "2rem", width: "100%", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "45%" }}>
                        <div style={{ display: "flex", gap: "15px", alignItems: "flex-end" }}>
                            <div className={BasicLabel({ width: "large5" })}>
                                {t("text_input_area_textarea-label")}
                            </div>
                            {useAdvanceInputModeButton}
                        </div>

                        <div>
                            <textarea id="text-input-area-textarea" rows={5} style={{ width: "100%", padding: "5px" }}></textarea>
                        </div>

                        {getWordsButton}
                        {wordsList}

                        {getPhoneButton}
                        {phonesInputArea}


                        <div style={{ textAlign: "right" }}>
                            <button id="text-input-area-submit-button" onClick={async () => {
                                setDialog2Props({
                                    title: t("wait_dialog_title_generating"),
                                    instruction: `${t("wait_dialog_instruction_generating")}`,
                                    defaultValue: "",
                                    resolve: () => { },
                                    options: null,
                                });
                                setDialog2Name("waitDialog");
                                await runClicked()
                                setDialog2Name("none");
                            }} className={`${BasicButton()} ${normalButtonThema}`}>{t("text_input_area_submit_button")}</button>
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", width: "45%" }}>
                        <div className={BasicLabel({ width: "x-large" })}>{t("text_input_area_model_setting_label")}</div>
                        <TextInputAreaFasterSetting></TextInputAreaFasterSetting>
                        <TextInputAreaGPTSettingArea></TextInputAreaGPTSettingArea>
                        <TextInputAreaDiffusionSettingArea></TextInputAreaDiffusionSettingArea>

                        <div className={BasicLabel({ width: "x-large" })}>{t("text_input_area_generated_voice_label")}[{elapsedTime.toFixed(0)}ms]</div>
                        <TextInputAreaOutputArea></TextInputAreaOutputArea>
                    </div>
                </div>
            </div >
        );
    }, [inferenceLanguage,
        speed,
        cutMethod,
        curretVoiceCharacterSlotIndex,
        currentReferenceVoiceIndexes,
        serverConfigState.serverSlotInfos,
        serverConfigState.serverConfiguration,
        sampleSteps,
        useAdvanceInputMode,
        elapsedTime,
        jpDictRecords
    ]);
    return area;
};
