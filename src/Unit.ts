import { inspect } from "util";
import UnitCollection from "./collections/UnitCollection";

export type Converter =
    { from: string, convert: (val: number) => number }
    |
    { to: string, convert: (val: number) => number }

export default class Unit<C extends UnitCollection<any>> {
    public readonly symbols: string[];
    public readonly converters: Converter[];
    public readonly group?: number;
    public readonly collection: C;

    constructor(symbols: string | string[], collection: C, converters: Converter[] = [], group?: number) {
        this.converters = converters;

        if (symbols instanceof Array) this.symbols = symbols;
        else this.symbols = [symbols];

        this.collection = collection;
        this.group = group;
    }

    public isUnit(symbol: string): boolean {
        for (const thisSymbol of this.symbols) {
            if (thisSymbol === symbol) return true;
        }
        return false;
    }

    public findConverter(targetUnit: Unit<C>): Converter | undefined {
        for (const converter of this.converters) {
            if ("to" in converter && targetUnit.isUnit(converter.to)) {
                return converter;
            }
        }
        for (const converter of targetUnit.converters) {
            if ("from" in converter && this.isUnit(converter.from)) {
                return converter;
            }
        }
    }

    public possibilities(): string[] {
        const possibilities = [this.symbols[0]];
        for (const property in this.collection) {
            const unit = this.collection[property];
            if (unit instanceof Unit) {
                if (this.findConverter(unit)) possibilities.push(unit.symbols[0]);
            }
        }
        return possibilities;
    }

    [inspect.custom](depth: any, options: any): string {
        // console.log(options.stylize.toString())
        // console.log(inspect.styles)
        return options.stylize("Unit { ", "special") + options.stylize(`'${this.symbols[0]}'`, "string") + options.stylize(" }", "special");
    }

    toString(): string {
        return this.symbols[0];
    }
}