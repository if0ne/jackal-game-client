import {GameMode} from "./GameMode";
import {LobbyMember} from "./LobbyMember";

export type Lobby = {
    title: string,
    isPublic: boolean,
    members: Array<LobbyMember>,
    gameMode: GameMode,
};