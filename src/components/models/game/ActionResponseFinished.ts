import {ActionResponseType} from "./ActionResponseType";
import {PlayerResponse} from "./PlayerResponse";
import {CellResponse} from "./CellResponse";

export type ActionResponseFinished = {
    type: ActionResponseType,
    nextPlayerUserId: number,
    nextPlayerUserNumber: number,
    players: Array<PlayerResponse>,
    changedCells: Array<CellResponse>,
}