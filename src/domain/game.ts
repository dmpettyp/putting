import { ThrowResult, Throws } from './throws'
import { Turn } from './turn'

export enum GameState {
    INIT,
    IN_PROGRESS,
    COMPLETED,
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
            return new Turn(player.playerId)
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
