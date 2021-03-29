class Match {
    players: string[]

    constructor() {
        this.players = []
    }

    addPlayer(name: string) {
        this.players.push(name)
    }
}

exports.Game = Game
