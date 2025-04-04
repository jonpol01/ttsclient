import { recipe } from "@vanilla-extract/recipes";
import { style } from "@vanilla-extract/css";

export const Emotion = {
    anger: {
        background: "#ffdede",
    },
    disgust: {
        background: "#bee0ec",
    },
    fear: {
        background: "#f2e9ff",
    },
    happy: {
        background: "#f4ff00",
    },
    sad: {
        background: "#e2e9f7",
    },
    surprise: {
        background: "#f1e687",
    },
    other: {
        background: "#aeaaaa",
    },
    none: {
        background: "#ffffff",
    },
} as const;
/* eslint-disable-next-line @typescript-eslint/no-redeclare */
export type Emotion = keyof typeof Emotion;

export const EmotionColors = [
    "#BDD9FF",
    "#DCE1EA",
    "#FEA3BC",
    "#ABD373",
    "#FEE6E2",
    "#ECB4A7",
    "#B5D5DA",
    "#67B18A",
    "#D6B8DA",
    "#BEB75E",
    "#AFBDCA",
    "#B9A2B4",
    "#C4B684",
    "#A49367",
    "#D3C9C7",
    "#A2BEDB",
    "#DACD9E",
    "#BBC2D6",
    "#57637A",
    "#FAE3D3",
    "#DBD8C5",
    "#015D2B",
    "#083F56",
    "#237C94",
    "#CECDD5",
    "#2E8ED8",
    "#9FBD6D",
    "#BECD7E",
    "#96C0C2",
    "#E8DDDB",
    "#4B6943",
    "#DE403B",
    "#F6735F",
    "#EC9782",
    "#EEB685",
    "#D7B4CA",
    "#999AC7",
    "#DDC8E7",
    "#BEC3D6",
    "#E4E3C4",
    "#D2A2B0",
    "#C5D364",
    "#EA8A4A",
    "#87756B",
    "#EAE4E7",
    "#F5D7D9",
    "#EBA6A7",
    "#AC4839",
    "#365A2E",
    "#F4B17D",
    "#7F8142",
    "#815E58",
    "#E5864C",
    "#9444EF",
    "#FDD88A",
    "#BFC0A1",
    "#6B875F",
    "#B9C2D1",
    "#305455",
    "#DDC6CC",
    "#686EA8",
    "#A2ADC3",
    "#E6B2BD",
    "#CB5F88",
    "#DDC677",
    "#E8BCD8",
    "#AB1354",
    "#C6639C",
    "#00817C",
    "#F2F2F3",
    "#F5D9F2",
    "#9898CC",
    "#E8D8F4",
    "#C9D1F7",
    "#BDDCF7",
    "#8296D3",
    "#B7AFDF",
    "#EAC9E4",
    "#FFD0C8",
    "#FBDEDF",
    "#A782AD",
    "#C73AAC",
    "#7C3D71",
    "#B5B5A4",
    "#F1EEF0",
    "#EFB4BA",
    "#E14F42",
    "#ED8C6A",
    "#90B9B4",
    "#FCF4F2",
    "#576E8E",
    "#D09DD2",
    "#A097B4",
    "#332B66",
    "#C7BCCC",
    "#BA2737",
    "#E5CEBC",
    "#EAC9CA",
    "#B26D6E",
    "#E0707E",
];

export const EmotionButton = recipe({
    base: {
        borderRadius: "3px",
        textAlign: "center",
        fontSize: "0.7rem",
        height: "1rem",
        lineHeight: "1rem",
        width: "4rem",
        border: "solid 2px grey",
        cursor: "pointer",

        ":hover": {
            border: `solid 2px darkgrey`,
            transform: "scale(1.3)",
        },
    },
});

export const EmotionBlockButton = recipe({
    base: {
        width: "14px",
        height: "14px",
        lineHeight: "14px",
        borderRadius: "3px",
        cursor: "pointer",
        ":hover": {
            border: `solid 2px darkgrey`,
            transform: "scale(1.2)",
        },
    },
    variants: {
        selected: {
            true: {
                borderColor: "red",
                borderWidth: "3px",
                borderStyle: "solid",
            },
            false: {
                borderColor: "grey",
                borderWidth: "1px",
                borderStyle: "solid",
            },
        },
    },
});

export const colorButton = style({
    width: "90px",
    height: "30px",
    lineHeight: "30px",
    textAlign: "center",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid #ccc",
    transition: "transform 0.2s",
    ":hover": {
        transform: "scale(1.1)",
        border: "1px solid #333",
    },
});

export const colorGridContainer = style({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    padding: "20px",
    maxHeight: "400px",
    overflowY: "auto",
});

export const colorTile = style({
    width: "30px",
    height: "30px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "1px solid #ccc",
    transition: "transform 0.2s",
    ":hover": {
        transform: "scale(1.1)",
        border: "1px solid #333",
    },
});
