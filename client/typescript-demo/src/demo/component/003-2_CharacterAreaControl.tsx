import { useMemo } from "react";
import { characterAreaControlArea } from "../../styles/characterArea.css";
import React from "react";
import { CharacterAreaControlName } from "./003-2-1_CharacterAreaControlName";
import { ReferenceVoiceSelector } from "./003-2-2_ReferenceVoiceSelector";
import { ReferenceVoiceArea } from "./003-2-3_ReferenceVoiceArea";

export const CharacterAreaControl = () => {
    const component = useMemo(() => {
        return (
            <div className={characterAreaControlArea}>
                <CharacterAreaControlName></CharacterAreaControlName>
                <ReferenceVoiceSelector></ReferenceVoiceSelector>
                <ReferenceVoiceArea></ReferenceVoiceArea>
                {/* <CharacterAreaControlStart></CharacterAreaControlStart>
                <CharacterAreaControlGain></CharacterAreaControlGain> */}
            </div>
        );
    }, []);
    return component;
};
