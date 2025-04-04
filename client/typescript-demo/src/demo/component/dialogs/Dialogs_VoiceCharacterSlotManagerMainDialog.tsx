import React, { useMemo } from "react";
import {
    closeButton,
    closeButtonRow,
    dialogFixedSizeContent,
    dialogFrame,
    dialogTitle,
    modelSlot,
    modelSlotButton,
    modelSlotButtonsArea,
    modelSlotContainer,
    modelSlotDetailArea,
    modelSlotDetailRow,
    modelSlotDetailRowLabel,
    modelSlotDetailRowValue,
    modelSlotDetailRowValuePointable,
    modelSlotDetailRowValueSmall,
    modelSlotIcon,
    modelSlotIconContainer,
    modelSlotIconPointable,
} from "../../../styles/dialog.css";
import { useGuiState } from "../../GuiStateProvider";
import { useTranslation } from "react-i18next";
import { useAppRoot } from "../../../001_AppRootProvider";
import { checkExtention } from "../../../util/checkExctension";
import { trimfileName } from "../../../util/trimfileName";
import { tooltip, tooltipText, tooltipTextLower, tooltipTextThin } from "../../../styles";
import { Logger } from "../../../util/logger";
import { fileSelector, MAX_VOICE_CHARACTER_SLOT_INDEX, VoiceCharacter } from "tts-client-typescript-client-lib";
import { VoiceCharacterUploadFile } from "../../../const";

type IconAreaProps = {
    slotIndex: number;
    iconUrl: string | null;
    tooltip: boolean;
    iconEditable: boolean;
};
const IconArea = (props: IconAreaProps) => {
    const { serverConfigState, triggerToast, generateGetPathFunc } = useAppRoot();
    const { t } = useTranslation();
    const iconAction = async () => {
        if (!props.iconEditable) {
            return;
        }

        const file = await fileSelector("");
        if (checkExtention(file.name, ["png", "jpg", "jpeg", "gif"]) == false) {
            triggerToast("error", t("voice_character_slot_manager_main_change_icon_ext_error"));
            return;
        }
        await serverConfigState.uploadVoiceCharacterIconFile(props.slotIndex, file, (_progress: number, _end: boolean) => {});
    };

    let iconUrl: string;
    if (props.iconUrl == null) {
        iconUrl = "/assets/icons/noimage.png";
    } else {
        // iconUrl = "model_dir" + "/" + props.slotIndex + "/" + props.iconUrl.split(/[\/\\]/).pop();
        iconUrl = props.iconUrl || "/assets/icons/noimage.png";
        iconUrl = props.iconUrl != null ? "voice_characters" + "/" + props.slotIndex + "/" + props.iconUrl.split(/[/\\]/).pop() : "./assets/icons/human.png";
    }
    iconUrl = generateGetPathFunc(iconUrl);
    const iconDivClass = props.tooltip ? tooltip : "";
    const iconClass = props.tooltip ? modelSlotIconPointable : modelSlotIcon;
    return (
        <div
            className={`${iconDivClass} ${modelSlotIconContainer}`}
            onDragOver={(e) => {
                e.preventDefault();
                e.currentTarget.style.border = "2px solid #d6b8da";
            }}
            onDragEnter={(e) => {
                e.preventDefault();
                e.currentTarget.style.border = "2px solid #d6b8da";
            }}
            onDragLeave={(e) => {
                e.preventDefault();
                e.currentTarget.style.border = "";
            }}
            onDrop={async (e) => {
                e.preventDefault();
                e.currentTarget.style.border = "";
                // ファイルをアップロード
                const file = e.dataTransfer.files[0];
                if (checkExtention(file.name, ["png", "jpg", "jpeg", "gif"]) == false) {
                    triggerToast("error", t("model_slot_manager_main_change_icon_ext_error"));
                    return;
                }
                if (checkExtention(file.name, ["png", "jpg", "jpeg", "gif"]) == false) {
                    triggerToast("error", t("model_slot_manager_main_change_icon_ext_error"));
                    return;
                }
                await serverConfigState.uploadVoiceCharacterIconFile(props.slotIndex, file, (_progress: number, _end: boolean) => {});
            }}
        >
            <img
                src={iconUrl}
                className={iconClass}
                onClick={() => {
                    iconAction();
                }}
            />
            <div className={`${tooltipText} ${tooltipTextThin} ${tooltipTextLower}`}>{t("voice_character_slot_manager_main_change_icon")}</div>
        </div>
    );
};

type NameRowProps = {
    voiceCharacter: VoiceCharacter;
    // slotIndex: number;
    // name: string;
    // termsOfUseUrl: string;
};
const NameRow = (props: NameRowProps) => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();
    const { setDialog2Name, setDialog2Props } = useGuiState();
    const nameValueAction = async () => {
        if (props.voiceCharacter.tts_type == null) {
            return;
        }
        const p = new Promise<string | null>((resolve) => {
            setDialog2Props({
                title: t("voice_character_slot_name_input_dialog_title"),
                instruction: t("voice_character_slot_name_input_dialog_instruction"),
                defaultValue: props.voiceCharacter.name,
                resolve: resolve,
                options: null,
            });
            setDialog2Name("textInputDialog");
        });
        const newName = await p;
        // Send to Server
        if (!newName) {
            return;
        }
        Logger.getLogger().info("input text:", newName);
        props.voiceCharacter.name = newName;
        await serverConfigState.updateVoiceCharacterSlotInfo(props.voiceCharacter);
    };

    const nameValueClass = props.voiceCharacter.name.length > 0 ? `${modelSlotDetailRowValuePointable} ${tooltip}` : modelSlotDetailRowValue;
    const displayName = props.voiceCharacter.name.length > 0 ? props.voiceCharacter.name : "blank";
    const termOfUseUrlLink =
        props.voiceCharacter.terms_of_use_url.length > 1 ? (
            <a href={props.voiceCharacter.terms_of_use_url} target="_blank" rel="noopener noreferrer" className={modelSlotDetailRowValueSmall}>
                [{t("voice_character_slot_manager_main_terms_of_use")}]
            </a>
        ) : (
            <></>
        );
    return (
        <div className={modelSlotDetailRow}>
            <div className={modelSlotDetailRowLabel}>[{props.voiceCharacter.slot_index}]</div>
            <div
                className={nameValueClass}
                onClick={() => {
                    nameValueAction();
                }}
            >
                {displayName}
                <div className={`${tooltipText} ${tooltipTextThin}`}>{t("voice_character_slot_manager_main_rename")}</div>
            </div>
            <div className="">{termOfUseUrlLink}</div>
        </div>
    );
};

type FileRowProps = {
    title: string;
    slotIndex: number;
    filePath: string;
};

const FileRow = (props: FileRowProps) => {
    const { t } = useTranslation();
    const fileValueAction = (path: string) => {
        if (path.length == 0) {
            return;
        }
        const url = "model_dir" + "/" + props.slotIndex + "/" + path;
        Logger.getLogger().info("downloadpath:", url);

        const link = document.createElement("a");
        link.href = url;
        link.download = path.replace(/^.*[/\\]/, "");
        link.click();
        link.remove();
    };
    const fileValueClass = props.filePath.length > 0 ? `${modelSlotDetailRowValuePointable} ${tooltip}` : modelSlotDetailRowValue;
    return (
        <div key={`${props.title}`} className={modelSlotDetailRow}>
            <div className={modelSlotDetailRowLabel}>{props.title}:</div>
            <div
                className={fileValueClass}
                onClick={() => {
                    if (props.filePath == null) {
                        return;
                    }
                    fileValueAction(props.filePath);
                }}
            >
                {trimfileName(props.filePath ?? "", 20)}
                <div className={`${tooltipText} ${tooltipTextThin}`}>{t("voice_character_slot_manager_main_download")}</div>
            </div>
        </div>
    );
};

type InfoRowProps = {
    info: string;
};
const InfoRow = (props: InfoRowProps) => {
    const { t } = useTranslation();
    return (
        <div className={modelSlotDetailRow}>
            <div className={modelSlotDetailRowLabel}>{t("voice_character_slot_manager_main_info")} </div>
            <div className={modelSlotDetailRowValue}>{props.info}</div>
            <div className=""></div>
        </div>
    );
};

type BlankDetailAreaProps = {
    voiceCharacter: VoiceCharacter;
};
const BlankDetailArea = (props: BlankDetailAreaProps) => {
    const { t } = useTranslation();
    const voiceCharacter = props.voiceCharacter;
    return (
        <div className={modelSlotDetailArea}>
            <NameRow voiceCharacter={{ ...voiceCharacter }}></NameRow>
            <FileRow slotIndex={voiceCharacter.slot_index} title="model" filePath={""}></FileRow>

            <InfoRow info={t("voice_character_slot_manager_main_blank_message")}></InfoRow>
        </div>
    );
};

type GPTSoVITSDetailAreaProps = {
    voiceCharacter: VoiceCharacter;
};
const GPTSoVITSDetailArea = (props: GPTSoVITSDetailAreaProps) => {
    const voiceCharacter = props.voiceCharacter;
    return (
        <div className={modelSlotDetailArea}>
            <NameRow voiceCharacter={{ ...voiceCharacter }}></NameRow>
            <InfoRow info={`voice files: ${voiceCharacter.reference_voices.length}`}></InfoRow>
        </div>
    );
};

type BrokenDetailAreaProps = {
    voiceCharacter: VoiceCharacter;
};
const BrokenDetailArea = (_props: BrokenDetailAreaProps) => {
    const { t } = useTranslation();
    return (
        <div className={modelSlotDetailArea}>
            <InfoRow info={t("voice_character_slot_manager_main_broken_message")}></InfoRow>
        </div>
    );
};

const CloseButtonRow = () => {
    const { setDialogName } = useGuiState();
    const { t } = useTranslation();
    return (
        <div className={closeButtonRow}>
            <div
                className={closeButton}
                onClick={() => {
                    setDialogName("none");
                }}
            >
                {t("dialog_close")}
            </div>
        </div>
    );
};
type VoiceCharacterSlotManagerDialogMainProps = {
    openFileUploadDialog: (targetSlotIndex: number) => void;
    openVoiceCharacterSampleDialog: (targetSlotIndex: number) => void;
};

export const VoiceCharacterSlotManagerMainDialog = (props: VoiceCharacterSlotManagerDialogMainProps) => {
    const { serverConfigState, triggerToast } = useAppRoot();
    const { t } = useTranslation();
    const { setDialog2Props, setDialog2Name } = useGuiState();

    const screen = useMemo(() => {
        if (!serverConfigState.voiceCharacterSlotInfos) {
            return <></>;
        }

        const onNewClicked = async (slotIndex: number) => {
            const p = new Promise<string | null>((resolve) => {
                setDialog2Props({
                    title: t("voice_character_slot_manager_main_new_title"),
                    instruction: t("voice_character_slot_manager_main_new_instruction"),
                    defaultValue: "",
                    resolve: resolve,
                    options: null,
                });
                setDialog2Name("textInputDialog");
            });
            const newName = await p;
            // Send to Server
            if (!newName) {
                return;
            }
            if (!newName || newName.length == 0) {
                triggerToast("error", t("voice_character_slot_manager_main_new_error"));
                return;
            }
            Logger.getLogger().info("New Voice Character:", newName);

            try {
                const files: VoiceCharacterUploadFile[] = []; // newの時はzipファイルは要求しない。
                await serverConfigState.uploadVoiceCharacterFile(slotIndex, "GPT-SoVITS", newName, files, (progress, end) => {
                    Logger.getLogger().info("progress", progress, end);
                });
            } catch (e) {
                triggerToast("error", `upload failed: ${e.detail || ""}`);
                Logger.getLogger().error(`upload failed: ${e.detail || ""}`);
            }
        };
        const onDeleteClicked = async (slotIndex: number) => {
            const p = new Promise<boolean>((resolve) => {
                setDialog2Props({
                    title: t("voice_character_slot_delete_confirm_dialog_title"),
                    instruction: `${t("voice_character_slot_delete_confirm_dialog_instruction")} slotIndex:${slotIndex}`,
                    defaultValue: "",
                    resolve: resolve,
                    options: null,
                });
                setDialog2Name("confirmDialog");
            });
            const res = await p;
            if (res == true) {
                serverConfigState.deleteVoiceCharacterSlotInfo(slotIndex);
            }
        };
        const moveButtonClicked = async (slotIndex: number) => {
            if (!serverConfigState.serverSlotInfos) {
                return;
            }
            const p = new Promise<boolean>((resolve) => {
                if (!serverConfigState.reloadVoiceCharacterSlotInfos) {
                    return;
                }
                const options = serverConfigState.voiceCharacterSlotInfos
                    .filter((x) => x.slot_index < MAX_VOICE_CHARACTER_SLOT_INDEX)
                    .map((x) => {
                        return { label: `${x.slot_index}${x.tts_type == null ? "" : "[used]"}`, value: x.slot_index };
                    });
                setDialog2Props({
                    title: t("voice_character_slot_move_confirm_dialog_title"),
                    instruction: `${t("voice_character_slot_move_confirm_dialog_instruction")}`,
                    defaultValue: "",
                    resolve: resolve,
                    options: options,
                });
                setDialog2Name("selectInputDialog");
            });
            const res = await p;
            if (res != null) {
                const dstSlotIndex = Number(res);
                if (serverConfigState.serverSlotInfos[dstSlotIndex].tts_type != null) {
                    await serverConfigState.deleteVoiceCharacterSlotInfo(dstSlotIndex);
                }
                serverConfigState.moveVoiceCharacter(slotIndex, dstSlotIndex);
            }
        };

        const slotRow = serverConfigState.voiceCharacterSlotInfos
            .filter((x) => x.slot_index < MAX_VOICE_CHARACTER_SLOT_INDEX)
            .map((x, index) => {
                // モデルの詳細作成
                let slotDetail = <></>;
                if (x.tts_type == "GPT-SoVITS" || x.tts_type == "VoiceCharacter") {
                    slotDetail = <GPTSoVITSDetailArea voiceCharacter={x}></GPTSoVITSDetailArea>;
                } else if (x.tts_type == "BROKEN") {
                    slotDetail = <BrokenDetailArea voiceCharacter={x}></BrokenDetailArea>;
                } else {
                    slotDetail = <BlankDetailArea voiceCharacter={x}></BlankDetailArea>;
                }

                // 新規作成
                let newSlotButton = <></>;
                if (x.tts_type == null) {
                    newSlotButton = (
                        <div
                            className={modelSlotButton}
                            onClick={() => {
                                onNewClicked(x.slot_index);
                            }}
                        >
                            {t("voice_character_slot_manager_main_new")}
                        </div>
                    );
                }

                // upload button
                let uploadButton = <></>;
                if (x.tts_type == null) {
                    uploadButton = (
                        <div
                            className={modelSlotButton}
                            onClick={() => {
                                props.openFileUploadDialog(x.slot_index);
                            }}
                        >
                            {t("voice_character_slot_manager_main_upload")}
                        </div>
                    );
                }
                // delete button
                let deleteButton = <></>;
                if (x.tts_type != null) {
                    deleteButton = (
                        <div
                            className={modelSlotButton}
                            onClick={() => {
                                onDeleteClicked(x.slot_index);
                            }}
                        >
                            {t("voice_character_slot_manager_main_delete")}
                        </div>
                    );
                }
                // // edit button
                // let editButton = <></>;
                // if (x.tts_type != null) {
                //     editButton = (
                //         <div
                //             className={modelSlotButton}
                //             onClick={() => {
                //                 // props.openEditor(index);
                //                 triggerToast("error", "Not implemented yet");
                //             }}
                //         >
                //             {t("voice_character_slot_manager_main_edit")}
                //         </div>
                //     );
                // }
                // move button
                let moveButton = <></>;
                if (x.tts_type != null) {
                    moveButton = (
                        <div
                            className={modelSlotButton}
                            onClick={() => {
                                moveButtonClicked(x.slot_index);
                            }}
                        >
                            {t("voice_character_slot_manager_main_move")}
                        </div>
                    );
                }
                // ダウンロードボタン
                let downloadButton = <></>;
                if (x.tts_type != null) {
                    downloadButton = (
                        <div
                            className={modelSlotButton}
                            onClick={async () => {
                                const blob = await serverConfigState.downloadVoiceCharacter(x.slot_index);
                                if (!blob) {
                                    triggerToast("error", t("reference_voice_area_download_error"));
                                    return;
                                }
                                const a = document.createElement("a");
                                const url = URL.createObjectURL(blob);
                                a.href = url;
                                a.download = `voice_character_${x.name}.zip`;
                                document.body.appendChild(a);
                                a.click();
                                document.body.removeChild(a);
                                URL.revokeObjectURL(url);
                            }}
                        >
                            {t("voice_character_slot_manager_main_download")}
                        </div>
                    );
                }
                // sample button
                let sampleButton = <></>;
                if (x.tts_type == null) {
                    sampleButton = (
                        <div
                            className={modelSlotButton}
                            onClick={() => {
                                props.openVoiceCharacterSampleDialog(x.slot_index);
                            }}
                        >
                            {t("voice_character_slot_manager_main_sample")}
                        </div>
                    );
                }

                // スロット作成
                return (
                    <div key={index} className={modelSlot}>
                        <IconArea slotIndex={x.slot_index} iconUrl={x.icon_file} tooltip={x.tts_type != null} iconEditable={x.tts_type != null}></IconArea>
                        {slotDetail}
                        <div className={modelSlotButtonsArea}>
                            {newSlotButton}
                            {uploadButton}
                            {deleteButton}
                            {/* {editButton} */}
                            {moveButton}
                            {downloadButton}
                            {sampleButton}
                        </div>
                    </div>
                );
            });

        return (
            <div className={dialogFrame}>
                <div className={dialogTitle}>{t("voice_character_slot_manager_main_title")}</div>
                <div className={dialogFixedSizeContent}>
                    <div className={modelSlotContainer}>{slotRow}</div>
                    <CloseButtonRow></CloseButtonRow>
                </div>
            </div>
        );
    }, [serverConfigState.voiceCharacterSlotInfos]);

    return screen;
};
