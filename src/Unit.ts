import { inspect } from "util";
import Group from "./Group";

export type Converter = (val: number) => number;

export type UnitFormat = {
    short: string[],
    long: {
        sg: string[],
        pl: string[],
    }
}

export default class Unit {
    group: Group = Group.None;
    format: UnitFormat;
    system: string;
    readonly _internal = {
        toBase: (val: number) => {
            return val;
        },
        fromBase: (val: number) => {
            return val;
        }
    }

    constructor(format: UnitFormat, toBase: Converter, fromBase: Converter, system: string) {
        this.format = format;
        this.system = system;
        this._internal.toBase = toBase;
        this._internal.fromBase = fromBase;
    }

    toString() {
        return this.format.short[0];
    }

    [inspect.custom](depth: any, options: any) {
        return options.stylize(this.toString(), "special");
    }

    possibilities() {
        return this.group.possibilities();
    }
}