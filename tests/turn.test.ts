import { Turn, Level } from '../src/domain/turn'
import { Throws, ThrowResult } from '../src/domain/throws'

const noMakes = new Throws(
    ThrowResult.MISS,
    ThrowResult.MISS,
    ThrowResult.MISS,
    ThrowResult.MISS
)

const oneMake = new Throws(
    ThrowResult.MAKE,
    ThrowResult.MISS,
    ThrowResult.MISS,
    ThrowResult.MISS
)

const twoMakes = new Throws(
    ThrowResult.MAKE,
    ThrowResult.MAKE,
    ThrowResult.MISS,
    ThrowResult.MISS
)

const threeMakes = new Throws(
    ThrowResult.MAKE,
    ThrowResult.MAKE,
    ThrowResult.MAKE,
    ThrowResult.MISS
)

const allMakes = new Throws(
    ThrowResult.MAKE,
    ThrowResult.MAKE,
    ThrowResult.MAKE,
    ThrowResult.MAKE
)

const playerId = 'dmp'

test('initial turn', () => {
    const turn = new Turn(playerId)
    expect(turn.level).toBe(Level.LEVEL1)
})

describe('skip level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.SKIP)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no throws', () => {
        nextTurn = turn.complete()
        expect(nextTurn.level).toBe(Level.LEVEL1)
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
        turn = new Turn(playerId, 1, Level.LEVEL1)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no makes', () => {
        nextTurn = turn.complete(noMakes)
        expect(nextTurn.level).toBe(Level.SKIP)
        expect(turn.score).toBe(0)
    })

    test('one make', () => {
        nextTurn = turn.complete(oneMake)
        expect(nextTurn.level).toBe(Level.SKIP)
        expect(turn.score).toBe(0)
    })

    test('two makes', () => {
        nextTurn = turn.complete(twoMakes)
        expect(nextTurn.level).toBe(Level.SKIP)
        expect(turn.score).toBe(0)
    })

    test('three makes', () => {
        nextTurn = turn.complete(threeMakes)
        expect(nextTurn.level).toBe(Level.LEVEL1)
        expect(turn.score).toBe(0)
    })

    test('four makes', () => {
        nextTurn = turn.complete(allMakes)
        expect(nextTurn.level).toBe(Level.LEVEL2)
        expect(turn.score).toBe(0)
    })
})

describe('second level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.LEVEL2)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no makes', () => {
        nextTurn = turn.complete(noMakes)
        expect(nextTurn.level).toBe(Level.LEVEL1)
        expect(turn.score).toBe(0)
    })

    test('one make', () => {
        nextTurn = turn.complete(oneMake)
        expect(nextTurn.level).toBe(Level.LEVEL1)
        expect(turn.score).toBe(0)
    })

    test('two makes', () => {
        nextTurn = turn.complete(twoMakes)
        expect(nextTurn.level).toBe(Level.LEVEL2)
        expect(turn.score).toBe(0)
    })

    test('three makes', () => {
        nextTurn = turn.complete(threeMakes)
        expect(nextTurn.level).toBe(Level.LEVEL3)
        expect(turn.score).toBe(0)
    })

    test('four makes', () => {
        nextTurn = turn.complete(allMakes)
        expect(nextTurn.level).toBe(Level.LEVEL3)
        expect(turn.score).toBe(0)
    })
})

describe('third level', () => {
    let turn: Turn
    let nextTurn: Turn

    beforeEach(() => {
        turn = new Turn(playerId, 1, Level.LEVEL3)
    })

    afterEach(() => {
        expect(nextTurn.playerId).toBe(playerId)
        expect(nextTurn.round).toBe(turn.round + 1)
    })

    test('no makes', () => {
        nextTurn = turn.complete(noMakes)
        expect(nextTurn.level).toBe(Level.LEVEL2)
        expect(turn.score).toBe(0)
    })

    test('one make', () => {
        nextTurn = turn.complete(oneMake)
        expect(nextTurn.level).toBe(Level.LEVEL3)
        expect(turn.score).toBe(1)
    })

    test('two makes', () => {
        nextTurn = turn.complete(twoMakes)
        expect(nextTurn.level).toBe(Level.LEVEL3)
        expect(turn.score).toBe(2)
    })

    test('three makes', () => {
        nextTurn = turn.complete(threeMakes)
        expect(nextTurn.level).toBe(Level.LEVEL3)
        expect(turn.score).toBe(3)
    })

    test('four makes', () => {
        nextTurn = turn.complete(allMakes)
        expect(nextTurn.level).toBe(Level.LEVEL3)
        expect(turn.score).toBe(4)
    })
})
