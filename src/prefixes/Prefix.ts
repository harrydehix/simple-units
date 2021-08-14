export default class Prefix {
    readonly short: string;
    readonly long: string;
    readonly multiplicator: number;

    constructor(short: string, long: string, multiplicator: number) {
        this.short = short;
        this.long = long;
        this.multiplicator = multiplicator;
    }
}