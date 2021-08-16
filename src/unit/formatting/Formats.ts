import { type } from "os";

export type Format = {
    sg: string[],
    pl: string[],
} | string[];

export default class Formats {
    short: Format;
    long?: Format;

    constructor(
        short: Format,
        long?: Format) {
        this.short = short;
        this.long = long;
    }

    default(): string {
        if (this.short instanceof Array) return this.short[0];
        else {
            if (this.short.pl instanceof Array) return this.short.pl[0];
            else return this.short.pl;
        }
    }

    shortPlural(): string {
        return this.default();
    }

    shortSingular(): string {
        if (this.short instanceof Array) return this.short[0];
        else {
            if (this.short.sg instanceof Array) return this.short.sg[0];
            else return this.short.sg;
        }
    }

    longPlural(): string {
        if (!this.long) return this.shortPlural();
        else if (this.long instanceof Array) return this.long[0];
        else {
            if (this.long.pl instanceof Array) return this.long.pl[0];
            else return this.long.pl;
        }
    }

    longSingular(): string {
        if (!this.long) return this.shortSingular();
        else if (this.long instanceof Array) return this.long[0];
        else {
            if (this.long.sg instanceof Array) return this.long.sg[0];
            else return this.long.sg;
        }
    }

    shorts(): string[] {
        if (this.short instanceof Array) return this.short;
        return this.short.sg.concat(this.short.pl);
    }

    longs(): string[] {
        if (!this.long) return this.shorts();
        if (this.long instanceof Array) return this.long;
        return this.long.sg.concat(this.long.pl);
    }
}