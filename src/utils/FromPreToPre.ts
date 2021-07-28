export default class FromPreToPre {
    public static Converter(from: Prefix, to: Prefix) {
        const factor = Math.pow(10, from - to);
        return (val: number) => val * factor;
    }

    public static Factor(from: Prefix, to: Prefix) {
        const exponent = Math.pow(10, from - to);
        return (val: number) => val * exponent;
    }

    public static Converters(pre: Prefix, unit: string) {
        const converters = [
            { to: "Y" + unit, convert: this.Converter(pre, Prefix.Y) },
            { to: "Z" + unit, convert: this.Converter(pre, Prefix.Z) },
            { to: "E" + unit, convert: this.Converter(pre, Prefix.E) },
            { to: "P" + unit, convert: this.Converter(pre, Prefix.P) },
            { to: "T" + unit, convert: this.Converter(pre, Prefix.T) },
            { to: "G" + unit, convert: this.Converter(pre, Prefix.G) },
            { to: "M" + unit, convert: this.Converter(pre, Prefix.M) },
            { to: "k" + unit, convert: this.Converter(pre, Prefix.k) },
            { to: "h" + unit, convert: this.Converter(pre, Prefix.h) },
            { to: "da" + unit, convert: this.Converter(pre, Prefix.da) },
            { to: unit, convert: this.Converter(pre, Prefix.none) },
            { to: "d" + unit, convert: this.Converter(pre, Prefix.d) },
            { to: "c" + unit, convert: this.Converter(pre, Prefix.c) },
            { to: "m" + unit, convert: this.Converter(pre, Prefix.m) },
            { to: "μ" + unit, convert: this.Converter(pre, Prefix.μ) },
            { to: "n" + unit, convert: this.Converter(pre, Prefix.n) },
            { to: "p" + unit, convert: this.Converter(pre, Prefix.p) },
            { to: "f" + unit, convert: this.Converter(pre, Prefix.f) },
            { to: "a" + unit, convert: this.Converter(pre, Prefix.a) },
            { to: "z" + unit, convert: this.Converter(pre, Prefix.z) },
            { to: "y" + unit, convert: this.Converter(pre, Prefix.y) },
        ];
        converters.splice(this.getIndex(pre), 1);
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

