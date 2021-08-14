import Unit from "../Unit";
import Group from "../Group";

export default class Convertable {
    value: number;
    unit: Unit;
    group: Group;

    constructor(value: number, unit: Unit, group: Group) {
        this.value = value;
        this.unit = unit;
        this.group = group;
    }

    to(unit: string): number {
        const prefixedUnit = this.group.findPrefixedUnit(unit);
        if (!prefixedUnit) throw new Error(`Unit '${unit}' is not part of the group '${this.group.name}'!`);
        this.value = this.unit.toBase(this.value);
        this.value = prefixedUnit.unit.fromBase(this.value);
        this.value = prefixedUnit.addPrefixToValue(this.value);
        this.unit = prefixedUnit.unit;
        return this.value;
    }
}