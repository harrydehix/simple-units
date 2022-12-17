import { inspect } from "util";
import CollectionEditor from "./CollectionEditor";
import Convertible from "./Convertible";
import UnknownGroupError from "./errors/UnknownGroupError";
import UnknownUnitError from "./errors/UnknownUnitError";
import Group from "./Group";
import Unit from "./Unit";

/**
 * Represents a collection of units (see {@link Unit}) structured in groups (see {@link Group}).
 * 
 * Offers key functionality like converting from one unit to another.
 * Is the center at which all of the library's features are brought together.
 * 
 * The basic structure of any collection is basically following: A collection is the parent of
 * multiple groups. Groups are parents of multiple units.
 * 
 * <b>Example</b>:
 * ```
 * Collection
 *  |
 *  |____Group "length"
 *  |      |___Unit "meter"
 *  |      |___Unit "inch"
 *  |      |___ (...)
 *  |____Group "mass"
 *  |      |___Unit "kilogram"
 *  |      |___Unit "pound"
 *  |      |___ (...)
 *  |____Group "custom"
 *  |      |___Unit "small coins"
 *  |      |___Unit "big coins"
 * 
 * ```
 * 
 * Collections are not static. In fact they are very flexible. You can add, overwrite and remove unit groups using the {@link Collection.Editor}.
 * Added to that groups are editable in the same way (see {@link Group.Editor}), 
 * which leads to the fact that groups can be modified in their entirety at runtime.
 */
export default class Collection {
    /**
     * @hidden
     */
    public static readonly None = new Collection();

    /**
     * All units of the collection arranged in a map. This map is used to improve performance.
     * @hidden
     */
    private readonly units = new Map<string, Unit>();

    /**
     * All groups of the collection arranged in a map.
     */
    private readonly groups = new Map<string, Group>();

    /**
     * These methods are only used internally.
     * @hidden
     */
    readonly _internal = {
        /**
         * Adds a string-unit-association to the {@link units} map.
         * @param name the unit's string representation
         * @param unit the unit
         */
        _setUnit: (name: string, unit: Unit) => {
            this.units.set(name, unit);
        },

        /**
         * Removes a string-unit-association from the {@link units} map.
         * @param name the unit's string representation
         */
        _deleteUnit: (name: string) => {
            this.units.delete(name);
        },

        /**
         * Returns the collection's groups.
         * @returns 
         */
        _groups: () => this.groups,

        _units: () => this.units,
    }

    /**
     * The collection's editor. Provides methods to add, remove and overwrite unit groups.
     * 
     * @see CollectionEditor
     */
    readonly Editor = new CollectionEditor(this);

    /**
     * Creates a new collection.
     */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {

    }

    /**
     * Returns a string array containing the short names of all units.
     * @returns a string array containing the short names of all units
     */
    possibilities() {
        const units: Unit[] = [];
        const keys: string[] = [];
        this.units.forEach((unit, key) => {
            if (!units.includes(unit)) {
                units.push(unit);
                keys.push(key);
            }
        });
        return keys;
    }

    /**
     * Returns whether the passed unit is supported.
     * @param unit the unit
     * @returns whether the passed unit is supported
     */
    isSupported(unit: string) {
        return Boolean(this.units.get(unit));
    }

    /**
     * Returns the unit object belonging to the given unit.
     * @param unit the unit as string
     * @returns the unit object belonging to the given unit string
     * @see Unit
     */
    unit(unit: string) {
        const result = this.units.get(unit);
        if (!result) throw new UnknownUnitError(`Unknown unit '${unit}'!`);
        return result;
    }

    /**
     * Returns the group having the passed name.
     * @param group the group's name
     * @returns the group itself
     * @see Group
     */
    group(group: string) {
        const result = this.groups.get(group);
        if (!result) throw new UnknownGroupError(`Unknown unit '${group}'!`);
        return result;
    }

    /**
     * Returns a convertible having the given value and unit. Does exactly the same as {@link Collection.Convertible}.
     * @param value the convertible's value (e.g. `20`)
     * @param unit the convertible's unit (e.g. `°F`)
     * @returns a convertible having the given value and unit
     * @see Convertible
     */
    from(value: number, unit: string) {
        return new Convertible(value, this.unit(unit));
    }

    /**
     * Returns a convertible having the given value and unit. Alias to {@link Collection.from}.
     * @param value the convertible's value (e.g. `20`)
     * @param unit the convertible's unit (e.g. `°F`)
     * @returns a convertible having the given value and unit
     * @see Convertible
     */
    Convertible(value: number, unit: string): Convertible {
        return this.from(value, unit);
    }

    /**
     * Returns the collection as human-readable string.
     * @returns the collection as string
     */
    toString() {
        let result = "Collection [\n";
        this.groups.forEach((group, key) => {
            result += `  Group '${key}' [\n    `;
            const possibilities = group.possibilities();
            for (let i = 0; i < possibilities.length; i++) {
                result += possibilities[i];
                if (i + 1 === possibilities.length) result += "\n";
                else if ((i + 1) % 12 === 0) result += ",\n    ";
                else result += ", ";
            }
            result += "  ],\n"
        });
        result += "]";
        return result;
    }

    /**
     * @hidden
     */
    [inspect.custom](depth: any, options: any) {
        let result = "Collection [\n";
        this.groups.forEach((group, key) => {
            result += `  Group `;
            result += options.stylize(`'${key}'`, "string");
            result += ` [\n    `;
            const possibilities = group.possibilities();
            for (let i = 0; i < possibilities.length; i++) {
                result += options.stylize(possibilities[i], "special");
                if (i + 1 === possibilities.length) result += "\n";
                else if ((i + 1) % 12 === 0) result += ",\n    ";
                else result += ", ";
            }
            result += "  ],\n"
        });
        result += "]";
        return result;
    }
}