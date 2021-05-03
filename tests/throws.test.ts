import { Throws, Throw } from '../src/domain/throws'

test('default throws', () => {
    const throws = new Throws()
    expect(throws.count(Throw.Make)).toBe(0)
    expect(throws.isAll(Throw.None)).toBe(true)
})

test('1 make', () => {
    const throws = new Throws(Throw.Make)
    expect(throws.count(Throw.Make)).toBe(1)
    expect(throws.isAll(Throw.None)).toBe(false)
})

test('2 make', () => {
    const throws = new Throws(Throw.Make, Throw.Miss, Throw.Make)
    expect(throws.count(Throw.Make)).toBe(2)
    expect(throws.isAll(Throw.None)).toBe(false)
})

test('all makes', () => {
    const throws = new Throws(Throw.Make, Throw.Make, Throw.Make, Throw.Make)
    expect(throws.count(Throw.Make)).toBe(4)
    expect(throws.isAll(Throw.None)).toBe(false)
})
