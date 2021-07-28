export default class ParseError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}