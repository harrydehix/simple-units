export default class IllegalArgumentsError extends Error {
    constructor(msg: string) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
    }
}