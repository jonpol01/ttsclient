import React, { useMemo } from "react";
import { dialogFrame, dialogTitle, instructions, progressBarContainer, progressBar, progressText, progressInfo } from "../../../styles/dialog.css";
import { useGuiState } from "../../GuiStateProvider";
import { useAppRoot } from "../../../001_AppRootProvider";

export const ProgressDialog = () => {
    const { serverConfigState, triggerToast } = useAppRoot();
    const { dialog2Props } = useGuiState();
    const { progress } = useGuiState();

    if (dialog2Props == null) {
        triggerToast("error", "dialog2Props is null");
        return;
    }

    // Ensure progress is a number between 0-100
    const progressValue = progress * 100;

    // Format progress for display
    const progressPercent = Math.round(progressValue);
    const progressLabel = `${progressPercent}%`;

    const screen = useMemo(() => {
        return (
            <div className={dialogFrame}>
                <div className={dialogTitle}>{dialog2Props.title}</div>
                <div className={instructions}>{dialog2Props.instruction}</div>

                {/* Rich progress bar */}
                <div className={progressInfo}>{progressLabel}</div>
                <div className={progressBarContainer}>
                    <div
                        className={progressBar}
                        style={{
                            width: `${progressValue}%`,
                            transition: "all 0.5s ease",
                        }}
                    >
                        <span
                            className={progressText}
                            style={{
                                // backgroundColor: progressValue === 100 ? '#00cc00' : undefined,
                                // boxShadow: progressValue === 100 ? '0 0 10px #00cc00' : undefined,
                                // fontSize: progressValue === 100 ? '1.5rem' : undefined,
                                // color: progressValue === 100 ? 'red' : undefined,
                                transition: "all 0.5s ease",
                            }}
                        >
                            {progressLabel}
                        </span>
                    </div>
                </div>
            </div>
        );
    }, [serverConfigState.serverSlotInfos, progress, dialog2Props]);

    return screen;
};
