import { inspect } from "util";
import { Symbols } from "../Collection";
import Group from "../Group";
import { Converter } from "./Converter";
import { UnitFormat } from "./UnitFormat";

export default class Unit {
    _format: UnitFormat;
    group: Group = new Group("no-group");
    _toBase: Converter;
    _fromBase: Converter;
    system: string;

    constructor(format: UnitFormat, toBase: Converter, fromBase: Converter, system: string) {
        this._format = format;
        this._toBase = toBase;
        this._fromBase = fromBase;
        this.system = system;
    }

    get identifier() {
        return this._format.short[0];
    }

    validate(identifier: string, symbols?: Symbols) {
        if (symbols === undefined) symbols = this.group.collection.settings.symbols;
        switch (symbols) {
            case Symbols.SINGLE:
                return this.identifier === identifier;
            case Symbols.SHORTS:
                return this._format.short.includes(identifier);
            case Symbols.LONGS:
                return this._format.long.sg.includes(identifier) || this._format.long.pl.includes(identifier);
            case Symbols.ALL:
                return this._format.short.includes(identifier) || this._format.long.sg.includes(identifier) || this._format.long.pl.includes(identifier);
        }
    }

    possibilities(): string[] {
        return this.group._internal._possibilities();
    }

    description(): string {
        return `{\n  abbr: ${this._format.short.join(", ")}\n  measure: ${this.group.name}\n  system: ${this.system}\n  singular: ${this._format.long.sg.join(", ")}\n  plural: ${this._format.long.pl.join(", ")}\n}`;
    }

    [inspect.custom](depth: any, options: any): string {
        return options.stylize("Unit { ", "special") + options.stylize(`'${this._format.short[0]}'`, "string") + options.stylize(" }", "special");
    }

    toString(): string {
        return this._format.short[0];
    }

}