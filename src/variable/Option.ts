export default class Option {
    readonly short: string;
    readonly long: string;
    readonly value: number;

    constructor(short: string, long: string, ratio: number) {
        this.short = short;
        this.long = long;
        this.value = ratio;
    }
}