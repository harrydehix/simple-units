export default class UnknownUnitError extends Error {
    constructor(msg: string) {
        super(msg);
    }
}