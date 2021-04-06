import { Game, GameState } from '../src/domain/game'

let game

beforeEach(() => {
    game = new Game()
})

test('new game', () => {
    const game = new Game()
    expect(game.number).toBe(0)
    expect(game.state).toBe(GameState.INIT)
})
