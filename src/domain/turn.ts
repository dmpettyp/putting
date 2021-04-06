import { v4 as uuidv4 } from 'uuid'

import { ThrowResult, Throws } from './throws'

import { CannotCompleteTurnError } from './exceptions'

export enum Level {
    SKIP,
    LEVEL1,
    LEVEL2,
    LEVEL3,
}

function nextLevelAndScore(level: Level, makeCount: number) {
    if (level == Level.SKIP) {
        return { nextLevel: Level.LEVEL1, score: 0 }
    } else if (level == Level.LEVEL1) {
        if (makeCount < 3) {
            return { nextLevel: Level.SKIP, score: 0 }
        } else if (makeCount == 3) {
            return { nextLevel: Level.LEVEL1, score: 0 }
        } else {
            return { nextLevel: Level.LEVEL2, score: 0 }
        }
    } else if (level == Level.LEVEL2) {
        if (makeCount < 2) {
            return { nextLevel: Level.LEVEL1, score: 0 }
        } else if (makeCount == 2) {
            return { nextLevel: Level.LEVEL2, score: 0 }
        } else {
            return { nextLevel: Level.LEVEL3, score: 0 }
        }
    } else if (level == Level.LEVEL3) {
        if (makeCount < 1) {
            return { nextLevel: Level.LEVEL2, score: 0 }
        } else {
            return { nextLevel: Level.LEVEL3, score: makeCount }
        }
    }

    return { nextLevel: Level.SKIP, score: 0 }
}

export class Turn {
    throws: Throws = new Throws()

    score: number = 0

    constructor(
        public playerId: string,
        public round: number = 1,
        public level: Level = Level.LEVEL1,
        public id: string = uuidv4()
    ) {}

    complete(throws: Throws = new Throws()): Turn {
        if (this.level == Level.SKIP) {
            if (!throws.isAllNone()) {
                throw new CannotCompleteTurnError(
                    'SKIP level turn may not have makes or misses'
                )
            }

            return new Turn(this.playerId, this.round + 1, Level.LEVEL1)
        }

        const { nextLevel, score } = nextLevelAndScore(
            this.level,
            throws.makeCount()
        )

        this.throws = throws
        this.score = score

        return new Turn(this.playerId, this.round + 1, nextLevel)
    }

    isSkip() {
        return this.level == Level.SKIP
    }
}
