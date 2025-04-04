import { useEffect, useRef, useState } from "react";
import { AudioRecorder, DefaultSettings, Settings, AudioDataCallback } from "@dannadori/audio-recorder-js";

export type AudioRecorderState = {
    audioRecorderInitialized: boolean;
    audioRecorderStarted: boolean;
    audioRecorderSettings: Settings;
};

export type AudioRecorderStateAndMethod = AudioRecorderState & {
    initializeAudioRecorder: (ctx: AudioContext) => void;
    audioRecorderStart: () => void;
    audioRecorderStop: () => void;
    setAudioInput: (audioInput: string | MediaStream) => void;
    setAudioInputGain: (audioInputGain: number) => void;
    setAudioOutputGain: (audioOutputGain: number) => void;
    setAudioMonitorGain: (audioMonitorGain: number) => void;
    setEnableEchoCancellation: (enableEchoCancellation: boolean) => void;
    setEnableNoiseSuppression: (enableNoiseSuppression: boolean) => void;
    setEnableNoiseSuppression2: (enableNoiseSuppression2: boolean) => void;

    setAudioDataCallback: (audioDataCallback: AudioDataCallback) => void;
};

type useAudioRecorderProps = {
    enableFlatPath: boolean;
    workOnColab: boolean;
};
export const useAudioRecorder = (_props: useAudioRecorderProps): AudioRecorderStateAndMethod => {
    const audioRecorder = useRef<AudioRecorder | null>(null);
    const [audioRecorderInitialized, setAudioRecorderInitialized] = useState<boolean>(false);
    const [audioRecorderSettings, setAudioRecorderSettings] = useState<Settings>(DefaultSettings);

    const [audioRecorderStarted, setAudioRecorderStarted] = useState<boolean>(false);

    const initializeAudioRecorder = async (ctx: AudioContext) => {
        audioRecorder.current = new AudioRecorder(ctx, true);
        const initialized = await audioRecorder.current.isInitialized();
        setAudioRecorderInitialized(initialized);
    };

    const audioRecorderStart = () => {
        setAudioRecorderStarted(true);
    };
    const audioRecorderStop = () => {
        setAudioRecorderStarted(false);
    };

    useEffect(() => {
        if (!audioRecorder.current) {
            return;
        }
        if (audioRecorderStarted) {
            audioRecorder.current.start();
        } else {
            audioRecorder.current.stop();
        }
    }, [audioRecorderStarted]);

    // 設定
    const setAudioInput = (audioInput: string | MediaStream) => {
        // audioRecorderSettings.audioRecorderSetting.audioInput = audioInput; <- いらなくない？？ TODO
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                audioRecorderSetting: {
                    ...prev.audioRecorderSetting,
                    audioInput: audioInput,
                },
            };
        });
    };
    const setAudioInputGain = (audioInputGain: number) => {
        // clientSetting.voiceChangerClientSetting.inputGain = audioInputGain;
        // setClientSetting(clientSetting);
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                voiceChangerClientSetting: {
                    ...prev.audioRecorderSetting,
                    inputGain: audioInputGain,
                },
            };
        });
    };
    const setAudioOutputGain = (audioOutputGain: number) => {
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                voiceChangerClientSetting: {
                    ...prev.audioRecorderSetting,
                    outputGain: audioOutputGain,
                },
            };
        });
    };
    const setAudioMonitorGain = (audioMonitorGain: number) => {
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                voiceChangerClientSetting: {
                    ...prev.audioRecorderSetting,
                    monitorGain: audioMonitorGain,
                },
            };
        });
    };
    const setEnableEchoCancellation = (enableEchoCancellation: boolean) => {
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                voiceChangerClientSetting: {
                    ...prev.audioRecorderSetting,
                    echoCancel: enableEchoCancellation,
                },
            };
        });
    };
    const setEnableNoiseSuppression = (enableNoiseSuppression: boolean) => {
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                voiceChangerClientSetting: {
                    ...prev.audioRecorderSetting,
                    noiseSuppression: enableNoiseSuppression,
                },
            };
        });
    };
    const setEnableNoiseSuppression2 = (enableNoiseSuppression2: boolean) => {
        setAudioRecorderSettings((prev) => {
            return {
                ...prev,
                voiceChangerClientSetting: {
                    ...prev.audioRecorderSetting,
                    noiseSuppression2: enableNoiseSuppression2,
                },
            };
        });
    };

    const setAudioDataCallback = (audioDataCallback: AudioDataCallback) => {
        if (!audioRecorder.current) {
            return;
        }
        audioRecorder.current.setAudioDataCallback(audioDataCallback);
    };
    useEffect(() => {
        if (!audioRecorder.current || !audioRecorderInitialized) {
            return;
        }
        audioRecorder.current.updateSettings(audioRecorderSettings);
    }, [audioRecorder.current, audioRecorderInitialized, audioRecorderSettings]);

    const res = {
        audioRecorderInitialized,
        audioRecorderSettings,
        initializeAudioRecorder,
        audioRecorderStarted,
        audioRecorderStart,
        audioRecorderStop,
        setAudioInput,
        setAudioInputGain,
        setAudioOutputGain,
        setAudioMonitorGain,
        setEnableEchoCancellation,
        setEnableNoiseSuppression,
        setEnableNoiseSuppression2,
        setAudioDataCallback,
    };
    return res;
};
