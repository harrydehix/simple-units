import { product } from "cartesian-product-generator";
import Group from "./Group";
import Unit, { UnitFormat } from "./Unit";
import Option from "./variable/Option";
import Variable from "./variable/Variable";


/**
 * Represents a standard measure that is used to express amounts.
 * 
 * In contrast to the {@link Unit} the use of prefixes, suffixes and similar is integrated without adding
 * much complexity.
 * 
 * This is done via so-called "variables" ({@link Variable}), 
 * which are integrated into the format of the unit ({@link Unit.format}).
 * 
 * <b>Example</b>: We have the unit "meter" (as base unit):
 * ```
 * const meter = Unit.create({ short: ["m"],
 *      long: {
 *          sg: ["meter", "metre"],
 *          pl: ["meters", "metres"]
 *      }
 * }, 1, 0, "metric");
 * ```
 * Now we also want to create the units "kilometers" and "centimeters". We could now simply define two more units:
 * ```
 * const kilometer = Unit.create({ short: ["km"],
 *      long: {
 *          sg: ["kilometer", "kilometre"],
 *          pl: ["kilometers", "kilometres"]
 *      }
 * }, 1000, 0, "metric");
 * 
 * const centimeter = Unit.create({ short: ["cm"],
 *      long: {
 *          sg: ["centimeter", "centimetre"],
 *          pl: ["centimeters", "centimetres"]
 *      }
 * }, 0.01, 0, "metric");
 * ```
 * But as we see, we would have unnecessary repetitive code. This is exactly the kind of case where the FlexibleUnit comes in handy.
 * This is how the code would look like with the FlexibleUnit:
 * ```
 * const prefix = new Variable(true,
 *      new Option("k", "kilo", 1000),
 *      new Option("c", "centi", 0.01),
 * );
 * 
 * const meter = new FlexibleUnit({ short: ["%m"],
 *      long: {
 *          sg: ["%meter", "%metre"],
 *          pl: ["%meters", "%metres"
 *      }
 * }, 1, 0, "metric", [prefix]);
 * ```
 * Much shorter, isn't it? But what exactly is happening here?
 * First, we create a {@link Variable}. A variable is nothing else than something that can take different states. 
 * With `true` we set the variable as optional. Then follows the definition of the different values the 
 * variable can take. The first option is the prefix `k` (long term: `kilo`). We know `1km = 1000m`, so we 
 * specify `1000` for the ratio. We do the same for the prefix `c` (long term: `centi`). We know `1cm = 0.01m`, 
 * which is why we specify `0.01` for the ratio.
 * 
 * The second new thing is the changed definition of the format of the unit. 
 * Each term is now preceded by a `%`. This serves as a placeholder for the previously defined variable. 
 * Thus `%m` becomes `km`, `cm` and `m`. Of course, the FlexibleUnit knows nothing about the previous definition of
 * the variable, which is why we pass it into the constructor. You may wonder why we pass it as a part of an array.
 * The reason for this is that not only one but also several variables are supported. In this case, the first `%` in the format 
 * then represents the first variable, the second `%` represents the second variable, and so on.
 * 
 * And that's it!
 */
export default class FlexibleUnit {
    /**
     * The ratio between this and the group's base unit.
     * @hidden
     */
    private readonly ratio: number;
    /**
     * The shift between this and the group's base unit.
     * @hidden
     */
    private readonly shift: number;
    /**
     * The unit's {@link Group}. Units belonging to the same group are convertible into each other.
     * @hidden
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
     * @hidden
     * @see Variable
     */
    private readonly format: UnitFormat;

    /**
     * The unit system the unit is belonging to. E.g. `imperial`, `metric`, ...
     * @hidden
     */
    private readonly system: string;

    /**
     * The unit's variables. The length of the array has to match the number of percentages used in the unit's format.
     * @hidden
     * @see Variable
    */
    private readonly variables: Variable[];

    /**
     * The unit's created by the flexible unit class in the background.
     * @hidden
     */
    readonly _units: Unit[];

    /**
     * Creates a standard measure that is used to express amounts.
     *
     * In contrast to the {@link Unit} the use of prefixes, suffixes and similar is integrated without adding
     * much complexity.
     * @param format the unit's format (`%` = variable)
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

    /**
     * @hidden
     * @returns 
     */
    private create(): Unit[] {
        const combos = this.generateCombinations();
        const units = [];
        for (const combo of combos) {
            const newFormat = this.generateUnitFormat(combo);
            const newRatio = this.generateRatio(combo);
            units.push(Unit.create(newFormat, newRatio, this.shift, this.system));
        }
        return units;
    }

    /**
     * @hidden
     * @returns
     */
    private generateRatio(combo: Option[]) {
        let ratio = this.ratio;
        for (const Multiplier of combo) {
            ratio *= Multiplier.value;
        }
        return ratio;
    }

    /**
     * @hidden
     * @returns
     */
    private generateCombinations() {
        return [...product(...this.variables)] as Option[][]
    }

    /**
     * @hidden
     * @returns
     */
    private generateUnitFormat(combo: Option[]) {
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

    /**
     * @hidden
     * @returns
     */
    private fillFormat(format: string, combo: Option[], long: boolean): string {
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