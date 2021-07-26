export default class ConversionError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}