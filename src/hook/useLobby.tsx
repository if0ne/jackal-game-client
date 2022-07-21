import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {useAuth} from "./useAuth";
import {WsLobby} from "../components/models/WsLobby";
import {LobbyMember} from "../components/models/LobbyMember";
import JwtDecode from "jwt-decode";
import {Button, Modal} from "react-bootstrap";

let lobbySocket: WebSocket | null = null;
let lobbyClient: Stomp.Client | null = null;
let currentLobby: WsLobby | null = null;

export const LobbyContext = createContext<any>(null);

export const LobbyProvider = ({children}: {children: ReactNode}) => {

    const [isConnected, setConnected] = useState(false);
    const [lobby, setLobby] = useState<WsLobby | null>(null);
    const [newMessage, setNewMessage] = useState(true);

    const { getAuthRequest, postAuthRequest } = useAuth();

    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        getAuthRequest("/api/lobby/connection-info")
            .then((response: any) => {
                if (response && response.data.responseStatus === "OK") {
                    connect(
                        //@ts-ignore
                        response.data.webSocketInfo.subscriptionUserUrl,
                        //@ts-ignore
                        response.data.webSocketInfo.subscriptionLobbyUrl,
                        //@ts-ignore
                        response.data.token
                    );
                }
            });

        return () => {
            disconnect();
        }
    }, []);

    const getMembersInfo = async (users: any, hostId: string) => {
        const members = new Map<string, LobbyMember>();

        for (let user of users) {
            // @ts-ignore
            let reqUser = await getAuthRequest(`/api/user/info?userId=${user.userId}`, {});
            members.set(user.userId, {
                name: reqUser.data.userName,
                pictureUrl: reqUser.data.userPictureUrl,
                isHost: user.userId === hostId,
                status: user.status
            });
        }

        return members;
    };

    const send = (action: string, body: any) => {
        // @ts-ignore
        lobbyClient?.send(`/lobby/${action}/${currentLobby.id}`, {}, JSON.stringify(body));
    };

    const connect = (userSub: string, lobbySub: string, token: string) => {
        lobbySocket = new SockJS(`${process.env.REACT_APP_LOBBY_SERVICE_URL}/lobby-connect/`);
        lobbyClient = Stomp.over(lobbySocket);
        lobbyClient?.connect({
            Authorization: token
        }, () => {
            // @ts-ignore
            const lobbyId = JwtDecode(token).lobby_id;

            currentLobby = {
                id: lobbyId,
                members: new Map()
            };

            lobbyClient?.subscribe(userSub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
                switch (objectFromMessage.type) {
                    case "CONNECTED_INFO_FOR_ONE": {
                        let rawUsers = objectFromMessage.usersInLobby;

                        getMembersInfo(rawUsers, objectFromMessage.hostId).then((members) => {
                            currentLobby = {
                                // @ts-ignore
                                id: currentLobby.id,
                                members: members,
                            };

                            setLobby(currentLobby);
                            setNewMessage((value) => {
                                return !value;
                            });
                        });
                        break;
                    }
                    case "LEAVED_INFO_FOR_ONE": {
                        disconnect();
                        break;
                    }
                    case "KICKED_INFO_FOR_ONE": {
                        disconnect();
                        break;
                    }
                    //TODO: Error Handling
                }
            });
            lobbyClient?.subscribe(lobbySub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
                switch (objectFromMessage.type) {
                    case "CONNECTED_INFO_FOR_ALL": {
                        getAuthRequest(`/api/user/info?userId=${objectFromMessage.connectedUserId}`, {}).then((value: any) => {
                            if (!currentLobby?.members.has(objectFromMessage.connectedUserId)) {
                                const member = {
                                    name: value.data.userName,
                                    pictureUrl: value.data.userPictureUrl,
                                    isHost: false,
                                    status: "NOT_READY"
                                };

                                currentLobby?.members.set(objectFromMessage.connectedUserId, member);
                                setLobby(currentLobby);
                                setNewMessage((value) => {
                                    return !value;
                                });
                            }
                        });
                        break;
                    }
                    case "LEAVED_INFO_FOR_ALL": {
                        const leavedUserId = objectFromMessage.leavedUserId;
                        const hostId = objectFromMessage.hostId;

                        // @ts-ignore
                        currentLobby.members.delete(leavedUserId);
                        // @ts-ignore
                        currentLobby.members.get(hostId).isHost = true;

                        setLobby(currentLobby);
                        setNewMessage((value) => {
                            return !value;
                        });
                        break;
                    }
                    case "CHANGED_STATE_INFO_FOR_ALL": {
                        const userId = objectFromMessage.lobbyMemberInfo.userId;
                        //@ts-ignore
                        currentLobby.members.get(userId).status = objectFromMessage.lobbyMemberInfo.status;

                        //@ts-ignore
                        setLobby(currentLobby);
                        setNewMessage((value) => {
                            return !value;
                        });
                        break;
                    }
                    case "KICKED_INFO_FOR_ALL": {
                        const kickedUserId = objectFromMessage.kickedUserId;
                        // @ts-ignore
                        currentLobby.members.delete(kickedUserId);

                        setLobby(currentLobby);
                        setNewMessage((value) => {
                            return !value;
                        });
                        break;
                    }
                    case "CHECK_CONNECTION_REQUEST": {
                        pongResponse().then(() => {});
                        break;
                    }
                    case "LOBBY_NOT_READY_INFO_FOR_ALL": {
                        const notConnectedIds = objectFromMessage.notConnectedUsersIds;
                        const usersInLobby = objectFromMessage.usersInLobby;
                        //@ts-ignore
                        const notConnectedNames = notConnectedIds.map((value) => currentLobby.members.get(value).name);
                        usersInLobby.forEach((value: any) => {
                            //@ts-ignore
                            currentLobby.members.get(value.userId).status = value.status;
                        });
                        setErrorMessage(`Ой-ой-ой некие шакалы не загрузились: [${notConnectedNames.join(", ")}]`);
                        setShowError(true);
                        setNewMessage((value) => {
                            return !value;
                        });
                        break;
                    }
                    //TODO: Error Handling
                }
            });

            initData().then(() => setConnected(true));
        }, () => {
            console.log("Error to connect to lobby");
        });
    };

    const disconnect = () => {
        lobbyClient?.disconnect(() => {
            setConnected(false)
        });

        lobbySocket = null;
        setLobby(null);
        setNewMessage((value) => {
            return !value;
        });
    }

    const createLobby = async (title: string, password: string) => {
        let response = await postAuthRequest("/api/lobby/create", {
            lobbyTitle: title,
            lobbyPassword: password.trim().length !== 0 ? password : null
        });

        if (response.data.responseStatus === "OK") {
            connect(
                response.data.webSocketInfo.subscriptionUserUrl,
                response.data.webSocketInfo.subscriptionGroupUrl,
                response.data.token
            );
        }
    }

    const joinLobby = async (name: string, password: string) => {
        let response = await postAuthRequest("/api/lobby/join", {
            lobbyTitle: name,
            lobbyPassword: password.trim().length !== 0 ? password : null
        });

        if (response.data.responseStatus === "OK") {
            connect(
                response.data.webSocketInfo.subscriptionUserUrl,
                response.data.webSocketInfo.subscriptionGroupUrl,
                response.data.token
            );
        }
    }

    const initData = async () => {
        send("connect", {});
    }

    const leaveLobby = async () => {
        send("leave", {});
    }

    const toggleReady = async () => {
        send("change-state", {});
    }

    const kickLobbyMember = async (userId: string) => {
        send("kick", {
            kickableUserId: userId
        });
    }

    const pongResponse = async () => {
        send("check-connection", {});
    }

    const startGame = async () => {

    }

    const value = {
        createLobby,
        joinLobby,
        leaveLobby,
        toggleReady,
        startGame,
        kickLobbyMember,

        lobby,
        isConnected,
        newMessage,
    };

    return <LobbyContext.Provider value={value}>
        <Modal show={showError} onHide={() => setShowError(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Ошибка</Modal.Title>
            </Modal.Header>
            <Modal.Body>{errorMessage}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowError(false)}>
                    Закрыть
                </Button>
            </Modal.Footer>
        </Modal>
        {children}
    </LobbyContext.Provider>

}

export function useLobby() {
    return useContext(LobbyContext);
}