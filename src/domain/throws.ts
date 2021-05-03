export enum Throw {
    Pending = 'PENDING',
    None = 'NONE',
    Miss = 'MISS',
    Make = 'MAKE',
}

export class Throws {
    constructor(
        public throw1: Throw = Throw.None,
        public throw2: Throw = Throw.None,
        public throw3: Throw = Throw.None,
        public throw4: Throw = Throw.None
    ) {}

    count(resultType: Throw): number {
        const reducer = (total: number, result: Throw) =>
            total + (result == resultType ? 1 : 0)

        return [this.throw1, this.throw2, this.throw3, this.throw4].reduce(
            reducer,
            0
        )
    }

    isAll(resultType: Throw): boolean {
        return this.count(resultType) == 4
    }
}
