import Group from "../Group";
import SelectedUnit from "../SelectedUnit";
import { inspect } from "util";
import { FormatOptions } from "../unit/formatting/FormatOptions";

export default class Convertable {
    value: number;
    selectedUnit: SelectedUnit;
    group: Group;

    constructor(value: number, unit: SelectedUnit, group: Group) {
        this.value = value;
        this.selectedUnit = unit;
        this.group = group;
    }

    to(unit: string): number {
        const prefixedUnit = this.group.parse(unit);
        if (!prefixedUnit) throw new Error(`Unit '${unit}' is not part of the group '${this.group.name}'!`);
        this.value = this.selectedUnit.removeMultiplicators(this.value);
        this.value = this.selectedUnit.unit.toBase(this.value);
        this.value = prefixedUnit.unit.fromBase(this.value);
        this.value = prefixedUnit.addMultiplicators(this.value);
        this.selectedUnit = prefixedUnit;
        return this.value;
    }

    as(unit: string): this {
        this.to(unit);
        return this;
    }

    [inspect.custom](depth: any, options: any): string {
        return options.stylize(this.value + this.selectedUnit.toString(), "special");
    }

    toString(): string {
        return this.value + this.selectedUnit.toString();
    }

    format(formatOptions?: FormatOptions): string {
        return this.selectedUnit.format(this.value, formatOptions);
    }
}