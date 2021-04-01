import { v4 as uuidv4 } from 'uuid'

export class User {
    id: string = uuidv4()
    username: string

    constructor(username: string, id: string = uuidv4()) {
        this.id = id
        this.username = username
    }
}
