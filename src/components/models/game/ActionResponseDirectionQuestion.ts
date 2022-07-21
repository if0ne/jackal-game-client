import {PlayerResponse} from "./PlayerResponse";
import {CellResponse} from "./CellResponse";
import {Position} from "./Position";
import {ActionResponseType} from "./ActionResponseType";

export type ActionResponseDirectionQuestion = {
    type: ActionResponseType,
    nextPlayerUserId: number,
    nextPlayerUserNumber: number,
    players: Array<PlayerResponse>,
    changedCells: Array<CellResponse>,
    directions: Array<Position>,
}