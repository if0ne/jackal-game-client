import React from "react";

export const Cell = (props: any) => {

    return (
        <div className={`game-cell ${props.isChoosed ? "choosed-cell" : ""}`} onClick={props.onClick}>
            {props.children}
            <div className="game-cell-container">
                <div className="game-cell-object-container">
                </div>
            </div>
        </div>
    );
}