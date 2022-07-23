export type GameState = {
    currentPlayerId: string,
    currentPlayerNumber: number,
    players: Array<{
        id: string,
        number: number,
        name: string,
        picture: string,
        coins: number,
        pirates: Array<number>
    }>,
    cells: Array<Array<{
        cellType: string,
        coins: number,
        pirates: Array<{
            number: number,
            team: number
        }>,
        position: {
            x: number,
            y: number
        },
        rotationId: number,
        teamNumber: number,
    }>>,
};

export type OwnPlayerData = {
    playerNumber: number,
    pirates: Array<number>
}