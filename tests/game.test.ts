import { Game, GameState } from '../src/domain/game'

let game

beforeEach(() => {
    game = new Game()
})

test('new game', () => {
    const game = new Game()
    expect(game.number).toBe(0)
    expect(game.state).toBe(GameState.Initialized)
})

test('start game', () => {
    const game = new Game()

    game.addPlayers(['dmp'])
    expect(game.players.length).toBe(1)

    game.start()
    expect(game.state).toBe(GameState.InProgress)
})
