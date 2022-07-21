import {PlayerResponse} from "./PlayerResponse";
import {CellResponse} from "./CellResponse";
import {ActionResponseType} from "./ActionResponseType";

export type InitDataResponse = {
    type: ActionResponseType,
    nextPlayerUserId: number,
    nextPlayerUserNumber: number,
    players: Array<PlayerResponse>,
    cells: Array<Array<CellResponse>>
}