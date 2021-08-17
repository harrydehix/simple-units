import { inspect } from "util";
import { Symbols } from "../Collection";
import Group from "../Group";
import { Converter } from "./Converter";
import { UnitFormat } from "./UnitFormat";

export default class Unit {
    format: UnitFormat;
    group: Group = new Group("no-group");
    toBase: Converter;
    fromBase: Converter;

    constructor(format: UnitFormat, toBase: Converter, fromBase: Converter) {
        this.format = format;
        this.toBase = toBase;
        this.fromBase = fromBase;
    }

    isUnit(identifier: string) {
        switch (this.group.collection.settings.symbols) {
            case Symbols.SINGLE_IDENTIFIER:
                return this.format.short[0] === identifier;
            case Symbols.SHORT_FORMS:
                return this.format.short.includes(identifier);
            case Symbols.LONG_FORMS:
                return this.format.long.sg.includes(identifier) || this.format.long.pl.includes(identifier);
            case Symbols.ALL:
                return this.format.short.includes(identifier) || this.format.long.sg.includes(identifier) || this.format.long.pl.includes(identifier);
        }
    }

    [inspect.custom](depth: any, options: any): string {
        return options.stylize("Unit { ", "special") + options.stylize(`'${this.format.short[0]}'`, "string") + options.stylize(" }", "special");
    }

    toString(): string {
        return this.format.short[0];
    }

}