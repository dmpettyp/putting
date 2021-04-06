import { ThrowResult, Throws } from './throws'

export enum Level {
    SKIP,
    LEVEL1,
    LEVEL2,
    LEVEL3,
}

class CannotCompleteTurnError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, CannotCompleteTurnError.prototype)
    }
}

export class Turn {
    gameTurnNumber: number = 0

    throws: Throws = new Throws()

    score: number = 0

    constructor(
        public playerId: string,
        public round: number = 1,
        public level: Level = Level.LEVEL1
    ) {}

    complete(throws: Throws = new Throws()): Turn {
        let nextLevel: Level = Level.LEVEL1

        if (this.level == Level.SKIP) {
            if (!throws.isAllNone()) {
                throw new CannotCompleteTurnError(
                    'SKIP level turn may not have makes or misses'
                )
            }
        } else {
            ;[nextLevel, this.score] = this.nextLevelAndScore(
                throws.makeCount()
            )
        }

        this.throws = throws

        return new Turn(this.playerId, this.round + 1, nextLevel)
    }

    nextLevelAndScore(makeCount: number): [Level, number] {
        if (this.level == Level.SKIP) {
            return [Level.LEVEL1, 0]
        } else if (this.level == Level.LEVEL1) {
            if (makeCount < 3) {
                return [Level.SKIP, 0]
            } else if (makeCount == 3) {
                return [Level.LEVEL1, 0]
            } else {
                return [Level.LEVEL2, 0]
            }
        } else if (this.level == Level.LEVEL2) {
            if (makeCount < 2) {
                return [Level.LEVEL1, 0]
            } else if (makeCount == 2) {
                return [Level.LEVEL2, 0]
            } else {
                return [Level.LEVEL3, 0]
            }
        } else if (this.level == Level.LEVEL3) {
            if (makeCount < 1) {
                return [Level.LEVEL2, 0]
            } else {
                return [Level.LEVEL3, makeCount]
            }
        }

        return [Level.SKIP, 0]
    }
}
