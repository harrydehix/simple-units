export default class InvalidVariableSyntaxError extends Error {
    constructor(msg: string) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
    }
}