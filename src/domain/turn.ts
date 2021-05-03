import { v4 as uuidv4 } from 'uuid'

import { Throw, Throws } from './throws'

import { CannotCompleteTurnError } from './exceptions'

export enum Level {
    Skip = 'SKIP',
    Level1 = '1',
    Level2 = '2',
    Level3 = '3',
}

function nextLevelAndScore(level: Level, makeCount: number) {
    if (level == Level.Skip) {
        return { nextLevel: Level.Level1, score: 0 }
    } else if (level == Level.Level1) {
        if (makeCount < 3) {
            return { nextLevel: Level.Skip, score: 0 }
        } else if (makeCount == 3) {
            return { nextLevel: Level.Level1, score: 0 }
        } else {
            return { nextLevel: Level.Level2, score: 0 }
        }
    } else if (level == Level.Level2) {
        if (makeCount < 2) {
            return { nextLevel: Level.Level1, score: 0 }
        } else if (makeCount == 2) {
            return { nextLevel: Level.Level2, score: 0 }
        } else {
            return { nextLevel: Level.Level3, score: 0 }
        }
    } else if (level == Level.Level3) {
        if (makeCount < 1) {
            return { nextLevel: Level.Level2, score: 0 }
        } else {
            return { nextLevel: Level.Level3, score: makeCount }
        }
    }

    return { nextLevel: Level.Skip, score: 0 }
}

export class Turn {
    constructor(
        public playerId: string,
        public round: number = 1,
        public level: Level = Level.Level1,
        public id: string = uuidv4()
    ) {}

    score: number = 0

    throw1: Throw = Throw.Pending

    throw2: Throw = Throw.Pending

    throw3: Throw = Throw.Pending

    throw4: Throw = Throw.Pending

    complete(throws: Throws = new Throws()): Turn {
        if (this.level == Level.Skip) {
            if (!throws.isAll(Throw.None)) {
                throw new CannotCompleteTurnError(
                    'Skip level turn may not have makes or misses'
                )
            }

            return new Turn(this.playerId, this.round + 1, Level.Level1)
        }

        const { nextLevel, score } = nextLevelAndScore(
            this.level,
            throws.count(Throw.Make)
        )

        this.throw1 = throws.throw1

        this.throw2 = throws.throw2

        this.throw3 = throws.throw3

        this.throw4 = throws.throw4

        this.score = score

        return new Turn(this.playerId, this.round + 1, nextLevel)
    }

    isSkip() {
        return this.level == Level.Skip
    }
}
