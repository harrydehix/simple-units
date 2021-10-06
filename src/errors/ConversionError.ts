export default class ConversionError extends Error {
    constructor(msg: string) {
        super(msg);
        Error.captureStackTrace(this, this.constructor);
    }
}