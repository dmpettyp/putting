export enum Level {
    SKIP,
    LEVEL1,
    LEVEL2,
    LEVEL3,
}

export enum ThrowResult {
    NONE,
    MISS,
    MAKE,
}

export enum GameState {
    INIT,
    IN_PROGRESS,
    COMPLETED,
}

export type Throws = [ThrowResult, ThrowResult, ThrowResult, ThrowResult]

class Turn {
    gameTurnNumber: number = 0

    throws: Throws = [
        ThrowResult.NONE,
        ThrowResult.NONE,
        ThrowResult.NONE,
        ThrowResult.NONE,
    ]

    score: number = 0

    constructor(
        public playerId: string,
        public round: number,
        public level: Level
    ) {}

    complete(throws: Throws): Turn {
        const makeCount = throws.reduce((total, throwResult) => {
            return total + (throwResult == ThrowResult.MAKE ? 1 : 0)
        })

        const [nextLevel, score] = this.nextLevelAndScore(makeCount)

        this.throws = throws
        this.score = score

        return new Turn(this.playerId, this.round + 1, nextLevel)
    }

    nextLevelAndScore(makeCount: number): [Level, number] {
        if (this.level == Level.SKIP) {
            return [Level.LEVEL1, 0]
        } else if (this.level == Level.LEVEL1) {
            if (makeCount < 3) {
                return [Level.SKIP, 0]
            } else if (makeCount == 3) {
                return [Level.LEVEL1, 0]
            } else {
                return [Level.LEVEL2, 0]
            }
        } else if (this.level == Level.LEVEL2) {
            if (makeCount < 2) {
                return [Level.LEVEL1, 0]
            } else if (makeCount == 2) {
                return [Level.LEVEL2, 0]
            } else {
                return [Level.LEVEL3, 0]
            }
        } else if (this.level == Level.LEVEL3) {
            if (makeCount < 1) {
                return [Level.LEVEL2, 0]
            } else {
                return [Level.LEVEL3, makeCount]
            }
        }

        return [Level.SKIP, 0]
    }
}

class PlayerGame {
    turns: Turn[] = []

    score: number = 0

    constructor(public playerId: string) {}
}

export class Game {
    state: GameState = GameState.INIT

    number: number = 1

    startDate?: Date

    endDate?: Date

    players: PlayerGame[] = []

    nextTurns: Turn[] = []

    constructor(playerIds: string[], number?: number) {
        this.players = playerIds.map((playerId) => {
            return new PlayerGame(playerId)
        })
    }

    start() {
        this.startDate = new Date()

        this.state = GameState.IN_PROGRESS

        let turnNumber = 0

        this.nextTurns = this.players.map((player) => {
            turnNumber++
            return new Turn(player.playerId, 1, Level.LEVEL1)
        })
    }

    end() {
        this.endDate = new Date()
        this.nextTurns = []
        this.state = GameState.COMPLETED
    }

    completeTurn(throws: Throws): GameState {
        if (this.state != GameState.IN_PROGRESS) {
            throw Error('Game is not in progress')
        }

        const turn = this.nextTurns.shift()

        if (turn === undefined) {
            throw Error('No turns available')
        }

        const player = this.players.find(
            (player) => player.playerId == turn.playerId
        )

        if (player === undefined) {
            throw Error(`No player {turn.playerId} found for turn`)
        }

        const nextTurn = turn.complete(throws)

        this.nextTurns.push(nextTurn)

        player.turns.push(turn)

        player.score += turn.score

        if (player.score >= 4) {
            this.end()
        }

        return this.state
    }
}
