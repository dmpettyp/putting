import { v4 as uuidv4 } from 'uuid'

export class League {
    playerIds: string[]

    constructor(public name: string, public id: string = uuidv4()) {
        this.playerIds = []
    }

    addPlayer(id: string) {
        this.playerIds.push(id)
    }
}
