import { inspect } from "util";
import ConversionError from "./errors/ConversionError";
import Unit from "./Unit";

export type FormatOptions = {
    length?: "long" | "short",
    divider?: string,
}
export default class Convertable {
    value: number;
    unit: Unit;
    /**
     * @hidden
     */
    _internal = {
        _toUnit: (unit: Unit) => {
            this.value = this.unit.toBase(this.value);
            this.value = unit.fromBase(this.value);
            this.unit = unit;
            return this.value;
        }
    }

    constructor(value: number, unit: Unit) {
        this.value = value;
        this.unit = unit;
    }

    possibilities() {
        return this.unit.possibilities();
    }

    to(unit: string): number {
        const target = this.unit.group._internal._units().get(unit);
        if (!target) throw new ConversionError(`Unit '${unit}' does not belong to group '${this.unit.group.name}'!`)
        this.value = this.unit.toBase(this.value);
        this.value = target.fromBase(this.value);
        this.unit = target;
        return this.value;
    }

    as(unit: string) {
        this.to(unit);
        return this;
    }

    asBest(crossSystem = false) {
        let bestUnit = this.unit;
        let bestCount = Number.MAX_VALUE;
        this.unit.group._internal._units().forEach((unit, key) => {
            if (crossSystem || unit.system === this.unit.system) {
                this._internal._toUnit(unit);
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
        });
        this._internal._toUnit(bestUnit);
        return this;
    }

    toString() {
        return this.value + this.unit.toString();
    }

    [inspect.custom](depth: any, options: any) {
        return options.stylize(this.toString(), "special")
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