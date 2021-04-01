export class Match {
    playerIds: string[]

    constructor() {
        this.playerIds = []
    }

    addPlayer(id: string) {
        this.playerIds.push(id)
    }
}
