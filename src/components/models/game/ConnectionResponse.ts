import {ActionResponseType} from "./ActionResponseType";

export type ConnectionResponse = {
    type: ActionResponseType,
    playerId: number,
    message: string
}