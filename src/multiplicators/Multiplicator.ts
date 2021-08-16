export default class Multiplicator {
    readonly short: string;
    readonly long: string;
    readonly value: number;

    constructor(short: string, long: string, multiplicator: number) {
        this.short = short;
        this.long = long;
        this.value = multiplicator;
    }
}