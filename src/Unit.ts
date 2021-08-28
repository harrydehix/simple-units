import { inspect } from "util";
import Group from "./Group";
import Convertible from "./Convertible";
import IllegalArgumentsError from "./errors/IllegalArgumentsError";

export type Converter = (val: number) => number;

export type UnitFormat = {
    short: string[],
    long: {
        sg: string[],
        pl: string[],
    }
}

/**
 * Represents a standard measure that is used to express amounts. 
 * 
 * A unit is always part of one single {@link Group} (attribute: {@link Unit.group}).
 * It is always defined in relation to the base unit of its group.
 * 
 * The exact relation is defined in the converter functions {@link Unit.fromBase} and {@link Unit.toBase}.
 * Thereby `fromBase(val: number) => number` defines the conversion from the base unit to `this` and `toBase(val: number) => number` vice versa. 
 * As a result of this simple concept, all units of a group are convertible into each other.
 *
 * The 4th important property of each unit is its {@link Unit.format}. 
 * This defines the unit's shape. It allows firstly the parser to recognize the unit in a string and 
 * secondly it provides the basis for the `.format()` method of the {@link Convertible}.
 * 
 * Lastly every unit is part of a unit system (attribute: {@link Unit.system}).
 * This meta information is used for the {@link Convertible}'s `.asBest()` method.
 * By default, the Convertible always remains in the same system of units.
*/
export default class Unit {
    /**
     * The unit's {@link Group}. Units belonging to the same group are convertible into each other.
     */
    group: Group = Group.None;
    /**
     * The unit's {@link UnitFormat}. Holds the unit's unique symbols, 
     * which allow the parser to recognize the unit in a string.
     * Added to that it provides the basis for the `.format()` method of the {@link Convertible}.
     */
    format: UnitFormat;
    /**
     * The unit system the unit is belonging to. E.g. `imperial`, `metric`, ...
     * 
     * This meta information is used for the {@link Convertible}'s `.asBest()` method.
     * By default, the Convertible always remains in the same system of units.
     */
    system: string;

    /**
     * Converts a value from this unit to the group's base unit.
     * @param val value in this unit
     * @returns value in the group's base unit
     */
    toBase: Converter;
    /**
     * Converts a value from the group's base unit to this unit.
     * @param val value in the group's base unit
     * @returns value in this unit
     */
    fromBase: Converter;

    /**
     * Creates a standard measure that is used to express amounts.
     * @param format the unit's format, holds the unit's different symbols (e.g. `m, metre, meters` for the unit meter)
     * @param var1 function to convert a value from this unit to the group's base unit
     * @param var2 function to convert a value from the group's base unit to this unit
     * @param system the unit system the unit is belonging to
     */
    constructor(format: UnitFormat, fromBase: Converter, toBase: Converter, system: string);
    /**
     * Creates a standard measure that is used to express amounts.
     *
     * Using this constructor function one doesn't need to specify functions describing how to convert the unit to the group's base unit and vice versa.
     *
     * Instead one only specifies the mathematical relation the the base unit - in the form of a ratio and a shift.
     *
     * <b>Example</b>: You want to define the unit <i>Celsius</i> and you have already defined the base unit <i>Kelvin</i>.
     * You know the formula to convert a value from <i>Celsius</i> to <i>Kelvin</i> is: `°C + 273.15 = °K`.
     * Using the other constructor function you had to write the following:
     * ```
     * new Unit({...}, (val) => val + 273.15, (val) => val - 273.15, ...);
     * ```
     * As you see there is repetitive code. Couldn't one save one of the two converter functions?
     * Lets see how we create the unit using this constructor.
     * ```
     * new Unit({...}, 1, 273.15, ...)
     * ```
     * `1` is the ratio between the units, `273.15` the shift. Much easier, isn't it? And no repetitive code!
    */
    constructor(format: UnitFormat, ratio: number, shift: number, system: string);

    /**
     * See overloads above. 
     * @hidden
     * @param format 
     * @param var1 
     * @param var2 
     * @param system 
     */
    constructor(format: UnitFormat, var1: Converter | number, var2: Converter | number, system: string) {
        this.format = format;
        this.system = system;
        if (typeof var1 === "function" && typeof var2 === "function") {
            this.toBase = var1;
            this.fromBase = var2;
        }
        else if (typeof var1 === "number" && typeof var2 === "number") {
            this.toBase =
                (val: number) => {
                    return val * var1 + var2;
                }
            this.fromBase =
                (val: number) => {
                    return (val - var2) / var1;
                }
        } else {
            throw new IllegalArgumentsError(`Failed to create unit '${format.short[0]}'. Illegal arguments were passed. Read the documentation for more details.`);
        }
    }

    /**
     * Returns the unit's standard string representation - therefore the most common symbol. For example `'m'` is returned for the unit meter.
     * @returns the unit's standard string representation
     */
    toString() {
        return this.format.short[0];
    }

    /**
     * @hidden
     */
    [inspect.custom](depth: any, options: any) {
        return options.stylize(this.toString(), "special");
    }

    /**
     * Returns an array of units to which the current unit can be converted.
     * @returns an array of units to which the current unit can be converted
     */
    possibilities() {
        return this.group.possibilities();
    }
}