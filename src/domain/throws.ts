export enum ThrowResult {
    NONE,
    MISS,
    MAKE,
}

export class Throws {
    constructor(
        public throw1: ThrowResult = ThrowResult.NONE,
        public throw2: ThrowResult = ThrowResult.NONE,
        public throw3: ThrowResult = ThrowResult.NONE,
        public throw4: ThrowResult = ThrowResult.NONE
    ) {}

    throwsCount(resultType: ThrowResult): number {
        const reducer = (total: number, result: ThrowResult) =>
            total + (result == resultType ? 1 : 0)

        return [this.throw1, this.throw2, this.throw3, this.throw4].reduce(
            reducer,
            0
        )
    }

    makeCount(): number {
        return this.throwsCount(ThrowResult.MAKE)
    }

    isAllNone(): boolean {
        return this.throwsCount(ThrowResult.NONE) == 4
    }
}
