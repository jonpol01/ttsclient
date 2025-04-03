import React, { useMemo } from "react";
import {
    closeButton,
    closeButtonRow,
    dialogFixedSizeContent,
    dialogFrame,
    dialogItemName20,
    dialogItemRow,
    dialogItemValue,
    dialogItemValueSlider,
    dialogItemValueSliderContainer,
    dialogItemValueSliderVal,
    dialogTitle,
    execButton,
    instructions,
} from "../../../styles/dialog.css";
import { useGuiState } from "../../GuiStateProvider";
import { useTranslation } from "react-i18next";
import { useAppRoot } from "../../../001_AppRootProvider";
import { useAppState } from "../../../002_AppStateProvider";
import { Protocol, Protocols, VolumeTuningType, VolumeTuningTypes } from "vcclient-typescript-client-lib";
import { TranscriberComputeType, TranscriberDevice, TranscriberModelSize } from "tts-client-typescript-client-lib";

type CloseButtonRowProps = {
    closeClicked: () => void;
};

const CloseButtonRow = (props: CloseButtonRowProps) => {
    const { t } = useTranslation();
    return (
        <div className={closeButtonRow}>
            <div
                className={closeButton}
                onClick={() => {
                    props.closeClicked();
                }}
            >
                {t("dialog_advanced_setting_button_close")}
            </div>
        </div>
    );
};

// const ProtocolSelect = () => {
//     const { t } = useTranslation();
//     const { voiceChangerClientState } = useAppState();
//     const component = useMemo(() => {
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_protocol")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={voiceChangerClientState.protocol}
//                         onChange={(e) => {
//                             voiceChangerClientState.setProtocol(e.target.value as Protocol);
//                         }}
//                     >
//                         {Protocols.map((v) => {
//                             return (
//                                 <option key={v} value={v}>
//                                     {v}
//                                 </option>
//                             );
//                         })}
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [voiceChangerClientState.protocol]);
//     return component;
// };

// const EnableSioBroadcast = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_sio_broadcast")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={serverConfigState.serverConfiguration.sio_broadcast ? "true" : "false"}
//                         onChange={(e) => {
//                             if (!serverConfigState.serverConfiguration) {
//                                 return;
//                             }
//                             serverConfigState.serverConfiguration.sio_broadcast = e.target.value == "true";
//                             serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                         }}
//                     >
//                         <option value={"true"}>{t("dialog_advanced_setting_enable_sio_broadcast_yes")}</option>
//                         <option value={"false"}>{t("dialog_advanced_setting_enable_sio_broadcast_no")}</option>
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };

// const PathThroughConfirmationSkip = () => {
//     const { t } = useTranslation();
//     const { voiceChangerClientState } = useAppState();
//     const component = useMemo(() => {
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_skip_pass_through_confirmation")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={voiceChangerClientState.pathThroughConfirmationSkip ? "true" : "false"}
//                         onChange={(e) => {
//                             voiceChangerClientState.setPathThroughConfirmationSkip(e.target.value == "true");
//                         }}
//                     >
//                         <option value={"true"}>{t("dialog_advanced_setting_skip_pass_through_confirmation_yes")}</option>
//                         <option value={"false"}>{t("dialog_advanced_setting_skip_pass_through_confirmation_no")}</option>
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [voiceChangerClientState.pathThroughConfirmationSkip]);
//     return component;
// };

// const EnablePerformanceMonitor = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_performance_monitor")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={serverConfigState.serverConfiguration.enable_performance_monitor ? "true" : "false"}
//                         onChange={(e) => {
//                             if (!serverConfigState.serverConfiguration) {
//                                 return;
//                             }
//                             serverConfigState.serverConfiguration.enable_performance_monitor = e.target.value == "true";
//                             serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                         }}
//                     >
//                         <option value={"true"}>{t("dialog_advanced_setting_enable_performance_monitor_yes")}</option>
//                         <option value={"false"}>{t("dialog_advanced_setting_enable_performance_monitor_no")}</option>
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };

// const EnableHighPassFilter = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_high_pass_filter")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={serverConfigState.serverConfiguration.enable_high_pass_filter ? "true" : "false"}
//                         onChange={(e) => {
//                             if (!serverConfigState.serverConfiguration) {
//                                 return;
//                             }
//                             serverConfigState.serverConfiguration.enable_high_pass_filter = e.target.value == "true";
//                             serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                         }}
//                     >
//                         <option value={"true"}>{t("dialog_advanced_setting_enable_high_pass_filter_yes")}</option>
//                         <option value={"false"}>{t("dialog_advanced_setting_enable_high_pass_filter_no")}</option>
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };
// const EnableHighPassFilterCutoff = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_high_pass_filter_cutoff")}</div>
//                 <div className={dialogItemValue}>
//                     <div className={dialogItemValueSliderContainer}>
//                         <span className={dialogItemValueSlider}>
//                             <input
//                                 type="range"
//                                 min="48"
//                                 max="200"
//                                 step="1.0"
//                                 defaultValue={serverConfigState.serverConfiguration.high_pass_filter_cutoff}
//                                 onChange={(e) => {
//                                     if (!serverConfigState.serverConfiguration) {
//                                         return;
//                                     }
//                                     serverConfigState.serverConfiguration.high_pass_filter_cutoff = Number(e.target.value);
//                                     serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                                 }}
//                             ></input>
//                         </span>
//                         <span className={dialogItemValueSliderVal}>{serverConfigState.serverConfiguration.high_pass_filter_cutoff}</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };

// const EnableLowPassFilter = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_low_pass_filter")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={serverConfigState.serverConfiguration.enable_low_pass_filter ? "true" : "false"}
//                         onChange={(e) => {
//                             if (!serverConfigState.serverConfiguration) {
//                                 return;
//                             }
//                             serverConfigState.serverConfiguration.enable_low_pass_filter = e.target.value == "true";
//                             serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                         }}
//                     >
//                         <option value={"true"}>{t("dialog_advanced_setting_enable_low_pass_filter_yes")}</option>
//                         <option value={"false"}>{t("dialog_advanced_setting_enable_low_pass_filter_no")}</option>
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };
// const EnableLowPassFilterCutoff = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_low_pass_filter_cutoff")}</div>
//                 <div className={dialogItemValue}>
//                     <div className={dialogItemValueSliderContainer}>
//                         <span className={dialogItemValueSlider}>
//                             <input
//                                 type="range"
//                                 min="3000"
//                                 max="10000"
//                                 step="1.0"
//                                 defaultValue={serverConfigState.serverConfiguration.low_pass_filter_cutoff}
//                                 onChange={(e) => {
//                                     if (!serverConfigState.serverConfiguration) {
//                                         return;
//                                     }
//                                     serverConfigState.serverConfiguration.low_pass_filter_cutoff = Number(e.target.value);
//                                     serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                                 }}
//                             ></input>
//                         </span>
//                         <span className={dialogItemValueSliderVal}>{serverConfigState.serverConfiguration.low_pass_filter_cutoff}</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };

// const OutputBufferFactorSetting = () => {
//     const { t } = useTranslation();
//     const { voiceChangerClientState } = useAppState();
//     const component = useMemo(() => {
//         if (!voiceChangerClientState.voiceChangerClientInitialized) {
//             return;
//         }
//         const options = Array.from({ length: 20 }).map((_, i) => {
//             return (
//                 <option key={i} value={i}>
//                     {i}
//                 </option>
//             );
//         });

//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_output_buffer_factor")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={voiceChangerClientState.outputBufferFactor}
//                         onChange={(e) => {
//                             if (!voiceChangerClientState.voiceChangerClientInitialized) {
//                                 return;
//                             }
//                             voiceChangerClientState.setOutputBufferFactor(parseInt(e.target.value));
//                         }}
//                     >
//                         {options}
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [voiceChangerClientState.voiceChangerClientInitialized, voiceChangerClientState.outputBufferFactor]);
//     return component;
// };

// const ClearOutputBuffer = () => {
//     const { t } = useTranslation();
//     const { voiceChangerClientState } = useAppState();
//     const component = useMemo(() => {
//         if (!voiceChangerClientState.voiceChangerClientInitialized) {
//             return;
//         }

//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_clear_output_buffer")}</div>
//                 <div className={dialogItemValue}>
//                     <span
//                         className={execButton}
//                         onClick={() => {
//                             voiceChangerClientState.trancateOutputBuffer();
//                         }}
//                     >
//                         {t("dialog_advanced_setting_clear_output_buffer_exec")}
//                     </span>
//                 </div>
//             </div>
//         );
//     }, [voiceChangerClientState.voiceChangerClientInitialized]);
//     return component;
// };

// const VolumeTuneTypeSelect = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }

//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_volume_tune_type")}</div>
//                 <div className={dialogItemValue}>
//                     <select
//                         value={serverConfigState.serverConfiguration.volume_tuning_type}
//                         onChange={(e) => {
//                             if (!serverConfigState.serverConfiguration) {
//                                 return;
//                             }
//                             serverConfigState.serverConfiguration.volume_tuning_type = e.target.value as VolumeTuningType;
//                             serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                         }}
//                     >
//                         {VolumeTuningTypes.map((v) => {
//                             return (
//                                 <option key={v} value={v}>
//                                     {v}
//                                 </option>
//                             );
//                         })}
//                     </select>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };



// const ServerDeviceTrancateBufferRatio = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_server_device_trancate_buffer_ratio")}</div>
//                 <div className={dialogItemValue}>
//                     <div className={dialogItemValueSliderContainer}>
//                         <span className={dialogItemValueSlider}>
//                             <input
//                                 type="range"
//                                 min="0.0"
//                                 max="2.00"
//                                 step="0.1"
//                                 defaultValue={serverConfigState.serverConfiguration.server_device_trancate_buffer_ratio}
//                                 onChange={(e) => {
//                                     if (!serverConfigState.serverConfiguration) {
//                                         return;
//                                     }
//                                     serverConfigState.serverConfiguration.server_device_trancate_buffer_ratio = Number(e.target.value);
//                                     serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                                 }}
//                             ></input>
//                         </span>
//                         <span className={dialogItemValueSliderVal}>{serverConfigState.serverConfiguration.server_device_trancate_buffer_ratio}</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };

// const CrossfadeLength = () => {
//     const { t } = useTranslation();
//     const { serverConfigState } = useAppRoot();
//     const component = useMemo(() => {
//         if (!serverConfigState.serverConfiguration) {
//             return;
//         }
//         return (
//             <div className={dialogItemRow}>
//                 <div className={dialogItemName20}>{t("dialog_advanced_setting_crossfade_sec")}</div>
//                 <div className={dialogItemValue}>
//                     <div className={dialogItemValueSliderContainer}>
//                         <span className={dialogItemValueSlider}>
//                             <input
//                                 type="range"
//                                 min="0.05"
//                                 max="2.00"
//                                 step="0.05"
//                                 defaultValue={serverConfigState.serverConfiguration.crossfade_sec}
//                                 onChange={(e) => {
//                                     if (!serverConfigState.serverConfiguration) {
//                                         return;
//                                     }
//                                     serverConfigState.serverConfiguration.crossfade_sec = Number(e.target.value);
//                                     serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
//                                 }}
//                             ></input>
//                         </span>
//                         <span className={dialogItemValueSliderVal}>{serverConfigState.serverConfiguration.crossfade_sec}</span>
//                     </div>
//                 </div>
//             </div>
//         );
//     }, [serverConfigState.serverConfiguration]);
//     return component;
// };




const TranscribeAudio = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();
    const component = useMemo(() => {
        if (!serverConfigState.serverConfiguration) {
            return;
        }
        return (
            <div className={dialogItemRow}>
                <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_transcribe_audio")}</div>
                <div className={dialogItemValue}>
                    <select
                        value={serverConfigState.serverConfiguration.transcribe_audio ? "true" : "false"}
                        onChange={(e) => {
                            if (!serverConfigState.serverConfiguration) {
                                return;
                            }
                            serverConfigState.serverConfiguration.transcribe_audio = e.target.value == "true";
                            serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
                        }}
                    >
                        <option value={"true"}>{t("dialog_advanced_setting_enable_transcribe_audio_yes")}</option>
                        <option value={"false"}>{t("dialog_advanced_setting_enable_transcribe_audio_no")}</option>
                    </select>
                </div>
            </div>
        );
    }, [serverConfigState.serverConfiguration]);
    return component;
};

const TranscribeAudioModelSize = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();

    const options = Object.keys(TranscriberModelSize).filter((x) => {
        return true
    }).map((v) => {
        return (
            <option key={v} value={v}>
                {v}
            </option>
        );
    });

    const component = useMemo(() => {
        if (!serverConfigState.serverConfiguration) {
            return;
        }
        return (
            <div className={dialogItemRow}>
                <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_transcribe_audio_model_size")}</div>
                <div className={dialogItemValue}>
                    <select
                        value={serverConfigState.serverConfiguration.transcriber_model_size}
                        onChange={(e) => {
                            if (!serverConfigState.serverConfiguration) {
                                return;
                            }
                            serverConfigState.serverConfiguration.transcriber_model_size = e.target.value as TranscriberModelSize;
                            serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
                        }}
                    >
                        {options}
                    </select>
                </div>
            </div>
        );
    }, [serverConfigState.serverConfiguration]);
    return component;
};



const TranscribeAudioDevice = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();

    const options = Object.keys(TranscriberDevice).filter((x) => {
        // [ "cpu"]に含まれる場合はtrue
        return ["cpu"].includes(x);
    }).map((v) => {
        return (
            <option key={v} value={v}>
                {v}
            </option>
        );
    });

    const component = useMemo(() => {
        if (!serverConfigState.serverConfiguration) {
            return;
        }
        return (
            <div className={dialogItemRow}>
                <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_transcribe_audio_device")}</div>
                <div className={dialogItemValue}>
                    <select
                        value={serverConfigState.serverConfiguration.transcriber_device}
                        onChange={(e) => {
                            if (!serverConfigState.serverConfiguration) {
                                return;
                            }
                            serverConfigState.serverConfiguration.transcriber_device = e.target.value as TranscriberDevice;
                            serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
                        }}
                    >
                        {options}
                    </select>
                </div>
            </div>
        );
    }, [serverConfigState.serverConfiguration]);
    return component;
};


const TranscribeAudioComputeType = () => {
    const { t } = useTranslation();
    const { serverConfigState } = useAppRoot();

    const options = Object.keys(TranscriberComputeType).filter((x) => {
        return ["float32", "int8"].includes(x);
    }).map((v) => {
        return (
            <option key={v} value={v}>
                {v}
            </option>
        );
    });

    const component = useMemo(() => {
        if (!serverConfigState.serverConfiguration) {
            return;
        }
        return (
            <div className={dialogItemRow}>
                <div className={dialogItemName20}>{t("dialog_advanced_setting_enable_transcribe_audio_compute_type")}</div>
                <div className={dialogItemValue}>
                    <select
                        value={serverConfigState.serverConfiguration.transcriber_compute_type}
                        onChange={(e) => {
                            if (!serverConfigState.serverConfiguration) {
                                return;
                            }
                            serverConfigState.serverConfiguration.transcriber_compute_type = e.target.value as TranscriberComputeType;
                            serverConfigState.updateServerConfiguration(serverConfigState.serverConfiguration);
                        }}
                    >
                        {options}
                    </select>
                </div>
            </div>
        );
    }, [serverConfigState.serverConfiguration]);
    return component;
};



export const AdvancedSettingDialog = () => {
    const { t } = useTranslation();
    const { serverConfigState, triggerToast } = useAppRoot();
    const { setDialogName } = useGuiState();

    const backClicked = () => {
        setDialogName("none");
    };
    const component = useMemo(() => {
        return (
            <div className={dialogFrame}>
                <div className={dialogTitle}>{t("dialog_advanced_setting_title")}</div>
                <div className={instructions}>{t("dialog_advanced_setting_instruction")}</div>
                <div className={dialogFixedSizeContent}>
                    <TranscribeAudio></TranscribeAudio>
                    <TranscribeAudioModelSize></TranscribeAudioModelSize>
                    <TranscribeAudioDevice></TranscribeAudioDevice>
                    <TranscribeAudioComputeType></TranscribeAudioComputeType>

                </div>
                <CloseButtonRow closeClicked={backClicked}></CloseButtonRow>
            </div>
        );
    }, []);
    return component;
};
