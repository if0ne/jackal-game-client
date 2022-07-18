export type GameMode = {
    id: number,
    title: string,
    maxPlayerNumber: number,
    game: {
        id: number,
        title: string,
        serviceAddress: string,
        clientAddress: string,
    }
};