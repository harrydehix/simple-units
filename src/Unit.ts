import { inspect } from "util";
import Group from "./Group";
import Prefix from "./prefixes/Prefix";

export type PrefixSymbols = {
    [symbol: string]: ([string, string])[],
}

export type Converter = (val: number) => number;

export default class Unit {
    private short: string[] = [];
    private long: string[] = [];
    private readonly prefixes?: Prefix[];
    readonly toBase: Converter;
    readonly fromBase: Converter;
    group: Group | null = null;

    constructor(short: string[], long: string[], toBase: Converter, fromBase: Converter, prefixes?: Prefix[]) {
        this.short = short;
        this.long = long;
        this.prefixes = prefixes;
        this.toBase = toBase;
        this.fromBase = fromBase;
    }

    isPlainUnit(symbol: string): boolean {
        return this.short.includes(symbol) || this.long.includes(symbol);
    }

    isUnit(prefixedUnit: string): boolean {
        if (!this.prefixes) {
            return this.isPlainUnit(prefixedUnit);
        }
        for (const short of this.short) {
            for (const prefix of this.prefixes) {
                if (prefix.short + short === prefixedUnit) return true;
            }
        }
        for (const long of this.long) {
            for (const prefix of this.prefixes) {
                if (prefix.long + long === prefixedUnit) return true;
            }
        }
        return false;
    }

    findPrefix(prefixedUnit: string): Prefix | null | undefined {
        if (!this.prefixes) {
            if (this.isPlainUnit(prefixedUnit)) return undefined;
            else return null;
        }
        if (this.isPlainUnit(prefixedUnit)) return undefined;
        for (const short of this.short) {
            for (const prefix of this.prefixes) {
                if (prefix.short + short === prefixedUnit) return prefix;
            }
        }
        for (const long of this.long) {
            for (const prefix of this.prefixes) {
                if (prefix.long + long === prefixedUnit) return prefix;
            }
        }
        return null;
    }

    isSupportingPrefixes(): boolean {
        return Boolean(this.prefixes);
    }

    [inspect.custom](depth: any, options: any): string {
        return options.stylize("Unit { ", "special") + options.stylize(`'${this.short[0]}'`, "string") + options.stylize(" }", "special");
    }

    toString(): string {
        return this.short[0];
    }
}