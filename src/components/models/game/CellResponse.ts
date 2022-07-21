import {Position} from "./Position";
import {CellType} from "./CellType";

export type CellResponse = {
    cellType: CellType,
    position: Position,
    rotationId: number,
    pirates: Array<number>,
    coinsNumber: number
}