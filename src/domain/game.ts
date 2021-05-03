import { v4 as uuidv4 } from 'uuid'

import { CannotCompleteTurnError } from './exceptions'
import { Throw, Throws } from './throws'
import { Turn } from './turn'
import { PlayerGame } from './playerGame'

export enum GameState {
    Initialized = 'INIT',
    InProgress = 'IN_PROGRESS',
    Completed = 'COMPLETED',
}

type TurnCompleted = {
    state: GameState
    nextTurns: Turn[]
}

export class Game {
    constructor(public number: number = 0, public id: string = uuidv4()) {}

    state: GameState = GameState.Initialized

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

    start(): Turn[] {
        this.startDate = new Date()

        this.state = GameState.InProgress

        let turnNumber = 0

        this.nextTurns = this.players.map((player) => {
            turnNumber++
            return new Turn(player.playerId)
        })

        return this.nextTurns
    }

    end() {
        this.endDate = new Date()
        this.nextTurns = []
        this.state = GameState.Completed
    }

    completeTurn(turnId: string, throws: Throws): TurnCompleted {
        if (this.state != GameState.InProgress) {
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

        return {
            state: this.state,
            nextTurns: this.nextTurns,
        }
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
