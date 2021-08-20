import { product } from "cartesian-product-generator";
import Group from "./Group";
import SimpleUnit from "./SimpleUnit";
import Unit, { UnitFormat } from "./Unit";
import Multiplier from "./variable/Multiplier";
import Variable from "./variable/Variable";


/**
 * Represents a standard measure that is used to express amounts.
 * 
 * In contrast to the {@link Unit} the use of prefixes, suffixes and similar is integrated without adding
 * much complexity. 
 */
export default class FlexibleUnit {
    /**
     * The ratio between this and the group's base unit.
     */
    private readonly ratio: number;
    /**
     * The shift between this and the group's base unit.
     */
    private readonly shift: number;
    /**
     * The unit's {@link Group}. Units belonging to the same group are convertible into each other.
     */
    private readonly group?: Group;
    /**
     * The unit's format, holds the unit's different symbols.
     * 
     * Attention! The flexible unit's format differs from the (simple) unit.
     * `%` represent variables. 
     * 
     * For example, the string `'%m'` in combination with a variable containing the SI prefixes from yocto to yotta
     * could represent the units `km`, `cm`, `dm`, ... in one.
     * 
     * @see Variable
     */
    private readonly format: UnitFormat;

    /**
     * The unit system the unit is belonging to. E.g. `imperial`, `metric`, ...
     */
    private readonly system: string;

    /**
     * The unit's variables. The length of the array has to match the number of percentages used in the unit's format.
     * 
     * @see Variable
    */
    private readonly variables: Variable[];

    /**
     * The unit's created by the flexible unit class in the background.
     */
    readonly _units: Unit[];

    /**
     * Creates a standard measure that is used to express amounts.
     *
     * In contrast to the {@link Unit} the use of prefixes, suffixes and similar is integrated without adding
     * much complexity.
     * @param format the unit's format
     * @param ratio the ratio between this and the group's base unit
     * @param shift the shift between this and the group's base unit
     * @param system the unit system the unit is belonging to
     * @param variables the unit's variables
     */
    constructor(format: UnitFormat, ratio: number, shift: number, system: string, variables: Variable[]) {
        this.format = format;
        this.ratio = ratio;
        this.shift = shift;
        this.system = system;
        this.variables = variables;
        this._units = this.create();
    }

    private create(): Unit[] {
        const combos = this.generateCombinations();
        const units = [];
        for (const combo of combos) {
            const newFormat = this.generateUnitFormat(combo);
            const newRatio = this.generateRatio(combo);
            units.push(new SimpleUnit(newFormat, newRatio, this.shift, this.system));
        }
        return units;
    }

    private generateRatio(combo: Multiplier[]) {
        let ratio = this.ratio;
        for (const Multiplier of combo) {
            ratio *= Multiplier.value;
        }
        return ratio;
    }

    private generateCombinations() {
        return [...product(...this.variables)] as Multiplier[][]
    }

    private generateUnitFormat(combo: Multiplier[]) {
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

    private fillFormat(format: string, combo: Multiplier[], long: boolean): string {
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