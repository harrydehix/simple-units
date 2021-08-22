export default class IllegalArgumentsError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}