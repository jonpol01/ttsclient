import React, { useMemo } from "react";
import {
    closeButton,
    closeButtonRow,
    dialogFixedSizeContent,
    dialogFrame,
    dialogTitle,
    instructions,
    modelSampleButtonsArea,
    modelSampleDetailArea,
    modelSampleDetailRow,
    modelSampleDetailRowLabel,
    modelSampleDetailRowValue,
    modelSampleDetailRowValueSmall,
    modelSampleIcon,
    sampleSlot,
    sampleSlotButton,
    sampleSlotContainer,
} from "../../../styles/dialog.css";
import { useGuiState } from "../../GuiStateProvider";
import { useTranslation } from "react-i18next";
import { useAppRoot } from "../../../001_AppRootProvider";
import { SampleInfo, VoiceCharacterSampleInfo } from "tts-client-typescript-client-lib";

type CloseButtonRowProps = {
    backClicked: () => void;
};

const CloseButtonRow = (props: CloseButtonRowProps) => {
    const { t } = useTranslation();
    return (
        <div className={closeButtonRow}>
            <div
                className={closeButton}
                onClick={() => {
                    props.backClicked();
                }}
            >
                {t("dialog_back")}
            </div>
        </div>
    );
};

type IconAreaProps = {
    sampleInfo: SampleInfo;
};
const IconArea = (props: IconAreaProps) => {
    let iconUrl: string;
    if (props.sampleInfo.icon_url == null) {
        iconUrl = "/assets/icons/noimage.png";
    } else {
        iconUrl = props.sampleInfo.icon_url;
    }
    const iconDivClass = "";
    const iconClass = modelSampleIcon;
    return (
        <div className={iconDivClass}>
            <img src={iconUrl} className={iconClass} />
        </div>
    );
};

type NameRowProps = {
    sampleInfo: SampleInfo;
};
const NameRow = (props: NameRowProps) => {
    const { t } = useTranslation();

    const nameValueClass = modelSampleDetailRowValue;
    const displayName = props.sampleInfo.name;
    const termOfUseUrlLink =
        props.sampleInfo.terms_of_use_url.length > 0 ? (
            <a href={props.sampleInfo.terms_of_use_url} target="_blank" rel="noopener noreferrer" className={modelSampleDetailRowValueSmall}>
                [{t("dialog_sample_terms_of_use")}]
            </a>
        ) : (
            <></>
        );
    return (
        <div className={modelSampleDetailRow}>
            <div className={modelSampleDetailRowLabel}>{t("dialog_sample_name")}</div>
            <div className={nameValueClass}>{displayName}</div>
            <div className="">{termOfUseUrlLink}</div>
        </div>
    );
};

type InfoRowProps = {
    title: string;
    text: string;
};
const _InfoRow = (props: InfoRowProps) => {
    return (
        <div className={modelSampleDetailRow}>
            <div className={modelSampleDetailRowLabel}>{props.title}</div>
            <div className={modelSampleDetailRowValue}>{props.text}</div>
            <div className=""></div>
        </div>
    );
};

type VoiceCharacterDetailAreaProps = {
    sampleInfo: VoiceCharacterSampleInfo;
};
const VoiceCharacterDetailArea = (props: VoiceCharacterDetailAreaProps) => {
    const sampleInfo = props.sampleInfo;
    return (
        <div className={modelSampleDetailArea}>
            <NameRow sampleInfo={{ ...sampleInfo }}></NameRow>
        </div>
    );
};

type VoiceCharacterSlotManagerSamplesDialogProps = {
    slotIndex: number;
};

export const VoiceCharacterSlotManagerSamplesDialog = (props: VoiceCharacterSlotManagerSamplesDialogProps) => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();
    const { setDialogName } = useGuiState();
    const { setDialog2Name, setDialog2Props, setProgress } = useGuiState();
    const sampleRow = useMemo(() => {
        return serverConfigState.samples
            .map((x, index) => {
                if (x.tts_type != "VoiceCharacter") {
                    return null;
                }
                // モデルの詳細作成
                let sampleDetail = <></>;
                if (x.tts_type == "VoiceCharacter") {
                    sampleDetail = <VoiceCharacterDetailArea sampleInfo={x as VoiceCharacterSampleInfo}></VoiceCharacterDetailArea>;
                }

                // download button
                const downloadButton = (
                    <div
                        className={sampleSlotButton}
                        onClick={async () => {
                            serverConfigState.downloadSample(props.slotIndex, x.id);
                            // プログレスダイアログ
                            setDialog2Props({
                                title: t("dialog_sample_downloading_dialog_title"),
                                instruction: t("dialog_sample_downloading_dialog_instruction"),
                                defaultValue: "",
                                resolve: () => {},
                                options: null,
                            });
                            setDialog2Name("progressDialog");

                            const checkDownload = async (num: number) => {
                                while (num < 60) {
                                    const slotInfo = await serverConfigState.getVoiceCharacterSlotInfo(props.slotIndex);
                                    if (slotInfo?.tts_type == null) {
                                        // reserve前。noop
                                    } else if (slotInfo?.tts_type == "RESERVED_FOR_SAMPLE") {
                                        setProgress(slotInfo.progress);
                                    } else {
                                        setProgress(1);
                                        // 終了アクションを待つ
                                        await new Promise((resolve) => setTimeout(resolve, 1000 * 1.0));
                                        break;
                                    }
                                    await new Promise((resolve) => setTimeout(resolve, 1000 * 0.5));
                                    num++;
                                }
                            };
                            await checkDownload(0);
                            setDialog2Name("none");
                            setDialogName("voiceCharacterManagerMainDialog");
                            setProgress(0);
                        }}
                    >
                        {t("dialog_sample_download_button")}
                    </div>
                );

                // スロット作成
                return (
                    <div key={index} className={sampleSlot}>
                        <IconArea sampleInfo={x}></IconArea>
                        {sampleDetail}
                        <div className={modelSampleButtonsArea}>{downloadButton}</div>
                    </div>
                );
            })
            .filter((x) => x != null);
    }, [serverConfigState]);

    return (
        <div className={dialogFrame}>
            <div className={dialogTitle}>{t("dialog_sample_title")}</div>
            <div className={instructions}>{t("dialog_sample_instruction")}</div>
            <div className={dialogFixedSizeContent}>
                <div className={sampleSlotContainer}>{sampleRow}</div>
                <CloseButtonRow
                    backClicked={() => {
                        setDialogName("modelSlotManagerMainDialog");
                    }}
                ></CloseButtonRow>
            </div>
        </div>
    );
};
