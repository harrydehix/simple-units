import Multiplicator from "./multiplicators/Multiplicator";
import FlexibleUnit from "./unit/FlexibleUnit";
import { FormatOptions } from "./unit/formatting/FormatOptions";
import PrefixedUnit from "./unit/PrefixedUnit";
import SimpleUnit from "./unit/SimpleUnit";
import Unit from "./unit/Unit";

export default class SelectedUnit {
    unit: Unit;
    multiplicators: Multiplicator[];

    constructor(unit: Unit, multiplicators: Multiplicator[] = []) {
        this.unit = unit;
        this.multiplicators = multiplicators;
    }

    removeMultiplicators(value: number): number {
        for (const multiplicator of this.multiplicators) {
            value *= multiplicator.value;
        }
        return value;
    }

    addMultiplicators(value: number): number {
        for (const multiplicator of this.multiplicators) {
            value /= multiplicator.value;
        }
        return value;
    }

    toString(): string {
        if (this.unit instanceof SimpleUnit)
            return this.unit.toString();
        else if (this.unit instanceof PrefixedUnit)
            return this.multiplicators[0].short + this.unit.toString();
        throw new Error("Feature not implemented yet!");
    }

    format(value: number, formatOptions?: FormatOptions) {
        const result = value + (formatOptions?.divider || "");
        if (this.unit instanceof SimpleUnit)
            return result + this.unit.format(value, formatOptions);
        else if (this.unit instanceof PrefixedUnit) {
            let prefix = "";

            if (this.multiplicators[0]) {
                if (formatOptions?.length === "long") prefix = this.multiplicators[0].long;
                else prefix = this.multiplicators[0].short;
            }

            return result + prefix + this.unit.format(value, formatOptions);
        } else if (this.unit instanceof FlexibleUnit) {
            // TODO:
        }
    }
}


