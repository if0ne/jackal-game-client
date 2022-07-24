import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {useAuth} from "./useAuth";
import JwtDecode from "jwt-decode";
import {useNavigate} from "react-router";
import {useLobby} from "./useLobby";

import {InitDataResponse} from "../components/models/game/InitDataResponse";
import {PlayerResponse} from "../components/models/game/PlayerResponse";
import {GameState, OwnPlayerData} from "../components/models/GameState";
import {CellResponse} from "../components/models/game/CellResponse";
import {ActionResponseFinished} from "../components/models/game/ActionResponseFinished";
import {ActionResponseDirectionQuestion} from "../components/models/game/ActionResponseDirectionQuestion";

let gameSocket: WebSocket | null = null;
let gameClient: Stomp.Client | null = null;
let currentSessionId: string | null = null;
let currentGameState: GameState | null = null;

export const GameContext = createContext<any>(null);

export const GameProvider = ({children}: {children: ReactNode}) => {

    const [isConnected, setConnected] = useState(false);
    const [newMessage, setNewMessage] = useState(true);

    const { getAuthRequest } = useAuth();
    const { lobby } = useLobby();

    const [gameState, setGameState] = useState<GameState | null>(null);
    const [localPlayer, setLocalPlayer] = useState<OwnPlayerData | null>(null);
    const [directions, setDirections] = useState(Array(0));

    const getTeamNumberByPirate = (gameState: any, pirate: number) => {
        for (const player of gameState.players) {
            if (player.pirates.includes(pirate)) {
                return player.number;
            }
        }
    };

    const getTeamNumberByCell = (players: Array<PlayerResponse>, cell: CellResponse) => {
        for (const player of players) {
            for (const ship of player.ships) {
                if (ship.position.x === cell.position.x && ship.position.y === cell.position.y) {
                    return player.number;
                }
            }
        }

        return null;
    };

    const findLocalPlayer = (userId: string, players: Array<PlayerResponse>) => {
        for (const player of players) {
            // @ts-ignore
            if (player.id == userId) {
                setLocalPlayer({
                    playerNumber: player.number,
                    pirates: player.pirateTeam.pirates
                });
                return;
            }
        }
    }

    useEffect(() => {
        if (gameSocket === null) {
            getAuthRequest("/api/game/get-connection-info")
                .then((response: any) => {
                    if (response && response.data.responseStatus === "OK") {
                        connect(
                            //@ts-ignore
                            response.data.webSocketInfo.subscriptionUserUrl,
                            //@ts-ignore
                            response.data.webSocketInfo.subscriptionGroupUrl,
                            //@ts-ignore
                            response.data.token
                        );
                    }
                });
        }

        return () => {
            disconnect();
        }
    }, []);

    const send = (action: string, body: any) => {
        // @ts-ignore
        gameClient?.send(`/jackal-game/${action}/${currentSessionId}`, {}, JSON.stringify(body));
    };

    const connect = (userSub: string, lobbySub: string, token: string) => {
        gameSocket = new SockJS(`${process.env.REACT_APP_GAME_SERVICE_URL}/jackal-websocket-connection/`);
        gameClient = Stomp.over(gameSocket);
        //@ts-ignore
        gameClient.debug = null;
        gameClient?.connect({
            jwt_token: token
        }, () => {
            // @ts-ignore
            currentSessionId = JwtDecode(token).sessionId;
            // @ts-ignore
            const playerId = JwtDecode(token).userId;

            gameClient?.subscribe(userSub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
                console.log(objectFromMessage);
                switch (objectFromMessage.type) {
                    case "INIT_INFORMATION": {
                        let initData = objectFromMessage as InitDataResponse;
                        findLocalPlayer(playerId, initData.players);

                        let gameState = {
                            currentPlayerId: initData.nextPlayerUserId,
                            currentPlayerNumber: initData.nextPlayerUserNumber,
                            players: Array(0),
                            cells: Array.from(Array(13), () => new Array(13))
                        };
                        initData.players.forEach((player: PlayerResponse) => {
                            gameState.players.push({
                                id: player.id,
                                number:  player.number,
                                name: lobby ? lobby.members.get(player.id).name : `Player ${player.number}`,
                                picture: lobby ? lobby.members.get(player.id).pictureUrl : "",
                                coins: 0,
                                pirates: player.pirateTeam.pirates
                            });
                        });
                        for (let y = 0; y < 13; ++y) {
                            for (let x = 0; x < 13; ++x) {
                                gameState.cells[y][x] = {
                                    cellType: initData.cells[y][x].cellType,
                                    coins: initData.cells[y][x].coinsNumber,
                                    pirates: initData.cells[y][x].pirates.map((value) => {
                                        return {
                                            number: value,
                                            team: getTeamNumberByPirate(gameState, value)
                                        }
                                    }),
                                    position: initData.cells[y][x].position,
                                    rotationId: initData.cells[y][x].rotationId,
                                    teamNumber: getTeamNumberByCell(initData.players, initData.cells[y][x])
                                };
                            }
                        }
                        //@ts-ignore
                        currentGameState = gameState;
                        setGameState(currentGameState);
                        setNewMessage((prev) => {
                            return !prev;
                        });
                        break;
                    }
                }
            });
            gameClient?.subscribe(lobbySub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
                console.log(objectFromMessage);
                switch (objectFromMessage.type) {
                    case "GAME_ACTION_COMPLETED": {
                        setDirections(Array(0));
                        const newData = objectFromMessage as ActionResponseFinished;
                        const newCells = newData.changedCells.map((value) => {
                           return {
                               cellType: value.cellType,
                               coins: value.coinsNumber,
                               pirates: value.pirates.map((value) => {
                                   return {
                                       number: value,
                                       team: getTeamNumberByPirate(currentGameState, value)
                                   }
                               }),
                               position: value.position,
                               rotationId: value.rotationId,
                               teamNumber: getTeamNumberByCell(newData.players, value)
                           };
                        });

                        //@ts-ignore
                        currentGameState.currentPlayerId = newData.nextPlayerUserId;
                        //@ts-ignore
                        currentGameState.currentPlayerNumber = newData.nextPlayerUserNumber;
                        newCells.forEach((value) => {
                            //@ts-ignore
                            currentGameState.cells[value.position.y][value.position.x] = value;
                        });
                        setGameState(currentGameState);
                        setNewMessage((prev) => {
                            return !prev;
                        });
                        break;
                    }
                    case "DIRECTION_QUESTION": {
                        const newData = objectFromMessage as ActionResponseDirectionQuestion;
                        const newCells = newData.changedCells.map((value) => {
                            return {
                                cellType: value.cellType,
                                coins: value.coinsNumber,
                                pirates: value.pirates.map((value) => {
                                    return {
                                        number: value,
                                        team: getTeamNumberByPirate(currentGameState, value)
                                    }
                                }),
                                position: value.position,
                                rotationId: value.rotationId,
                                teamNumber: getTeamNumberByCell(newData.players, value)
                            };
                        });

                        //@ts-ignore
                        currentGameState.currentPlayerId = newData.nextPlayerUserId;
                        //@ts-ignore
                        currentGameState.currentPlayerNumber = newData.nextPlayerUserNumber;
                        newCells.forEach((value) => {
                            //@ts-ignore
                            currentGameState.cells[value.position.y][value.position.x] = value;
                        });
                        setGameState(currentGameState);
                        setDirections(newData.directions);
                        setNewMessage((prev) => {
                            return !prev;
                        });
                        break;
                    }
                }
            });
            initData().then(() => {
                setConnected(true);
                setNewMessage((prev) => {
                    return !prev;
                });
            });
        }, () => {
            console.log("Error to connect to game service");
        });
    };

    const disconnect = () => {
        gameClient?.disconnect(() => {
            setConnected(false)
        });

        gameSocket = null;
        setNewMessage((value) => {
            return !value;
        });
    }

    const doAction = async (pirate: number, needTakeCoin: boolean, x: number, y: number) => {
        send("action", {
            pirateNumber: pirate,
            needTakeCoin: needTakeCoin,
            x: x,
            y: y
        });
    };

    const initData = async () => {
        send("init-data", {});
    };

    const value = {
        isConnected,
        newMessage,
        gameState,
        localPlayer,
        directions,
        doAction
    };

    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>

}

export function useGameService() {
    return useContext(GameContext);
}