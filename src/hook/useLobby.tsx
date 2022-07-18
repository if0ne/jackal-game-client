import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {useAuth} from "./useAuth";
import {Lobby} from "../components/models/Lobby";
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
    }, []);

    const send = (action: string, body: any) => {
        if (lobbyClient?.connected) {
            // @ts-ignore
            lobbyClient?.send(`/lobby/${action}/${currentLobby.id}`, {}, body);
        }
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
            setLobby(currentLobby);

            lobbyClient?.subscribe(userSub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
                console.log(objectFromMessage);
                switch (objectFromMessage.type) {
                    case "CONNECTED_INFO_FOR_ONE": {
                        let rawUsers = objectFromMessage.usersInLobby;

                        Promise.all(rawUsers.map(async (value: any) => {
                            let user = await getAuthRequest(`/api/user/info?userId=${value.userId}`, {});

                            return {
                                id: value.userId,
                                name: user.userName,
                                pictureUrl: user.userPictureUrl,
                                isHost: value.userId === objectFromMessage.hostId,
                                status: value.status,
                            };
                        })).then((values) => {
                            const members = new Map<string, LobbyMember>();

                            for (let value of values) {
                                members.set(value.id, {
                                    name: value.name,
                                    pictureUrl: value.pictureUrl,
                                    isHost: value.isHost,
                                    status: value.status,
                                });
                            }

                            currentLobby = {
                                // @ts-ignore
                                id: currentLobby.id,
                                members: members,
                            };

                            console.log(currentLobby);
                            setLobby(currentLobby);
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
                console.log(objectFromMessage);
                switch (objectFromMessage.type) {
                    case "CONNECTED_INFO_FOR_ALL": {
                        getAuthRequest(`/api/user/info?userId=${objectFromMessage.connectedUserId}`, {}).then((value: any) => {
                            const member = value.data;
                            currentLobby?.members.set(objectFromMessage.connectedUserId, member);
                            setLobby(currentLobby);
                        });
                        break;
                    }
                    case "LEAVED_INFO_FOR_ALL": {
                        const leavedUserId = objectFromMessage.leavedUserId;
                        const hostId = objectFromMessage.hostId;

                        // @ts-ignore
                        currentLobby.members.delete(leavedUserId);
                        // @ts-ignore
                        currentLobby.members[hostId].isHost = true;

                        setLobby(currentLobby);

                        break;
                    }
                    case "CHANGED_STATE_INFO_FOR_ALL": {
                        const userId = objectFromMessage.lobbyMemberInfo.userId;
                        const status = objectFromMessage.lobbyMemberInfo.status;

                        //@ts-ignore
                        currentLobby.members[userId].status = status;
                        break;
                    }
                    case "KICKED_INFO_FOR_ALL": {
                        const kickedUserId = objectFromMessage.kickedUserId;
                        // @ts-ignore
                        currentLobby.members.delete(kickedUserId);
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

        currentLobby = null;
        setLobby(null);
    }

    const createLobby = async (title: string, password: string) => {
        let response = await postAuthRequest("/api/lobby/create", {
            lobbyTitle: title,
            lobbyPassword: password
        });

        console.log(response.data);
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
            lobbyPassword: password
        });

        console.log(response.data);
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
        send("leaving", {});
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
    };

    return <LobbyContext.Provider value={value}>
        {children}
    </LobbyContext.Provider>

}

export function useLobby() {
    return useContext(LobbyContext);
}