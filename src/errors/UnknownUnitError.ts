export default class UnknownUnitError extends Error {
    constructor(msg: string) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
    }
}