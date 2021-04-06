import { Throws, ThrowResult } from '../src/domain/throws'

test('default throws', () => {
    const throws = new Throws()
    expect(throws.makeCount()).toBe(0)
    expect(throws.isAllNone()).toBe(true)
})

test('1 make', () => {
    const throws = new Throws(ThrowResult.MAKE)
    expect(throws.makeCount()).toBe(1)
    expect(throws.isAllNone()).toBe(false)
})

test('2 make', () => {
    const throws = new Throws(
        ThrowResult.MAKE,
        ThrowResult.MISS,
        ThrowResult.MAKE
    )
    expect(throws.makeCount()).toBe(2)
    expect(throws.isAllNone()).toBe(false)
})

test('all makes', () => {
    const throws = new Throws(
        ThrowResult.MAKE,
        ThrowResult.MAKE,
        ThrowResult.MAKE,
        ThrowResult.MAKE
    )
    expect(throws.makeCount()).toBe(4)
    expect(throws.isAllNone()).toBe(false)
})
