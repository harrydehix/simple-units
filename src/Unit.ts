import { inspect } from "util";
import Group from "./Group";

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
 */
export default class Unit {
    /**
     * The unit's {@link Group}. Units belonging to the same group are convertible into each other.
     */
    group: Group = Group.None;
    /**
     * The unit's {@link Format}. Holds the unit's unique symbols.
     */
    format: UnitFormat;
    /**
     * The unit system the unit is belonging to. E.g. `imperial`, `metric`, ...
     */
    system: string;

    /**
     * Internal functionality that shouldn't be touched by the end user.
     * @hidden
     */
    readonly _internal = {
        /**
         * Converts a value from this unit to the group's base unit.
         * @param val value in this unit
         * @returns value in the group's base unit
         */
        toBase: (val: number) => {
            return val;
        },
        /**
         * Converts a value from the group's base unit to this unit.
         * @param val value in the group's base unit
         * @returns value in this unit
         */
        fromBase: (val: number) => {
            return val;
        }
    }

    /**
     * Creates a standard measure that is used to express amounts.
     * @param format the unit's format, holds the unit's different symbols (e.g. `m` for the unit meter)
     * @param toBase function to convert a value from this unit to the group's base unit
     * @param fromBase function to convert a value from the group's base unit to this unit
     * @param system the unit system the unit is belonging to
     */
    constructor(format: UnitFormat, toBase: Converter, fromBase: Converter, system: string) {
        this.format = format;
        this.system = system;
        this._internal.toBase = toBase;
        this._internal.fromBase = fromBase;
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