import { v4 as uuidv4 } from 'uuid'

import { CannotCompleteTurnError } from './exceptions'
import { ThrowResult, Throws } from './throws'
import { Turn } from './turn'

export enum GameState {
    INIT,
    IN_PROGRESS,
    COMPLETED,
}

const WINNING_SCORE = 4

class PlayerGame {
    constructor(public playerId: string) {}

    turns: Turn[] = []

    score: number = 0

    addCompleteTurn(turn: Turn) {
        this.turns.push(turn)
        this.score += turn.score
    }

    hasWon(): boolean {
        return this.score >= WINNING_SCORE
    }
}

export class Game {
    constructor(public number: number = 0, public id: string = uuidv4()) {}

    state: GameState = GameState.INIT

    startDate?: Date

    endDate?: Date

    players: PlayerGame[] = []

    nextTurns: Turn[] = []

    addPlayers(playerIds: string[]) {
        this.players.push(
            ...playerIds.map((playerId) => {
                return new PlayerGame(playerId)
            })
        )
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

    completeTurn(turnId: string, throws: Throws): GameState {
        if (this.state != GameState.IN_PROGRESS) {
            throw Error('Game is not in progress')
        }

        const { turn, player } = this.getCurrentTurn(turnId)

        const nextTurn = turn.complete(throws)

        player.addCompleteTurn(turn)

        this.nextTurns.push(nextTurn)

        if (player.hasWon()) {
            this.end()
        }

        this.advanceSkipTurns()

        return this.state
    }

    getCurrentTurn(turnId: string) {
        const turn = this.nextTurns.shift()

        if (turn === undefined) {
            throw new CannotCompleteTurnError('Game has no turns available')
        }

        if (turn.id != turnId) {
            throw new CannotCompleteTurnError(
                'ID of current turn does not match'
            )
        }

        const player = this.players.find(
            (player) => player.playerId == turn.playerId
        )

        if (player === undefined) {
            throw new CannotCompleteTurnError(
                `No player {turn.playerId} found for turn`
            )
        }

        return { turn, player }
    }

    advanceSkipTurns() {
        while (true) {
            const turn = this.nextTurns.shift()

            if (turn === undefined) {
                return
            }

            if (!turn.isSkip()) {
                this.nextTurns.unshift(turn)
                return
            }

            this.nextTurns.push(turn.complete())
        }
    }
}
