//@ts-ignore
import coin from "../../assets/cells/coin.png";

import React from "react";

export const getPirateTeamColorByNumber = (number: number) => {
    switch (number) {
        case 0:
            return "#2c2e35";
        case 1:
            return "#aa42ff";
        case 2:
            return "#ccff00";
        case 3:
            return "#ff2e17";
    }
}

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

    const getBorder = () => {
        if (props.isChoosed) {
            if (props.withMoney) {
                return "with-money";
            } else {
                return "choosed-cell";
            }
        }

        return "";
    }

    const getRotation = () => {
        switch (props.cell.cellType) {
            case "STRAIGHT_ONE_WAY_ARROW": {
                return props.globalRotation + (props.cell.rotationId - 1) * 90;
            }
            case "STRAIGHT_TWO_WAY_ARROW": {
                return props.globalRotation + (props.cell.rotationId - 1) * 90;
            }
            case "DIAGONAL_ONE_WAY_ARROW": {
                return props.globalRotation + (props.cell.rotationId - 1) * 90;
            }
            case "DIAGONAL_TWO_WAY_ARROW": {
                return props.globalRotation + (props.cell.rotationId - 1) * 90;
            }
            case "DIAGONAL_Y_ARROW": {
                return props.globalRotation - (props.cell.rotationId - 1) * 90;
            }
        }
        return 0;
    }

    return (
        <div
            className={`game-cell ${getBorder()} ${props.isNextDirection ? "next-direction-cell" : ""}`}
            onClick={props.onClick}
            style={{transform: `rotate(${getRotation()-props.globalRotation}deg)`}}
        >
            {props.children}
            <div className="game-cell-container"  style={{transform: `rotate(${-getRotation()}deg)`}}>
                <div className="game-cell-object-container">
                    {
                        props.cell.pirates &&
                            props.cell.pirates.map((value: any, index: any) =>
                                <div key={index} className="game-cell-object" style={{top: getTopByIndex(index), left: getLeftByIndex(index), background: getPirateTeamColorByNumber(value.team)}}>
                                </div>
                            )
                    }
                    {
                        props.cell.coins > 0 &&
                        <>
                            <img src={coin} className="game-cell-object" style={{top: "5%", left: "55%"}}/>
                            <p className="coin">{props.cell.coins}</p>
                        </>
                    }
                </div>
            </div>
        </div>
    );
}