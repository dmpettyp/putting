export class CannotCompleteTurnError extends Error {
    constructor(message: string) {
        super(message)
        Object.setPrototypeOf(this, CannotCompleteTurnError.prototype)
    }
}
