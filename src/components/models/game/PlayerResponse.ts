import {CellResponse} from "./CellResponse";
import {PirateTeamResponse} from "./PirateTeamResponse";

export type PlayerResponse = {
    id: number,
    number: number,
    pirateTeam: PirateTeamResponse,
    ships: Array<CellResponse>
}