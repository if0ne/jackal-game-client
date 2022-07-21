import React from "react";

export const Cell = (props: any) => {

    const getTopByIndex = (index: any) => {
        if (index === 0) {
            return "5%";
        }
        if (index === 1) {
            return "55%";
        }
        if (index === 2) {
            return "55%";
        }
    }

    const getLeftByIndex = (index: any) => {
        if (index === 0) {
            return "5%";
        }
        if (index === 1) {
            return "55%";
        }
        if (index === 2) {
            return "5%";
        }
    }

    return (
        <div className={`game-cell ${props.isChoosed ? "choosed-cell" : ""}`} onClick={props.onClick}>
            {props.children}
            <div className="game-cell-container">
                <div className="game-cell-object-container">
                    {
                        props.commandColor &&
                            [...Array(3)].map((value, index) =>
                                <div key={index} className="game-cell-object-pirate" style={{top: getTopByIndex(index), left: getLeftByIndex(index), background: props.commandColor}}>
                                </div>
                            )
                    }
                </div>
            </div>
        </div>
    );
}