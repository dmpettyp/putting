import { Game, GameState } from '../src/domain/game'

let game

beforeEach(() => {
    game = new Game(['dmp'])
})

test('new game', () => {
    const game = new Game(['dmp'])
    expect(game.number).toBe(1)
    expect(game.state).toBe(GameState.INIT)
})

test('foo game', () => {
    const game = new Game(['dmp'])
    expect(game.number).toBe(1)
    expect(game.state).toBe(GameState.INIT)
})
