import { product } from "cartesian-product-generator";
import { Converter } from "../unit/Converter";
import Unit from "../unit/Unit";
import { UnitFormat } from "../unit/UnitFormat";
import Multiplicator from "./variable/Multiplicator";
import Variable from "./variable/Variable";

export default class UnitCreator {
    static create(format: UnitFormat, toBase: Converter, fromBase: Converter, variables: Variable[]): Unit[] {
        const units: Unit[] = [];
        const combos = this.generateCombinations(variables);
        for (const combo of combos) {
            const newFormat = this.generateUnitFormat(format, combo);
            const newToBase = this.generateToBase(toBase, combo);
            const newFromBase = this.generateFromBase(fromBase, combo);
            units.push(new Unit(newFormat, newToBase, newFromBase));
        }
        return units;
    }

    private static generateCombinations(variables: Variable[]) {
        return [...product(...variables)] as Multiplicator[][]
    }

    // Generate Unit Format
    private static generateUnitFormat(format: UnitFormat, combo: Multiplicator[]) {
        const newFormat: UnitFormat = {
            short: [],
            long: { sg: [], pl: [] }
        };
        for (const shortFormat of format.short) {
            const filledFormat = this.fillFormat(shortFormat, combo, false);
            newFormat.short.push(filledFormat);
        }
        for (const longSgFormat of format.long.sg) {
            const filledFormat = this.fillFormat(longSgFormat, combo, true);
            newFormat.long.sg.push(filledFormat);
        }
        for (const longPlFormat of format.long.pl) {
            const filledFormat = this.fillFormat(longPlFormat, combo, true);
            newFormat.long.pl.push(filledFormat);
        }
        return newFormat;
    }

    private static fillFormat(format: string, combo: Multiplicator[], long: boolean): string {
        let result = "";
        let multIndex = 0;
        for (let i = 0; i < format.length; i++) {
            if (format[i] === "%") {
                if (long) result += combo[multIndex++].long;
                else result += combo[multIndex++].short;
            } else {
                result += format[i];
            }
        }
        return result;
    }
    // Generate ToBase
    private static generateToBase(toBase: Converter, combo: Multiplicator[]): Converter {
        return (val: number) => {
            for (const multiplicator of combo) {
                val = multiplicator.remove(val);
            }
            return toBase(val);
        }
    }
    // Generate FromBase
    private static generateFromBase(fromBase: Converter, combo: Multiplicator[]): Converter {
        return (val: number) => {
            val = fromBase(val);
            for (const multiplicator of combo) {
                val = multiplicator.add(val);
            }
            return val;
        }
    }
}