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
    private mult: number;
    private add: number;
    group: Group = Group.None;
    format: UnitFormat;
    system: string;
    readonly _internal = {
        toBase: (val: number) => {
            return val * this.mult + this.add;
        },
        fromBase: (val: number) => {
            return (val - this.add) / this.mult;
        }
    }

    constructor(format: UnitFormat, mult: number, add: number, system: string) {
        this.mult = mult;
        this.add = add;
        this.format = format;
        this.system = system;
    }
}
