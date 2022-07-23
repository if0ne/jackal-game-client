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

import React, {useEffect, useState} from "react";
import {useGameService} from "../../hook/useGameService";
import {Cell} from "./Cell";

export const JackalGameComponent = () => {

    const [choosed, setChoosed] = useState<number | null>(null);
    const [withMoney, setWithMoney] = useState(false);

    const { newMessage, gameState, localPlayer, doAction } = useGameService();
    const [needRender, setNeedRender] = useState(false);

    useEffect(() => {
        setNeedRender((prev) => {
            return !prev;
        });
    }, [gameState, newMessage, localPlayer]);

    const chooseCell = (index: number) => {
        if (choosed === index) {
            setChoosed(null);
        } else {
            setChoosed(index);
        }
    }

    const getCellPosition = (index: number) => {
        let y = Math.trunc(index / 13);
        let x = index % 13;

        return {
            x: x,
            y: y
        };
    }

    const teamNumberToDegrees = (teamNumber: number) => {
        const scale = (teamNumber + 2) % 4;

        return 90 * scale;
    };

    const getCardImage = (cell: any) => {
        switch (cell.cellType) {
            case "HIDDEN":
                return cellClosed;
            case "WATER":
                return cellWater;
            case "EMPTY":
                return cellGrass;
            case "STRAIGHT_ONE_WAY_ARROW":
                return cellOneArrow;
            case "DIAGONAL_ONE_WAY_ARROW":
                return cellDiagOneArrow;
            case "STRAIGHT_TWO_WAY_ARROW":
                return cellTwoArrow;
            case "DIAGONAL_TWO_WAY_ARROW":
                return cellDiagTwoArrow;
            case "STRAIGHT_CROSS_SHAPED_ARROW":
                return cellCrossArrow;
            case "DIAGONAL_CROSS_SHAPED_ARROW":
                return cellDiagCross;
            case "DIAGONAL_Y_ARROW":
                return cellYArrow;
            case "HORSE":
                return cellHorse;
            case "BARREL":
                return cellBarrel;
            case "LABYRINTH_WOOD":
                return cellLabWood;
            case "LABYRINTH_SAND":
                return cellLabSand;
            case "LABYRINTH_JUNGLE":
                return cellLabJungle;
            case "LABYRINTH_ROCKS":
                return cellLabRock;
            case "ICE":
                return cellIce;
            case "TRAP":
                return cellTrap;
            case "CROCODILE":
                return cellCroco;
            case "CANNIBAL":
                return cellCannibal;
            case "FORTRESS":
                return cellFortress;
            case "NATIVE":
                return cellAmazonka;
            case "CHEST_1":
                return cellChest1;
            case "CHEST_2":
                return cellChest2;
            case "CHEST_3":
                return cellChest3;
            case "CHEST_4":
                return cellChest4;
            case "CHEST_5":
                return cellChest5;
            case "BALL":
                return cellBalloon;
            case "AIRPLANE":
                return cellAirplane;
            case "GUN":
                return cellCannon;
            case "SHIP": {
                switch (cell.teamNumber) {
                    case 0:
                        return cellBlackShip;
                    case 1:
                        return cellYellowShip;
                    case 2:
                        return cellWhiteShip;
                    case 3:
                        return cellRedShip;
                }
            }
        }
    };

    const isCellContainsMyPirates = (x: number, y: number) => {
        for (const pirate of gameState.cells[y][x].pirates) {
            if (pirate.team === localPlayer.playerNumber) {
                return true;
            }
        }

        return false;
    };

    const isClickable = (x: number, y: number) => {
        const isMyTurn = gameState.currentPlayerNumber === localPlayer.playerNumber;

        const containsMyPirates = isCellContainsMyPirates(x, y);
        return isMyTurn && containsMyPirates;
    };

    const isContainsMoney = (x: number, y: number) => {
        return gameState.cells[y][x].coins > 0 && gameState.cells[y][x].cellType !== "SHIP";
    }

    const handleClick = (x: number, y: number) => {
        if (choosed !== null) {
            if ((y*13 + x) === choosed) {
                if (withMoney) {
                    setChoosed(null);
                } else {
                    if (isContainsMoney(x, y)) {
                        setWithMoney(true);
                    } else {
                        setChoosed(null);
                    }
                }
            } else {
                const startPos = getCellPosition(choosed);
                doAction(
                    gameState.cells[startPos.y][startPos.x].pirates[0].number,
                    withMoney,
                    x,
                    y
                ).then(() => {});
                setWithMoney(false);
                setChoosed(null);
            }
        } else {
            if (isClickable(x, y)) {
                chooseCell(y*13 + x);
            }
        }


    };

    return (
        <div className="game-container">
            <div className="mx-auto d-flex game-map" style={{transform: `rotate(${teamNumberToDegrees(localPlayer ? localPlayer.playerNumber : 2)}deg)`}}>
                {
                    //@ts-ignore
                    gameState && gameState.cells.map((row, y) =>
                        row.map((cell: any, x: number) => {
                            return (
                                <Cell
                                    key={y*13 + x}
                                    isChoosed={choosed === y*13+x}
                                    withMoney={withMoney}
                                    cell={cell}
                                    globalRotation={
                                        teamNumberToDegrees(localPlayer ? localPlayer.playerNumber : 2)
                                    }
                                    onClick={() => handleClick(x, y)}
                                >
                                    <img src={getCardImage(cell)} className="game-cell-img" alt="cell"/>
                                </Cell>
                            )
                        })
                    )
                }
            </div>
        </div>
    );
}
