import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {useAuth} from "./useAuth";
import {WsLobby} from "../components/models/WsLobby";
import {LobbyMember} from "../components/models/LobbyMember";
import JwtDecode from "jwt-decode";

let lobbySocket: WebSocket | null = null;
let lobbyClient: Stomp.Client | null = null;
let currentLobby: WsLobby | null = null;

export const LobbyContext = createContext<any>(null);

export const LobbyProvider = ({children}: {children: ReactNode}) => {

    const [isConnected, setConnected] = useState(false);
    const [lobby, setLobby] = useState<WsLobby | null>(null);
    const [newMessage, SetNewMessage] = useState(true);

    const { getAuthRequest, postAuthRequest } = useAuth();

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
        lobbySocket = new SockJS("http://localhost:8081/lobby-connect/");
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
                            SetNewMessage((value) => {
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
                                SetNewMessage((value) => {
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
                        SetNewMessage((value) => {
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
                        SetNewMessage((value) => {
                            return !value;
                        });
                        break;
                    }
                    case "KICKED_INFO_FOR_ALL": {
                        const kickedUserId = objectFromMessage.kickedUserId;
                        // @ts-ignore
                        currentLobby.members.delete(kickedUserId);

                        setLobby(currentLobby);
                        SetNewMessage((value) => {
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
        SetNewMessage((value) => {
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
                response.data.webSocketInfo.subscriptionLobbyUrl,
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
                response.data.webSocketInfo.subscriptionLobbyUrl,
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
        {children}
    </LobbyContext.Provider>

}

export function useLobby() {
    return useContext(LobbyContext);
}