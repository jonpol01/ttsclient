import React, { useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import { CutMethod, LanguageType } from "tts-client-typescript-client-lib";
import { useAppRoot } from "../001_AppRootProvider";
import { AudioRecorderStateAndMethod, useAudioRecorder } from "./hooks/001_useAudioRecorder";
type Props = {
    children: ReactNode;
};

type AppStateValue = {
    setDisplayColorMode: (mode: DisplayColorMode) => void;
    setCurrentVoiceCharacterSlotIndex: (index: number) => void;
    setCurrentReferenceVoiceIndexes: (indexes: { [key: number]: number[] }) => void;
    setReferenceVoiceMode: (mode: ReferenceVoiceMode) => void;
    setInferenceLanguage: (language: LanguageType) => void;
    setCutMethod: (cutMethod: CutMethod) => void;
    setSpeed: (speed: number) => void;
    setAudioInput: (audioInput: MediaStream | string) => void;
    setAudioOutput: (audioOutput: string) => void;
    setAudioMonitor: (audioMonitor: string) => void;
    setGeneratedVoice: (generatedVoice: Blob | null) => void;
    setElapsedTime: (elapsedTime: number) => void;
    setSampleSteps: (sampleSteps: number) => void;
    setReferenceRecorderAudioInput: (audioInput: string) => void;
    displayColorMode: DisplayColorMode;
    currentVoiceCharacterSlotIndex: number | null;
    currentReferenceVoiceIndexes: { [key: number]: number[] };
    referenceVoiceMode: ReferenceVoiceMode;
    inferenceLanguage: LanguageType;
    cutMethod: CutMethod;
    speed: number;
    audioInput: MediaStream | string;
    audioOutput: string;
    audioMonitor: string;
    generatedVoice: Blob | null;
    elapsedTime: number;
    sampleSteps: number;

    referenceRecorderAudioInput: string;

    audioRecorderState: AudioRecorderStateAndMethod;
};

const AppStateContext = React.createContext<AppStateValue | null>(null);
export const useAppState = (): AppStateValue => {
    const state = useContext(AppStateContext);
    if (!state) {
        throw new Error("useAppState must be used within AppStateProvider");
    }
    return state;
};

export const ReferenceVoiceMode = ["view", "edit"] as const;
/* eslint-disable-next-line @typescript-eslint/no-redeclare */
type ReferenceVoiceMode = (typeof ReferenceVoiceMode)[number];

export const DisplayColorMode = ["light", "dark"] as const;
/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export type DisplayColorMode = (typeof DisplayColorMode)[number];

export const AppStateProvider = ({ children }: Props) => {
    const [displayColorMode, setDisplayColorMode] = useState<DisplayColorMode>("light");
    const { serverConfigState } = useAppRoot();
    const [currentVoiceCharacterSlotIndex, setCurrentVoiceCharacterSlotIndex] = useState<number | null>(null);
    const [currentReferenceVoiceIndexes, setCurrentReferenceVoiceIndexes] = useState<{ [key: number]: number[] }>({});
    const [referenceVoiceMode, setReferenceVoiceMode] = useState<ReferenceVoiceMode>("view");
    const [inferenceLanguage, setInferenceLanguage] = useState<LanguageType>("all_ja");
    const [cutMethod, setCutMethod] = useState<CutMethod>("No slice");
    const [speed, setSpeed] = useState<number>(1.0);
    const [sampleSteps, setSampleSteps] = useState<number>(20);

    const [audioInput, setAudioInput] = useState<MediaStream | string>("default");
    const [audioOutput, setAudioOutput] = useState<string>("default");
    const [audioMonitor, setAudioMonitor] = useState<string>("default");
    const [generatedVoice, setGeneratedVoice] = useState<Blob | null>(null);
    const [elapsedTime, setElapsedTime] = useState<number>(0);

    const [referenceRecorderAudioInput, setReferenceRecorderAudioInput] = useState<string>("default");

    const { audioConfigState } = useAppRoot();
    const audioRecorderState = useAudioRecorder({
        enableFlatPath: false,
        workOnColab: false,
    });
    useEffect(() => {
        if (!audioConfigState.audioContext) {
            return;
        }
        audioRecorderState.initializeAudioRecorder(audioConfigState.audioContext);
    }, [audioConfigState.audioContext]);

    // デフォルトの挙動
    // 現在のスロットのモデルがなくなったとき。最も若い存在するスロットに自動移動。ない場合は-1
    useEffect(() => {
        if (!serverConfigState.serverSlotInfos) return;
        const conf = serverConfigState.serverConfiguration;
        if (!conf) return;

        const validSlots = serverConfigState.serverSlotInfos.filter((x) => {
            return x.tts_type != null;
        });
        if (validSlots.length == 0) {
            // 有効なスロットが一つもないとき。
            serverConfigState.updateServerConfiguration({ ...conf, current_slot_index: -1 });
            return;
        }

        const currentSlot =
            validSlots.find((x) => {
                return x.slot_index === conf.current_slot_index;
            }) || null;
        if (currentSlot == null) {
            // 現在のスロットがなかった時。
            const minSlot = validSlots.sort((a, b) => a.slot_index - b.slot_index)[0];
            serverConfigState.updateServerConfiguration({ ...conf, current_slot_index: minSlot.slot_index });
        }
        return;
    }, [serverConfigState.serverSlotInfos, serverConfigState.serverConfiguration]);

    // 現在のVoiceCharacterがなくなったとき。挙動はスロットの時と同じ。
    useEffect(() => {
        const validVoiceCharacter = serverConfigState.voiceCharacterSlotInfos.filter((x) => {
            return x.tts_type != null;
        });
        if (validVoiceCharacter.length == 0) {
            // 有効なスロットが一つもないとき。
            setCurrentVoiceCharacterSlotIndex(null);
            return;
        }

        const currentVoiceCharacter =
            validVoiceCharacter.find((x) => {
                return x.slot_index === currentVoiceCharacterSlotIndex;
            }) || null;

        if (currentVoiceCharacter == null) {
            // 現在のスロットがなかった時。
            const minVoiceCharacter = validVoiceCharacter.sort((a, b) => a.slot_index - b.slot_index)[0];
            setCurrentVoiceCharacterSlotIndex(minVoiceCharacter.slot_index);
        }
    }, [serverConfigState.voiceCharacterSlotInfos]);

    // Reference Voiceの場合。
    // 選択中のReference Voiceがなくなったら、選択から解除。ひとつもなくなった場合は、最も若いR.V.を一つ選択。R.V.が一つもないときはから配列。
    useEffect(() => {
        if (currentVoiceCharacterSlotIndex == null) return;
        // 選択中キャラクタを抽出。なければ、選択R.V.は全解除
        const currentVoiceCharacter =
            serverConfigState.voiceCharacterSlotInfos.find((x) => {
                return x.slot_index === currentVoiceCharacterSlotIndex;
            }) || null;
        if (currentVoiceCharacter == null) {
            currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = [];
            setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
            return;
        }

        // 全キャラのR.V.選択情報から現在のキャラのR.V.選択情報を取り出す。なければ空配列。
        // 現在のキャラの全R.V.のindexを取り出す。(1)
        // R.V.選択情報の音声が存在するかを確認。(2)
        // (1)が(2)に存在するかを確認。存在するものだけを残す。
        const currentSelectedReferenceVoiceIndexes = currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] || [];
        const validReferenceVoiceIndexes = currentVoiceCharacter.reference_voices.map((x) => {
            return x.slot_index;
        });
        const validSelectedReferenceVoices = currentSelectedReferenceVoiceIndexes.filter((i) => {
            return validReferenceVoiceIndexes.includes(i);
        });
        // フィルタの結果一つでも残っていれば、それを残す。
        if (validSelectedReferenceVoices.length > 0) {
            currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = validSelectedReferenceVoices;
            setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
            return;
        }

        // フィルタ結果、ひとつもない場合は、最も若いindexを割り当てる。
        if (validSelectedReferenceVoices.length == 0) {
            const newSelected = validReferenceVoiceIndexes.sort((a, b) => {
                return a - b;
            })[0];

            currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = [newSelected];
            setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
            return;
        }
    }, [serverConfigState.voiceCharacterSlotInfos, currentVoiceCharacterSlotIndex]);

    const providerValue: AppStateValue = {
        setDisplayColorMode,
        setCurrentVoiceCharacterSlotIndex,
        setCurrentReferenceVoiceIndexes,
        setReferenceVoiceMode,
        setInferenceLanguage,
        setCutMethod,
        setSpeed,
        setAudioInput,
        setAudioOutput,
        setAudioMonitor,
        setGeneratedVoice,
        setElapsedTime,
        setSampleSteps,
        setReferenceRecorderAudioInput,
        displayColorMode,
        currentVoiceCharacterSlotIndex,
        currentReferenceVoiceIndexes,
        referenceVoiceMode,
        inferenceLanguage,
        cutMethod,
        speed,
        audioInput,
        audioOutput,
        audioMonitor,
        generatedVoice,
        elapsedTime,
        sampleSteps,
        referenceRecorderAudioInput,

        audioRecorderState,
    };
    return <AppStateContext.Provider value={providerValue}>{children}</AppStateContext.Provider>;
};
