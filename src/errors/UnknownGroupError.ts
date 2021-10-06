export default class UnknownGroupError extends Error {
    constructor(msg: string) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
    }
}