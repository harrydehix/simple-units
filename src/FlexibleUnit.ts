import { product } from "cartesian-product-generator";
import InvalidVariableSyntaxError from "./errors/InvalidVariableSyntaxError";
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
 * <b>Example</b>: We have the unit "meter per second" (as base unit):
 * ```
 * const meterPerSecond = new Unit({ short: ["m/s"],
 *      long: {
 *          sg: ["meter per second", "metre per second"],
 *          pl: ["meters per second", "metres per second"]
 *      }
 * }, 1, 0, "metric");
 * ```
 * Now we also want to create the units "meters per minute", "kilometers per second" and "kilometers per minute". We could now simply define three more units:
 * ```
 * // 1 m/min = 1/60 m/s
 * const meterPerMinute = new Unit({ short: ["m/min"],
 *      long: {
 *          sg: ["meter per minute", "metre per minute"],
 *          pl: [["meters per minutes", "metres per minutes"]
 *      }
 * }, 1/60, 0, "metric");
 * 
 * // 1 km/s = 1000 m/s
 * const kilometerPerSecond = new Unit({ short: ["km/s"],
 *      long: {
 *          sg: ["kilometer per second", "kilometre per second"],
 *          pl: ["kilometers per second", "kilometres per second"]
 *      }
 * }, 1000, 0, "metric");
 * 
 * // 1 km/min = 16.666666667 m/s
 * const kilometerPerMinute = new Unit({ short: ["km/min"],
 *      long: {
 *          sg: ["kilometer per minute", "kilometre per minute"],
 *          pl: [["kilometers per minutes", "kilometres per minutes"]
 *      }
 * }, 16.666666667, 0, "metric");
 * ```
 * But as we see, we would have unnecessary repetitive code. This is exactly the kind of case where the FlexibleUnit comes in handy.
 * This is how the code would look like with the FlexibleUnit:
 * ```
 * const var1 = new Variable([
 *      new Option("k", "kilo", 1000),
 * ], true);
 * const var2 = new Variable([
 *      new Option("s", "second", 1),
 *      new Option("min", "minute", 1/60),
 * ], false);
 * 
 * const unit = new FlexibleUnit({ short: ["%0m/%1"],
 *      long: {
 *          sg: ["%0meter per %1", "%0metre per %1"],
 *          pl: ["%0meters per %1", "%0metres per %1]"
 *      }
 * }, 1, 0, "metric", [var1, var2]);
 * ```
 * Much shorter, isn't it? But what exactly is happening here?
 * First, we create the {@link Variable} `var1`. A variable is nothing else than a placeholder that can take different states. 
 * We pass an array holding the different values (called {@link Option}) the 
 * variable can take to the constructor. Because we only need the optional prefix `k` (long term: `kilo`) we just define one single option here. We know `1km = 1000m`, so we 
 * specify `1000` for the ratio. With `true` we set the variable as optional.
 * After that we create the second variable `var2`. We pass an array holding the different values the variable can take. These are the different times we want to support.
 * First we define the option for the `second` (short term: `s`). We set the ratio to 1 because `m/s` is our base. After
 * that we define the option for the `minute` (short term: `min`). We know `1m/s = 1/60m/min`. Therefore we set the ratio to `1/60`.
 * With `false` we set the variable as mandatory.
 * 
 * The second new thing is the unit's different format. 
 * There are new weird looking `%number` terms. These serve as a indicators for the previously defined variables. 
 * Thus `%0m/%1` becomes `km/s`, `m/s`, `m/min` and `km/min`. Of course, the FlexibleUnit knows nothing about the previous variables, 
 * which is why we pass them into the constructor. The number after the `%` indicates the variable's index in the passed array.
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
     */
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

    /**
     * @hidden
     */
    private generateRatio(combo: Option[]) {
        let ratio = this.ratio;
        for (const Multiplier of combo) {
            ratio *= Multiplier.ratio;
        }
        return ratio;
    }

    /**
     * @hidden
     */
    private generateCombinations() {
        const optionArrays: (Option[])[] = [];

        for (const variable of this.variables) {
            optionArrays.push(variable._internal._toArray());
        }

        return [...product(...optionArrays)] as Option[][];
    }

    /**
     * @hidden
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
     */
    private fillFormat(format: string, combo: Option[], long: boolean): string {
        let result = "";
        for (let i = 0; i < format.length; i++) {
            if (format[i] === "%" && i + 1 < format.length) {
                const variableIndex = this.cutInteger(format.substr(i + 1));
                if (variableIndex === false) throw new InvalidVariableSyntaxError(`Inside the flexible unit's format a '%' must be followed by a number indicating the variable's index!`);

                const variableIndexNumber = Number(variableIndex);
                if (variableIndexNumber >= combo.length) throw new InvalidVariableSyntaxError(`The specified variable index '%${variableIndexNumber}' is out of range!`);
                if (long) result += combo[variableIndexNumber].long;
                else result += combo[variableIndexNumber].short;
                i += variableIndex.length;
            } else {
                result += format[i];
            }
        }
        return result;
    }

    /**
     * @hidden
     */
    private cutInteger(string: string): string | false {
        let result = "";
        for (let i = 0; i < string.length; i++) {
            if (string[i].match(/[0-9]/)) result += string[i];
            else break;
        }
        if (result.length !== 0) return result;
        return false;
    }

}