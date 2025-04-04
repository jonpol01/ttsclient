import React, { useMemo } from "react";
import { closeButton, closeButtonRow, dialogFrame, dialogTitle, instructions } from "../../../styles/dialog.css";
import { useGuiState } from "../../GuiStateProvider";
import { useTranslation } from "react-i18next";
import { useAppRoot } from "../../../001_AppRootProvider";
import { useAppState } from "../../../002_AppStateProvider";
import { EmotionType, VoiceCharacter } from "tts-client-typescript-client-lib";
import { colorButton } from "../../../styles/style-components/buttons/02_emotion-button.css";
import { getContrastColor } from "../../../util/getContrastColor";

type CloseButtonRowProps = {
    onClose: () => void;
};

const CloseButtonRow = (props: CloseButtonRowProps) => {
    const { t } = useTranslation();

    return (
        <div className={closeButtonRow}>
            <div className={closeButton} onClick={props.onClose}>
                {t("dialog_close")}
            </div>
        </div>
    );
};

type EmotionColorRowProps = {
    emotion: EmotionType;
    index: number;
    voiceCharacter: VoiceCharacter;
};

const EmotionColorRow = ({ emotion, index: _index, voiceCharacter }: EmotionColorRowProps) => {
    const { t } = useTranslation();
    const { setDialog2Name, setDialog2Props } = useGuiState();
    const { serverConfigState } = useAppRoot();
    const color = emotion.color === "auto" ? "#ffffff" : emotion.color;
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "8px 0", width: "100%", height: "100%" }}>
            <div style={{ width: "120px", marginRight: "10px" }}>{emotion.name}</div>
            <div
                className={colorButton}
                style={{ backgroundColor: color, color: getContrastColor(color) }}
                onClick={async () => {
                    const p = new Promise<string | null>((resolve) => {
                        setDialog2Props({
                            title: t("emotion_color_dialog_title"),
                            instruction: t("emotion_color_select_color_instruction", { 0: emotion.name }),
                            defaultValue: color,
                            resolve: resolve,
                            options: null,
                        });
                        setDialog2Name("colorSelectDialog");
                    });
                    const newColor = await p;
                    if (!newColor) {
                        return;
                    }
                    // voiceCharacter.emotion_typesをupdate
                    const existEmotionColor = voiceCharacter.emotion_types.find((x) => {
                        return x.name === emotion.name;
                    });
                    if (!existEmotionColor) {
                        voiceCharacter.emotion_types.push({
                            name: emotion.name,
                            color: newColor,
                        });
                    } else {
                        existEmotionColor.color = newColor;
                    }
                    await serverConfigState.updateVoiceCharacterSlotInfo(voiceCharacter);
                }}
            >
                {color}
            </div>
        </div>
    );
};

type EmotionColorDialogProps = {};

export const EmotionColorDialog = (_props: EmotionColorDialogProps) => {
    const { serverConfigState } = useAppRoot();
    const { setDialogName } = useGuiState();
    const { t } = useTranslation();
    const { currentVoiceCharacterSlotIndex } = useAppState();
    const { setDialog2Name, setDialog2Props } = useGuiState();

    const handleClose = () => {
        setDialogName("none");
    };

    const emotionColorMap = useMemo(() => {
        if (currentVoiceCharacterSlotIndex == null) {
            return;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        const list: EmotionType[] = [];
        // listにemotion_typesを追加
        for (const emotion of voiceCharacter.emotion_types) {
            list.push(emotion);
        }
        // reference_voicesに含まれるemotion_typesを追加
        for (const referenceVoice of voiceCharacter.reference_voices) {
            referenceVoice.voice_type;
            if (!list.find((x) => x.name === referenceVoice.voice_type)) {
                list.push({
                    name: referenceVoice.voice_type,
                    color: "auto",
                });
            }
        }
        return list;
    }, [serverConfigState.voiceCharacterSlotInfos, currentVoiceCharacterSlotIndex]);

    const emotionColorMapEditorArea = useMemo(() => {
        if (!emotionColorMap) {
            return <></>;
        }
        if (currentVoiceCharacterSlotIndex == null) {
            return;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];

        return (
            <div style={{ maxHeight: "300px", overflowY: "auto", width: "100%" }}>
                {emotionColorMap.map((emotion, index) => (
                    <EmotionColorRow key={emotion.name} emotion={emotion} index={index} voiceCharacter={voiceCharacter} />
                ))}
            </div>
        );
    }, [emotionColorMap]);

    const newEmotionArea = useMemo(() => {
        // 新しい感情を追加するエリア
        // ボタンを押すと、TextInputDialogを開いて、感情の入力を受け取り、#ffffffを初期値としてサーバに登録
        if (currentVoiceCharacterSlotIndex == null) {
            return;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "8px 0", width: "100%", height: "100%" }}>
                <div
                    className={colorButton}
                    style={{ backgroundColor: "#ffffff", color: getContrastColor("#ffffff") }}
                    onClick={async () => {
                        const p = new Promise<string | null>((resolve) => {
                            setDialog2Props({
                                title: t("emotion_color_new_emotion_title"),
                                instruction: t("emotion_color_new_emotion_instruction"),
                                defaultValue: "",
                                resolve: resolve,
                                options: null,
                            });
                            setDialog2Name("textInputDialog");
                        });
                        const newEmotion = await p;
                        if (!newEmotion) {
                            return;
                        }
                        // voiceCharacter.emotion_typesをupdate
                        voiceCharacter.emotion_types.push({
                            name: newEmotion,
                            color: "#ffffff",
                        });
                        await serverConfigState.updateVoiceCharacterSlotInfo(voiceCharacter);
                    }}
                >
                    {t("emotion_color_new_emotion_button")}
                </div>
            </div>
        );
    }, []);

    return (
        <div className={dialogFrame}>
            <div className={dialogTitle}>{t("emotion_color_dialog_title")}</div>
            <div className={instructions}>{t("emotion_color_dialog_instruction")}</div>

            {emotionColorMapEditorArea}
            {newEmotionArea}

            <CloseButtonRow onClose={handleClose}></CloseButtonRow>
        </div>
    );
};
