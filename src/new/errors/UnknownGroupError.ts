export default class UnknownGroupError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}