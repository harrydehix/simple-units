import { inspect } from "util";
import Group from "../Group";
import Unit from "../unit/Unit";
import { FormatOptions } from "./FormatOptions";

export type BestOptions = {
    allowMultipleSystems: boolean
}
export default class Convertable {
    value: number;
    unit: Unit;

    constructor(value: number, unit: Unit) {
        this.value = value;
        this.unit = unit;
    }

    to(identifier: string) {
        const resolvedUnit = this.unit.group.tryToFindUnit(identifier);
        if (!resolvedUnit) throw new Error("Unit not part of this group!");
        return this._toUnit(resolvedUnit);
    }

    private _toUnit(unit: Unit) {
        this.value = this.unit.toBase(this.value);
        this.value = unit.fromBase(this.value);
        this.unit = unit;
        return this.value;
    }

    toBest(options?: BestOptions): number {
        let bestUnit = this.unit;
        let bestCount = Number.MAX_VALUE;
        for (const unit of this.unit.group.units) {
            if (options?.allowMultipleSystems || unit.system === this.unit.system) {
                this._toUnit(unit);
                if (this.value >= 1 || this.value <= -1) {
                    const str = String(this.value);
                    if (!str.includes("e")) {
                        let count;
                        if (str.includes(".")) count = str.split(".")[0].length;
                        else count = str.length;
                        if (count < bestCount) {
                            bestUnit = unit;
                            bestCount = count;
                        }
                    }
                }
            }
        }
        this._toUnit(bestUnit);
        return this.value;
    }

    asBest(): this {
        this.toBest();
        return this;
    }

    as(identifier: string) {
        this.to(identifier);
        return this;
    }

    private _asUnit(unit: Unit) {
        this._toUnit(unit);
        return this;
    }


    possibilities(): string[] {
        return this.unit.possibilities();
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