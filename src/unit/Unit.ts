import { inspect } from "util";
import SelectedUnit from "../SelectedUnit";
import { Converter } from "./Converter";
import { FormatOptions } from "./formatting/FormatOptions";
import Formats from "./formatting/Formats";

export default abstract class Unit {
    readonly toBase: Converter;
    readonly fromBase: Converter;
    readonly formats: Formats;

    constructor(formats: Formats, toBase: Converter, fromBase: Converter) {
        this.toBase = toBase;
        this.fromBase = fromBase;
        this.formats = formats;
    }

    abstract isUnit(prefixedUnit: string): boolean;

    abstract parse(prefixedUnit: string): SelectedUnit | undefined;

    [inspect.custom](depth: any, options: any): string {
        return options.stylize("Unit { ", "special") + options.stylize(`'${this.formats.default()}'`, "string") + options.stylize(" }", "special");
    }

    toString(): string {
        return this.formats.default();
    }

    format(val: number, formatOptions?: FormatOptions): string {
        if (val === 1) {
            if (formatOptions?.length === "long") {
                return this.formats.longSingular();
            }
            return this.formats.shortSingular();
        } else {
            if (formatOptions?.length === "long") {
                return this.formats.longPlural();
            }
            return this.formats.shortPlural();
        }
    }
}