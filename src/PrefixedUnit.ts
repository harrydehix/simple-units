import Prefix from "./prefixes/Prefix";
import Unit from "./Unit";

export default class PrefixedUnit {
    unit: Unit;
    prefix?: Prefix;

    constructor(unit: Unit, prefix?: Prefix) {
        this.unit = unit;
        this.prefix = prefix;
    }

    removePrefixFromValue(value: number): number {
        return value * this.multiplicator;
    }

    addPrefixToValue(value: number): number {
        return value / this.multiplicator;
    }

    get multiplicator() {
        return this.prefix?.multiplicator || 1;
    }
}