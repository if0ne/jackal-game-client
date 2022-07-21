import "./JackalGameComponent.css";

//@ts-ignore
import cellAirplane from "../../assets/cells/airplane.png";
//@ts-ignore
import cellAmazonka from "../../assets/cells/amazonka.png";
//@ts-ignore
import cellBalloon from "../../assets/cells/balloon.png";
//@ts-ignore
import cellBarrel from "../../assets/cells/barrel.png";
//@ts-ignore
import cellBlackShip from "../../assets/cells/black-ship.png";
//@ts-ignore
import cellCannibal from "../../assets/cells/cannibal.png";
//@ts-ignore
import cellCannon from "../../assets/cells/cannon.png";
//@ts-ignore
import cellChest1 from "../../assets/cells/chest-1.png";
//@ts-ignore
import cellChest2 from "../../assets/cells/chest-2.png";
//@ts-ignore
import cellChest3 from "../../assets/cells/chest-3.png";
//@ts-ignore
import cellChest4 from "../../assets/cells/chest-4.png";
//@ts-ignore
import cellChest5 from "../../assets/cells/chest-5.png";
//@ts-ignore
import cellClosed from "../../assets/cells/closed.png";
//@ts-ignore
import cellCroco from "../../assets/cells/crocodile.png";
//@ts-ignore
import cellDiagCross from "../../assets/cells/diagonal-cross-arrow.png";
//@ts-ignore
import cellDiagOneArrow from "../../assets/cells/diagonal-one-way-arrow.png";
//@ts-ignore
import cellDiagTwoArrow from "../../assets/cells/diagonal-two-way-arrow.png";
//@ts-ignore
import cellFortress from "../../assets/cells/fortress.png";
//@ts-ignore
import cellGrass from "../../assets/cells/grass.png";
//@ts-ignore
import cellHorse from "../../assets/cells/horse.png";
//@ts-ignore
import cellIce from "../../assets/cells/ice.png";
//@ts-ignore
import cellLabJungle from "../../assets/cells/labyrinth-jungle.png";
//@ts-ignore
import cellLabRock from "../../assets/cells/labyrinth-rock.png";
//@ts-ignore
import cellLabSand from "../../assets/cells/labyrinth-sand.png";
//@ts-ignore
import cellLabWood from "../../assets/cells/labyrinth-wood.png";
//@ts-ignore
import cellRedShip from "../../assets/cells/red-ship.png";
//@ts-ignore
import cellCrossArrow from "../../assets/cells/straight-cross-arrow.png";
//@ts-ignore
import cellOneArrow from "../../assets/cells/straight-one-way-arrow.png";
//@ts-ignore
import cellTwoArrow from "../../assets/cells/straight-two-way-arrow.png";
//@ts-ignore
import cellTrap from "../../assets/cells/trap.png";
//@ts-ignore
import cellWater from "../../assets/cells/water.png";
//@ts-ignore
import cellWhiteShip from "../../assets/cells/white-ship.png";
//@ts-ignore
import cellYArrow from "../../assets/cells/y-arrow.png";
//@ts-ignore
import cellYellowShip from "../../assets/cells/yellow-ship.png";
//@ts-ignore
import coin from "../../assets/cells/coin.png";

import React, {useEffect, useState} from "react";
import {useGameService} from "../../hook/useGameService";
import {Cell} from "./Cell";

export const JackalGameComponent = () => {

    const [isReady, setReady] = useState(false);

    const [choosed, setChoosed] = useState<number | null>(null);

    const { newMessage } = useGameService();

    const chooseCell = (index: number) => {
        if (choosed == index) {
            setChoosed(null);
        } else {
            setChoosed(index);
        }
    }

    const getCell = (index: number) => {
        let y = Math.trunc(index / 13);
        let x = index % 13;

        if (x === 0 || y === 0 || x === 12 || y === 12 || (x === 1 && (y === 1 || y === 11)) || (x === 11 && (y === 1 || y === 11))) {
            return cellWater;
        } else {
            return cellClosed;
        }
    }

    return (
        <div className="game-container">
            <div className="mx-auto d-flex game-map">
                {
                    [...Array(13*13)].map((value, index) =>
                        <Cell key={index} isChoosed={choosed == index} onClick={() => chooseCell(index)}>
                            <img src={getCell(index)} className="game-cell-img" alt="cell"/>
                        </Cell>
                    )
                }
            </div>
        </div>
    );
}
