import React, { useMemo } from "react";
import { closeButton, closeButtonRow, dialogFrame, dialogTitle, instructions } from "../../../styles/dialog.css";
import { useGuiState } from "../../GuiStateProvider";
import { useTranslation } from "react-i18next";
import { useAppRoot } from "../../../001_AppRootProvider";
import { colorGridContainer, colorTile, EmotionColors } from "../../../styles/style-components/buttons/02_emotion-button.css";

export const ColorSelectDialog = () => {
    const { triggerToast } = useAppRoot();
    const { dialog2Props, setDialog2Name } = useGuiState();
    const { t } = useTranslation();

    if (dialog2Props == null) {
        triggerToast("error", "dialog2Props is null");
        return null;
    }

    const handleColorSelect = (color: string) => {
        dialog2Props.resolve(color);
        setDialog2Name("none");
    };

    const handleCancel = () => {
        dialog2Props.resolve(dialog2Props.defaultValue);
        setDialog2Name("none");
    };

    const screen = useMemo(() => {
        return (
            <div className={dialogFrame}>
                <div className={dialogTitle}>{dialog2Props.title}</div>
                <div className={instructions}>{dialog2Props.instruction}</div>

                {/* Display color tiles in a grid */}
                <div className={colorGridContainer}>
                    {EmotionColors.map((color, index) => (
                        <div key={index} className={colorTile} style={{ backgroundColor: color }} onClick={() => handleColorSelect(color)} title={color} />
                    ))}
                </div>

                {/* Cancel button */}
                <div className={closeButtonRow}>
                    <div className={closeButton} onClick={handleCancel}>
                        {t("cancel")}
                    </div>
                </div>
            </div>
        );
    }, [dialog2Props, t]);

    return screen;
};
