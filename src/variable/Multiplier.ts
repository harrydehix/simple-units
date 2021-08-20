export default class Multiplier {
    readonly short: string;
    readonly long: string;
    readonly value: number;

    constructor(short: string, long: string, Multiplier: number) {
        this.short = short;
        this.long = long;
        this.value = Multiplier;
    }
}