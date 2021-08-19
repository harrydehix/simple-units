import Unit from "./Unit";

export default class Convertable {
    value: number;
    unit: Unit;

    constructor(value: number, unit: Unit) {
        this.value = value;
        this.unit = unit;
    }

    to(unit: string): number {
        const targetUnit = this.unit.group.unit(unit);
        if (!targetUnit) throw new Error();
        this.value = this.unit._internal.toBase(this.value);
        this.value = targetUnit._internal.fromBase(this.value);
        this.unit = targetUnit;
        return this.value;
    }

    as(unit: string) {
        this.to(unit);
        return this;
    }
}