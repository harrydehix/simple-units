import { inspect } from "util";
import Convertable from "./convertable/Convertable";
import ConvertableParser from "./convertable/ConvertableParser";
import SelectedUnit from "./SelectedUnit";
import Unit from "./unit/Unit";

export default class Group {
    name: string;
    units: Unit[] = [];

    constructor(name: string) {
        this.name = name;
    }

    setUnits(...units: Unit[]) {
        this.units = units;
    }

    addUnits(...units: Unit[]) {
        this.units.push(...units);
    }

    from(value: number | string, unit?: string): Convertable {
        if (typeof value === "string") {
            const result = ConvertableParser.divide(value);
            value = result[0];
            unit = result[1];
        }
        if (!unit)
            throw new Error(`Missing unit in '${value}'!`);
        const result = ConvertableParser.parse(value, unit, this);
        if (!result)
            throw new Error(`Didn't find unit '${unit}'!`);
        return result;
    }

    Convertable = this.from;

    _from(value: number, unit: string): Convertable | undefined {
        return ConvertableParser.parse(value, unit, this);
    }

    findUnit(prefixedUnit: string) {
        return this.units.find((unit) => unit.isUnit(prefixedUnit));
    }

    isSupported(prefixedUnit: string): boolean {
        return this.findUnit(prefixedUnit) !== undefined;
    }

    parse(prefixedUnit: string): SelectedUnit | undefined {
        for (const unit of this.units) {
            const result = unit.parse(prefixedUnit);

            if (result) return result;
        }
    }

    [inspect.custom](depth: any, options: any): string {
        return options.stylize("Group { ", "special") + options.stylize(`'${this.name}'`, "string") + options.stylize(" }", "special");
    }
}