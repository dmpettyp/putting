import { Turn, Level } from '../src/domain/turn'
import { Throws, Throw } from '../src/domain/throws'

const noMakes = new Throws(Throw.Miss, Throw.Miss, Throw.Miss, Throw.Miss)

const oneMake = new Throws(Throw.Make, Throw.Miss, Throw.Miss, Throw.Miss)

const twoMakes = new Throws(Throw.Make, Throw.Make, Throw.Miss, Throw.Miss)

const threeMakes = new Throws(Throw.Make, Throw.Make, Throw.Make, Throw.Miss)

const allMakes = new Throws(Throw.Make, Throw.Make, Throw.Make, Throw.Make)

const playerId = 'dmp'

test('initial turn', () => {
    const turn = new Turn(playerId)
    expect(turn.level).toBe(Level.Level1)
})

describe('skip level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.Skip)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no throws', () => {
        nextTurn = turn.complete()
        expect(nextTurn.level).toBe(Level.Level1)
        expect(turn.score).toBe(0)
    })

    test('skip with throws', () => {
        expect(() => {
            turn.complete(allMakes)
        }).toThrow()
    })
})

describe('first level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.Level1)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no makes', () => {
        nextTurn = turn.complete(noMakes)
        expect(nextTurn.level).toBe(Level.Skip)
        expect(turn.score).toBe(0)
    })

    test('one make', () => {
        nextTurn = turn.complete(oneMake)
        expect(nextTurn.level).toBe(Level.Skip)
        expect(turn.score).toBe(0)
    })

    test('two makes', () => {
        nextTurn = turn.complete(twoMakes)
        expect(nextTurn.level).toBe(Level.Skip)
        expect(turn.score).toBe(0)
    })

    test('three makes', () => {
        nextTurn = turn.complete(threeMakes)
        expect(nextTurn.level).toBe(Level.Level1)
        expect(turn.score).toBe(0)
    })

    test('four makes', () => {
        nextTurn = turn.complete(allMakes)
        expect(nextTurn.level).toBe(Level.Level2)
        expect(turn.score).toBe(0)
    })
})

describe('second level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.Level2)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no makes', () => {
        nextTurn = turn.complete(noMakes)
        expect(nextTurn.level).toBe(Level.Level1)
        expect(turn.score).toBe(0)
    })

    test('one make', () => {
        nextTurn = turn.complete(oneMake)
        expect(nextTurn.level).toBe(Level.Level1)
        expect(turn.score).toBe(0)
    })

    test('two makes', () => {
        nextTurn = turn.complete(twoMakes)
        expect(nextTurn.level).toBe(Level.Level2)
        expect(turn.score).toBe(0)
    })

    test('three makes', () => {
        nextTurn = turn.complete(threeMakes)
        expect(nextTurn.level).toBe(Level.Level3)
        expect(turn.score).toBe(0)
    })

    test('four makes', () => {
        nextTurn = turn.complete(allMakes)
        expect(nextTurn.level).toBe(Level.Level3)
        expect(turn.score).toBe(0)
    })
})

describe('third level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.Level3)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no makes', () => {
        nextTurn = turn.complete(noMakes)
        expect(nextTurn.level).toBe(Level.Level2)
        expect(turn.score).toBe(0)
    })

    test('one make', () => {
        nextTurn = turn.complete(oneMake)
        expect(nextTurn.level).toBe(Level.Level3)
        expect(turn.score).toBe(1)
    })

    test('two makes', () => {
        nextTurn = turn.complete(twoMakes)
        expect(nextTurn.level).toBe(Level.Level3)
        expect(turn.score).toBe(2)
    })

    test('three makes', () => {
        nextTurn = turn.complete(threeMakes)
        expect(nextTurn.level).toBe(Level.Level3)
        expect(turn.score).toBe(3)
    })

    test('four makes', () => {
        nextTurn = turn.complete(allMakes)
        expect(nextTurn.level).toBe(Level.Level3)
        expect(turn.score).toBe(4)
    })
})
