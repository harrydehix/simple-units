export default class ConverterGenerator {
    /**
     * Generates a converter function that is able to convert a value from a prefixed unit to another prefix of the same unit (e.g. from "mm" to "cm").
     * @param from
     * @param to 
     * @returns 
     */
    public static fromPreToPre(from: Prefix, to: Prefix) {
        const factor = this.factor(from, to);
        return (val: number) => val * factor;
    }


    /**
     * Generates a converter function that is able to convert a value from a prefixed unit to
     * any other unit. The prefix gets removed automatically and after that `convert()` is called.
     * @param pre 
     * @param convert 
     * @returns 
     */
    public static fromPreToOther(pre: Prefix, convert: (val: number) => number) {
        const factor = this.factor(pre, Prefix.none);
        return (val: number) => {
            const withoutPrefix = val * factor;
            return convert(withoutPrefix);
        };
    }

    /**
     * Generates a converter function that is able to convert a value from any unit to
     * any other prefixed unit. First `convert()` is called, then the prefix is added.
     * @param pre 
     * @param convert 
     * @returns 
     */
    public static fromOtherToPre(pre: Prefix, convert: (val: number) => number) {
        const factor = this.factor(Prefix.none, pre);
        return (val: number) => {
            const converted = convert(val);
            return converted * factor;
        };
    }

    private static factor(from: Prefix, to: Prefix) {
        return Math.pow(10, from - to);
    }

    /**
     * Generates all converters to the other prefixes from the specified prefix.
     * @param pre
     * @param unit 
     * @returns 
     */
    public static fromPreToAllPre(pre: Prefix, unit: string) {
        const converters = [
            { to: "Y" + unit, convert: this.fromPreToPre(pre, Prefix.Y) },
            { to: "Z" + unit, convert: this.fromPreToPre(pre, Prefix.Z) },
            { to: "E" + unit, convert: this.fromPreToPre(pre, Prefix.E) },
            { to: "P" + unit, convert: this.fromPreToPre(pre, Prefix.P) },
            { to: "T" + unit, convert: this.fromPreToPre(pre, Prefix.T) },
            { to: "G" + unit, convert: this.fromPreToPre(pre, Prefix.G) },
            { to: "M" + unit, convert: this.fromPreToPre(pre, Prefix.M) },
            { to: "k" + unit, convert: this.fromPreToPre(pre, Prefix.k) },
            { to: "h" + unit, convert: this.fromPreToPre(pre, Prefix.h) },
            { to: "da" + unit, convert: this.fromPreToPre(pre, Prefix.da) },
            { to: unit, convert: this.fromPreToPre(pre, Prefix.none) },
            { to: "d" + unit, convert: this.fromPreToPre(pre, Prefix.d) },
            { to: "c" + unit, convert: this.fromPreToPre(pre, Prefix.c) },
            { to: "m" + unit, convert: this.fromPreToPre(pre, Prefix.m) },
            { to: "μ" + unit, convert: this.fromPreToPre(pre, Prefix.μ) },
            { to: "n" + unit, convert: this.fromPreToPre(pre, Prefix.n) },
            { to: "p" + unit, convert: this.fromPreToPre(pre, Prefix.p) },
            { to: "f" + unit, convert: this.fromPreToPre(pre, Prefix.f) },
            { to: "a" + unit, convert: this.fromPreToPre(pre, Prefix.a) },
            { to: "z" + unit, convert: this.fromPreToPre(pre, Prefix.z) },
            { to: "y" + unit, convert: this.fromPreToPre(pre, Prefix.y) },
        ];
        converters.splice(this.getIndex(pre), 1);
        return converters;
    }

    public static fromOtherToAllPre(unit: string, convert: (val: number) => number) {
        const converters = [
            { to: "Y" + unit, convert: this.fromOtherToPre(Prefix.Y, convert) },
            { to: "Z" + unit, convert: this.fromOtherToPre(Prefix.Z, convert) },
            { to: "E" + unit, convert: this.fromOtherToPre(Prefix.E, convert) },
            { to: "P" + unit, convert: this.fromOtherToPre(Prefix.P, convert) },
            { to: "T" + unit, convert: this.fromOtherToPre(Prefix.T, convert) },
            { to: "G" + unit, convert: this.fromOtherToPre(Prefix.G, convert) },
            { to: "M" + unit, convert: this.fromOtherToPre(Prefix.M, convert) },
            { to: "k" + unit, convert: this.fromOtherToPre(Prefix.k, convert) },
            { to: "h" + unit, convert: this.fromOtherToPre(Prefix.h, convert) },
            { to: "da" + unit, convert: this.fromOtherToPre(Prefix.da, convert) },
            { to: unit, convert },
            { to: "d" + unit, convert: this.fromOtherToPre(Prefix.d, convert) },
            { to: "c" + unit, convert: this.fromOtherToPre(Prefix.c, convert) },
            { to: "m" + unit, convert: this.fromOtherToPre(Prefix.m, convert) },
            { to: "μ" + unit, convert: this.fromOtherToPre(Prefix.μ, convert) },
            { to: "n" + unit, convert: this.fromOtherToPre(Prefix.n, convert) },
            { to: "p" + unit, convert: this.fromOtherToPre(Prefix.p, convert) },
            { to: "f" + unit, convert: this.fromOtherToPre(Prefix.f, convert) },
            { to: "a" + unit, convert: this.fromOtherToPre(Prefix.a, convert) },
            { to: "z" + unit, convert: this.fromOtherToPre(Prefix.z, convert) },
            { to: "y" + unit, convert: this.fromOtherToPre(Prefix.y, convert) },
        ];
        return converters;
    }

    public static getIndex(pre: Prefix) {
        switch (pre) {
            case Prefix.Y: return 0;
            case Prefix.Z: return 1;
            case Prefix.E: return 2;
            case Prefix.P: return 3;
            case Prefix.T: return 4;
            case Prefix.G: return 5;
            case Prefix.M: return 6;
            case Prefix.k: return 7;
            case Prefix.h: return 8;
            case Prefix.da: return 9;
            case Prefix.none: return 10;
            case Prefix.d: return 11;
            case Prefix.c: return 12;
            case Prefix.m: return 13;
            case Prefix.μ: return 14;
            case Prefix.n: return 15;
            case Prefix.p: return 16;
            case Prefix.f: return 17;
            case Prefix.a: return 18;
            case Prefix.z: return 19;
            case Prefix.y: return 20;
        }
    }
}

export enum ConverterType {
    FromPrefixed,
    ToPrefixed
}

export enum Prefix {
    Y = 24,
    Z = 21,
    E = 18,
    P = 15,
    T = 12,
    G = 9,
    M = 6,
    k = 3,
    h = 2,
    da = 1,
    none = 0,
    d = -1,
    c = -2,
    m = -3,
    μ = -6,
    n = -9,
    p = -12,
    f = -15,
    a = -18,
    z = -21,
    y = -24,
}

