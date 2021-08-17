import { inspect } from "util";
import Group from "../Group";
import Unit from "../unit/Unit";
import { FormatOptions } from "./FormatOptions";

export default class Convertable {
    value: number;
    unit: Unit;

    constructor(value: number, unit: Unit) {
        this.value = value;
        this.unit = unit;
    }

    to(identifier: string) {
        const resolvedUnit = this.unit.group.getUnit(identifier);
        if (!resolvedUnit) throw new Error("Unit not part of this group!");
        this.value = this.unit.toBase(this.value);
        this.value = resolvedUnit.fromBase(this.value);
        this.unit = resolvedUnit;
        return this.value;
    }

    as(identifier: string) {
        this.to(identifier);
        return this;
    }


    [inspect.custom](depth: any, options: any): string {
        return options.stylize(this.value + this.unit.toString(), "special");
    }

    toString(): string {
        return this.value + this.unit.toString();
    }

    format(formatOptions?: FormatOptions): string {
        let divider = "", length = "short", count = "pl";

        if (formatOptions?.divider) divider = formatOptions.divider;
        if (formatOptions?.length) length = formatOptions.length;
        if (this.value === 1) count = "sg";

        let unit;
        if (length === "short") {
            unit = this.unit.format.short;
        } else {
            if (count === "sg") unit = this.unit.format.long.sg[0];
            else unit = this.unit.format.long.pl[0];
        }
        return this.value + divider + unit;
    }
}