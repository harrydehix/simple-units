import { inspect } from "util";
import UnitCollection from "./collections/UnitCollection";

export type Converter =
    { from: string, convert: (val: number) => number }
    |
    { to: string, convert: (val: number) => number }

export default class Unit<C extends UnitCollection<any>> {
    public readonly stringRepresentation: string;
    public readonly converters: Converter[];
    public readonly group?: number;
    public readonly collection: C;

    constructor(stringRepresentation: string, converters: Converter[] = [], collection: C, group?: number) {
        this.converters = converters;
        this.stringRepresentation = stringRepresentation;
        this.collection = collection;
        this.group = group;
    }

    public findConverter(targetUnit: Unit<C>): Converter | undefined {
        for (const converter of this.converters) {
            if ("to" in converter && converter.to === targetUnit.stringRepresentation) {
                return converter;
            }
        }
        for (const converter of targetUnit.converters) {
            if ("from" in converter && converter.from === this.stringRepresentation) {
                return converter;
            }
        }
    }

    [inspect.custom](depth: any, options: any): string {
        // console.log(options.stylize.toString())
        // console.log(inspect.styles)
        return options.stylize("Unit { ", "special") + options.stylize(`'${this.stringRepresentation}'`, "string") + options.stylize(" }", "special");
    }

    toString(): string {
        return this.stringRepresentation;
    }
}