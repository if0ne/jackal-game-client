import {LobbyMember} from "./LobbyMember";

export type WsLobby = {
    id: number,
    members: Map<string, LobbyMember>,
};