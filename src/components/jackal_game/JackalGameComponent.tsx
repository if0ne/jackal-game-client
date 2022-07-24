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
import cellGrass1 from "../../assets/cells/grass-1.png";
//@ts-ignore
import cellGrass2 from "../../assets/cells/grass-2.png";
//@ts-ignore
import cellGrass3 from "../../assets/cells/grass-3.png";
//@ts-ignore
import cellGrass4 from "../../assets/cells/grass-4.png";
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
import {useLobby} from "../../hook/useLobby";
import {PlayerCard} from "./PlayerCard";

export const JackalGameComponent = () => {

    const [choice, setChoice] = useState<number | null>(null);
    const [withMoney, setWithMoney] = useState(false);

    const { newMessage, gameState, localPlayer, doAction, directions } = useGameService();
    const { lobby } = useLobby();
    const [needRender, setNeedRender] = useState(false);

    useEffect(() => {
        setNeedRender((prev) => {
            return !prev;
        });
    }, [gameState, newMessage, localPlayer]);

    useEffect(() => {
        if (gameState !== null && lobby !== null) {
            gameState.players = gameState.players.map((value: any) => {
                return {
                    id: value.id,
                    number: value.number,
                    name: lobby.members.get(value.id).name,
                    picture: lobby.members.get(value.id).pictureUrl,
                    coins: getCoinsByPirateTeam(value.number),
                    pirates: value.pirates,
                };
            });
            setNeedRender((prev) => {
                return !prev;
            });
        }
    }, [newMessage, lobby]);

    const getCoinsByPirateTeam = (number: number) => {
        //TODO: добавить координаты корабля в GameState, чтобы не было n^2
        for (const y of gameState.cells) {
            for (const x of y) {
                if (x.cellType === "SHIP" && x.teamNumber === number) {
                    return x.coins;
                }
            }
        }

        return 0;
    };

    const chooseCell = (index: number) => {
        if (choice === index) {
            setChoice(null);
        } else {
            setChoice(index);
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
        const scale = ((Math.abs(-2 + teamNumber)) % 4) * Math.sign(-2 + teamNumber);

        return 90 * scale;
    };

    const isNextDirection = (x: number, y: number) => {
        for (const direction of directions) {
            if (direction.x === x && direction.y === y) {
                return true;
            }
        }

        return false;
    }

    const getCardImage = (cell: any) => {
        switch (cell.cellType) {
            case "HIDDEN":
                return cellClosed;
            case "WATER":
                return cellWater;
            case "EMPTY":
                return [cellGrass1, cellGrass2, cellGrass3, cellGrass4][(cell.position.x + cell.position.y) % 4];
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

    const isMyTurn = () => {
        if (!gameState) {
            return false;
        }
        return gameState.currentPlayerNumber === localPlayer.playerNumber;
    }

    const isClickable = (x: number, y: number) => {
        const containsMyPirates = isCellContainsMyPirates(x, y);

        return isMyTurn() && containsMyPirates;
    };

    const isContainsMoney = (x: number, y: number) => {
        return gameState.cells[y][x].coins > 0 && gameState.cells[y][x].cellType !== "SHIP";
    }

    const handleClick = (x: number, y: number) => {
        if (choice !== null) {
            if ((y*13 + x) === choice) {
                if (withMoney) {
                    setChoice(null);
                    setWithMoney(false);
                } else {
                    if (isContainsMoney(x, y)) {
                        setWithMoney(true);
                    } else {
                        setChoice(null);
                    }
                }
            } else {
                const startPos = getCellPosition(choice);
                doAction(
                    gameState.cells[startPos.y][startPos.x].pirates[0].number,
                    withMoney,
                    x,
                    y
                ).then(() => {});
                setWithMoney(false);
                setChoice(null);
            }
        } else {
            if (isClickable(x, y)) {
                chooseCell(y*13 + x);
            }
        }


    };

    return (
        <>
            <div className="side-panel-info">
                {gameState &&
                    gameState.players.map((value: any) =>
                        <PlayerCard player={value}/>
                    )
                }
            </div>
            <div className="game-container">
                <div className="mx-auto d-flex game-map" style={{transform: `rotate(${localPlayer ? teamNumberToDegrees(localPlayer.playerNumber) : 0}deg)`}}>
                    {
                        //@ts-ignore
                        gameState && gameState.cells.map((row, y) =>
                            row.map((cell: any, x: number) => {
                                return (
                                    <Cell
                                        key={y*13 + x}
                                        isChoosed={choice === y*13+x}
                                        withMoney={withMoney}
                                        cell={cell}
                                        globalRotation={
                                            localPlayer ? teamNumberToDegrees(localPlayer.playerNumber) : 0
                                        }
                                        isNextDirection={
                                            isMyTurn() && isNextDirection(x, y)
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
            {
                isMyTurn() &&
                    <div className="turn-panel-info">
                        <p className="turn-panel-info-text">Ваш ход</p>
                    </div>
            }
        </>

    );
}
