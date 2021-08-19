import { product } from "cartesian-product-generator";
import Group from "./Group";
import Unit, { UnitFormat } from "./Unit";
import Multiplicator from "./variable/Multiplicator";
import Variable from "./variable/Variable";

export default class FlexibleUnit {
    private readonly ratio: number;
    private readonly shift: number;
    private readonly group?: Group;
    private readonly format: UnitFormat;
    private readonly system: string;
    private readonly variables: Variable[];
    public readonly units: Unit[];

    constructor(format: UnitFormat, ratio: number, shift: number, system: string, variables: Variable[]) {
        this.format = format;
        this.ratio = ratio;
        this.shift = shift;
        this.system = system;
        this.variables = variables;
        this.units = this.create();
    }

    private create(): Unit[] {
        const combos = this.generateCombinations();
        const units = [];
        for (const combo of combos) {
            const newFormat = this.generateUnitFormat(combo);
            const newRatio = this.generateRatio(combo);
            units.push(new Unit(newFormat, newRatio, this.shift, this.system));
        }
        return units;
    }

    private generateRatio(combo: Multiplicator[]) {
        let ratio = this.ratio;
        for (const multiplicator of combo) {
            ratio *= multiplicator.value;
        }
        return ratio;
    }

    private generateCombinations() {
        return [...product(...this.variables)] as Multiplicator[][]
    }

    private generateUnitFormat(combo: Multiplicator[]) {
        const newFormat: UnitFormat = {
            short: [],
            long: { sg: [], pl: [] }
        };
        for (const shortFormat of this.format.short) {
            const filledFormat = this.fillFormat(shortFormat, combo, false);
            newFormat.short.push(filledFormat);
        }
        for (const longSgFormat of this.format.long.sg) {
            const filledFormat = this.fillFormat(longSgFormat, combo, true);
            newFormat.long.sg.push(filledFormat);
        }
        for (const longPlFormat of this.format.long.pl) {
            const filledFormat = this.fillFormat(longPlFormat, combo, true);
            newFormat.long.pl.push(filledFormat);
        }
        return newFormat;
    }

    private fillFormat(format: string, combo: Multiplicator[], long: boolean): string {
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

}