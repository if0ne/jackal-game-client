import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

import {useAuth} from "./useAuth";
import {LobbyMember} from "../components/models/LobbyMember";
import JwtDecode from "jwt-decode";

let gameSocket: WebSocket | null = null;
let gameClient: Stomp.Client | null = null;

export const GameContext = createContext<any>(null);

export const GameProvider = ({children}: {children: ReactNode}) => {

    const [isConnected, setConnected] = useState(false);
    const [newMessage, SetNewMessage] = useState(true);

    const { getAuthRequest, postAuthRequest } = useAuth();

    useEffect(() => {

    }, []);

    const send = (action: string, body: any) => {
        // @ts-ignore
        //gameClient?.send(`/lobby/${action}/${currentLobby.id}`, {}, JSON.stringify(body));
    };

    const connect = (userSub: string, lobbySub: string, token: string) => {
        gameSocket = new SockJS("http://localhost:8081/lobby-connect/");
        gameClient = Stomp.over(gameSocket);
        gameClient?.connect({
            Authorization: token
        }, () => {
            gameClient?.subscribe(userSub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
            });
            gameClient?.subscribe(lobbySub, (message) => {
                let objectFromMessage = JSON.parse(message.body);
            });
        }, () => {
            console.log("Error to connect to lobby");
        });
    };

    const disconnect = () => {
        gameClient?.disconnect(() => {
            setConnected(false)
        });

        gameSocket = null;
        SetNewMessage((value) => {
            return !value;
        });
    }



    const value = {
        isConnected,
        newMessage,
    };

    return <GameContext.Provider value={value}>
        {children}
    </GameContext.Provider>

}

export function useGameService() {
    return useContext(GameContext);
}