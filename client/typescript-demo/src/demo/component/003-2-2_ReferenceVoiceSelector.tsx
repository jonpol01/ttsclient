import { useMemo } from "react";
import React from "react";
import { useAppRoot } from "../../001_AppRootProvider";
import { useTranslation } from "react-i18next";
import { useAppState } from "../../002_AppStateProvider";
import { EmotionBlockButton, EmotionButton, EmotionColors } from "../../styles/style-components/buttons/02_emotion-button.css";

export const ReferenceVoiceSelector = () => {
    const { serverConfigState, triggerToast } = useAppRoot();
    const { t } = useTranslation();
    const { currentReferenceVoiceIndexes, currentVoiceCharacterSlotIndex, setCurrentReferenceVoiceIndexes, referenceVoiceMode } = useAppState();

    const component = useMemo(() => {
        if (currentVoiceCharacterSlotIndex == null) {
            return <></>;
        }
        const voiceCharacter = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex];
        if (voiceCharacter == null) {
            return <></>;
        }

        const voiceCharacterEmotionTypes =
            voiceCharacter.emotion_types?.map((x) => {
                return x.name;
            }) || [];

        const generateEmotionColorMap = () => {
            let colorMap = new Map<string, string>();
            voiceCharacter.emotion_types?.forEach((x) => {
                colorMap.set(x.name, x.color);
            });
            // voiceCharacterで定義されていないが、reference_vociesで設定されているemotionに色を自動で割り振る
            const referenceVoiceEmotionTypes = voiceCharacter.reference_voices.map((x) => {
                return x.voice_type;
            });
            const referenceVoiceEmotionTypesSet = new Set(referenceVoiceEmotionTypes);
            const unregisteredEmotionTypes = Array.from(referenceVoiceEmotionTypesSet).filter((x) => {
                return !voiceCharacterEmotionTypes.includes(x);
            });
            const usedColors = voiceCharacter.emotion_types.map((x) => {
                return x.color;
            });
            const unusedEmotionColors = EmotionColors.filter((x) => {
                if (!voiceCharacter.emotion_types) {
                    return true;
                }
                return !usedColors.includes(x);
            });
            unregisteredEmotionTypes.sort().forEach((x, index) => {
                colorMap.set(x, unusedEmotionColors[index]);
            });
            return colorMap;
        };
        const emotionColorMap = generateEmotionColorMap();
        const col = 25;
        const row = 4;
        const width = 14;
        const gap = 5;

        const tableWidth = (width + gap) * col;

        const voiceBlockClicked = (index: number, ctrlPressed: boolean) => {
            // 既に選択済みだった場合。
            const indexes = currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] || [];
            if (indexes.includes(index)) {
                if (ctrlPressed) {
                    // コントロールが押されていたら、選択を解除する。
                    const newIndexes = indexes.filter((i) => i !== index);
                    currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = newIndexes;
                    setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
                    return;
                } else {
                    // コントロールが押されていなかったら、そのブロックだけ選択。
                    currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = [index];
                    setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
                    return;
                }
            }

            // 選択されていなかった場合。
            let newIndexes: number[] = [];
            if (ctrlPressed) {
                newIndexes = currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] || [];
            }
            newIndexes.push(index);
            currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = newIndexes;
            setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
            return;
        };

        const voiceBlocks = Array.from({ length: row }, (_, i) => {
            return Array.from({ length: col }, (_, j) => {
                const indexes = currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] || [];
                const cellIndex = i * col + j;
                const selected = indexes.includes(cellIndex);
                const voices = voiceCharacter.reference_voices.filter((x) => {
                    return x.slot_index == cellIndex;
                });
                // let emotion: BasicVoiceType | "none" = "none"
                let cellColor: string = "white";
                if (voices.length == 1) {
                    cellColor = emotionColorMap.get(voices[0].voice_type) || "white";
                }

                return (
                    // <button key={cellIndex} className={EmotionBlockButton({ emotion: (emotion as BasicVoiceType), selected: selected })}
                    <button
                        key={cellIndex}
                        className={EmotionBlockButton({ selected: selected })}
                        style={{ background: cellColor }}
                        onClick={(e) => {
                            if (referenceVoiceMode == "edit") {
                                triggerToast("error", t("reference_voice_area_select_voice_error_in_edit_mode"));
                                return;
                            }
                            voiceBlockClicked(cellIndex, e.ctrlKey);
                        }}
                    ></button>
                );
            });
        }).map((x, i) => {
            return (
                <div key={i} style={{ width: tableWidth, display: "flex", gap: "3px", padding: `${gap}px` }}>
                    {x}
                </div>
            );
        });

        const selectVoiceType = (voiceType: string) => {
            if (referenceVoiceMode == "edit") {
                triggerToast("error", t("reference_voice_area_select_voice_error_in_edit_mode"));
                return;
            }

            const reference_voices = serverConfigState.voiceCharacterSlotInfos[currentVoiceCharacterSlotIndex].reference_voices;
            const voiceIndexMatchType = reference_voices
                .filter((x) => {
                    return x.voice_type == voiceType;
                })
                .map((x) => {
                    return x.slot_index;
                });
            currentReferenceVoiceIndexes[currentVoiceCharacterSlotIndex] = voiceIndexMatchType;
            setCurrentReferenceVoiceIndexes({ ...currentReferenceVoiceIndexes });
        };

        const sideButtons = Array.from(emotionColorMap.keys()).map((x, _i) => {
            return (
                <button
                    key={x}
                    className={EmotionButton()}
                    style={{ background: emotionColorMap.get(x) || "white" }}
                    onClick={() => {
                        selectVoiceType(x);
                    }}
                >
                    {x}
                </button>
            );
        });

        return (
            <div style={{ display: "flex" }}>
                <div style={{ width: tableWidth, display: "flex", flexDirection: "column" }}>{voiceBlocks}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>{sideButtons}</div>
            </div>
        );
    }, [serverConfigState.voiceCharacterSlotInfos, currentReferenceVoiceIndexes, currentVoiceCharacterSlotIndex, referenceVoiceMode]);

    return component;
};
