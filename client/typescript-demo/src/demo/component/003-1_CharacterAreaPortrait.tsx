import { useMemo } from "react";
import {
    portraitArea,
    portraitAreaAboutModelAndVoice,
    portraitAreaAboutModelAndVoicePopupLink,
    portraitAreaContainer,
    portraitAreaTermsOfUse,
    portraitContainer,
    portraitContainerButton,
    portraitContainerFocused,
    portraitContainerImagePasteDiv,
} from "../../styles/characterArea.css";
import React from "react";
import { useAppRoot } from "../../001_AppRootProvider";
import { useTranslation } from "react-i18next";
import { VoiceCharacterPortrait } from "./003-1-1_VoiceCharacterPortrait";
import { useAppState } from "../../002_AppStateProvider";
import { useGuiState } from "../GuiStateProvider";
import { normalButtonThema } from "../../styles/style-components/buttons/thema/button-thema.css";
import { BasicButton } from "../../styles/style-components/buttons/01_basic-button.css";

export const CharacterAreaPortrait = () => {
    const { serverConfigState } = useAppRoot();
    const { currentReferenceVoiceIndexes, currentVoiceCharacterSlotIndex, referenceVoiceMode } = useAppState();
    const { setDialogName } = useGuiState();
    const { t } = useTranslation();
    const [isPortraitContainerFocused, setIsPortraitContainerFocused] = React.useState(false);

    const selectedTermOfUseUrlLink = useMemo(() => {
        if (currentVoiceCharacterSlotIndex == null) {
            return <></>;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        if (voiceCharacter == null) {
            return <></>;
        }
        if (voiceCharacter.terms_of_use_url == null) {
            return <></>;
        }

        return (
            <div className={portraitAreaTermsOfUse}>
                <a href={voiceCharacter.terms_of_use_url} target="_blank" rel="noopener noreferrer" className="portrait-area-terms-of-use-link">
                    [{t("character_area_portrait_terms_of_use")}]
                </a>
            </div>
        );
    }, [serverConfigState.voiceCharacterSlotInfos, currentReferenceVoiceIndexes, currentVoiceCharacterSlotIndex]);

    const aboutModelAndVoice = useMemo(() => {
        if (currentVoiceCharacterSlotIndex == null) {
            return <></>;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        if (!voiceCharacter) {
            return <></>;
        }
        if (voiceCharacter.description == null && voiceCharacter.credit == null) {
            return <></>;
        }
        return (
            <div className={portraitAreaAboutModelAndVoice}>
                <div
                    className={portraitAreaAboutModelAndVoicePopupLink}
                    onClick={() => {
                        setDialogName("aboutModelDialog");
                    }}
                >
                    [{t("character_area_portrait_about_model")}]
                </div>
            </div>
        );
    }, [serverConfigState.voiceCharacterSlotInfos, currentReferenceVoiceIndexes, currentVoiceCharacterSlotIndex]);

    const _portraitClicked = () => {
        console.log("portraitClicked");
        if (referenceVoiceMode == "view") {
            return;
        }
        if (currentVoiceCharacterSlotIndex == null) {
            return;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        if (voiceCharacter == null) {
            return;
        }
        const selectedReferenceVoiceIndexes = currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex];
        if (selectedReferenceVoiceIndexes.length != 1) {
            return;
        }

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.style.display = "none";
        document.body.appendChild(fileInput);
        fileInput.click();

        // ファイルが選択されたときの処理
        fileInput.onchange = async () => {
            if (!fileInput.files) {
                return;
            }
            const file = fileInput.files[0];
            if (file) {
                serverConfigState.updateReferenceVoiceIconFile(currentVoiceCharacterSlotIndex, selectedReferenceVoiceIndexes[0], file, () => {});
            }

            // ファイル選択後にinput要素を削除
            document.body.removeChild(fileInput);
        };
    };
    const uplodaFile = (f: File) => {
        if (currentVoiceCharacterSlotIndex == null) {
            return;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        if (voiceCharacter == null) {
            return;
        }
        const selectedReferenceVoiceIndexes = currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex];
        if (selectedReferenceVoiceIndexes.length != 1) {
            return;
        }

        serverConfigState.updateReferenceVoiceIconFile(currentVoiceCharacterSlotIndex, selectedReferenceVoiceIndexes[0], f, () => {});
    };

    const component = useMemo(() => {
        const portraitContainerClass = isPortraitContainerFocused ? portraitContainerFocused : portraitContainer;

        // あまりきれいじゃないので、フォーカスが外れたときにボタンを消す動作はいったんやめる。
        // const showUploadButtonFlag = showUploadButton && referenceVoiceMode == "edit"
        const showUploadButtonFlag = referenceVoiceMode == "edit";
        return (
            <div className={portraitAreaContainer}>
                <div className={portraitArea}>
                    <div className={portraitContainerClass}>
                        <div
                            className={portraitContainerImagePasteDiv}
                            hidden={referenceVoiceMode == "view"}
                            onClick={() => {
                                // noop
                            }}
                            onFocus={() => {
                                setIsPortraitContainerFocused(true);
                            }}
                            onBlur={() => {
                                setIsPortraitContainerFocused(false);
                            }}
                            onPaste={(e) => {
                                e.currentTarget.innerHTML = "";
                                e.preventDefault();
                                const items = e.clipboardData.items;
                                for (let i = 0; i < items.length; i++) {
                                    if (items[i].type.indexOf("image") !== -1) {
                                        const file = items[i].getAsFile();
                                        if (file) {
                                            uplodaFile(file);
                                        }
                                    }
                                }
                            }}
                            onInput={(e) => {
                                e.currentTarget.innerHTML = "";
                                e.preventDefault();
                                console.log("itemsinput");
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                            }}
                            onDragEnter={(e) => {
                                e.preventDefault();
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.currentTarget.innerHTML = "";

                                // Handle dropped files
                                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                                    const file = e.dataTransfer.files[0];
                                    if (file.type.indexOf("image") !== -1) {
                                        uplodaFile(file);
                                    }
                                }

                                setIsPortraitContainerFocused(false);
                            }}
                            contentEditable={true}
                        ></div>
                        <VoiceCharacterPortrait></VoiceCharacterPortrait>
                        {selectedTermOfUseUrlLink}
                        {aboutModelAndVoice}
                    </div>
                </div>
                <div className={portraitContainerButton}>
                    <button
                        hidden={!showUploadButtonFlag}
                        onClick={() => {
                            // portraitClicked()
                        }}
                        className={`${BasicButton({ width: "large" })} ${normalButtonThema} `}
                    >
                        {t("character_area_portrait_upload_file_button_label")}
                    </button>
                </div>
            </div>
        );
    }, [selectedTermOfUseUrlLink, aboutModelAndVoice, referenceVoiceMode, isPortraitContainerFocused]);
    return component;
};
