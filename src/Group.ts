import { inspect } from "util";
import Collection from "./Collection";
import GroupEditor from "./GroupEditor";
import Unit from "./Unit";

/**
 * A group combines units of one quantity. Units of one group are convertible into each other.
 * A group is always part of one single {@link Collection}. Groups can be edited through the
 * {@link Group.Editor}. Like collections they can be modified in their entirety at runtime.
 * Each group has a unique name ({@link Group.name}) that serves as an id.
 * 
 * As said all units of one group are convertible into each other.
 * This works through the concept of "base units":
 * 
 * Every group has one single base unit. 
 * All other units of the group are defined in relation to this special unit.
 * In this way, the library can figure out any conversion between any units of one group.
 * 
 * <b>Example</b>:
 * 
 * You create the group "length".
 * ```
 * const length = new Group("length");
 * ```
 * You want to implement the units "meter", "inch" and "yard".
 * Now you have to decide on a unit that you want to be the base. You take "meter".
 * 
 * After that you have to define the other units in relation to your base unit.
 * You know: `1 inch = 0.0254 meter`. So you set the ratio to `0.0254` and the shift to `0`.
 * ```
 * const inch = new Unit({...}, 0.0254, 0, ...);
 * ```
 * You know aswell: `1 yard = 0.9144 meter`. So you set the ratio to `0.9144` and the shift to `0`.
 * ```
 * const yard = new Unit({...}, 0.9144, 0, ...);
 * ```
 * The base unit's ratio is always `1`, its shift is always `0` (because `1 meter = 1 meter`).
 * ```
 * const meter = new Unit({...}, 1, 0, ...);
 * ```
 * Now you finally have to add the units to your group. You can do that using the {@link Group.Editor}.
 * ```
 * length.add(inch, yard, meter);
 * ```
 * And you're done.
 */
export default class Group {
    /**
     * @hidden
     */
    public static None = new Group("none");

    /**
     * The units of the group.
     */
    private units = new Map<string, Unit>();

    /**
     * The group's collection.
     */
    collection: Collection = Collection.None;

    /**
     * The group's name. Has to be unique.
     */
    name: string;

    /**
     * @hidden
     */
    readonly _internal = {
        _units: () => {
            return this.units;
        },
    }

    /**
     * The group's editor. Provides methods to add, remove and overwrite units.
     *
     * @see GroupEditor
     */
    readonly Editor = new GroupEditor(this);

    /**
     * Returns a string array containing the short names of all units of this group.
     * @returns a string array containing the short names of all units of this group.
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
     * Creates a new group.
     * @param name the group's unique name
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Returns the group as human-readable string.
     * @returns the group as string
     */
    toString() {
        let result = `Group '${this.name}' [\n  `;
        const possibilities = this.possibilities();
        for (let i = 0; i < possibilities.length; i++) {
            result += possibilities[i];
            if (i + 1 === possibilities.length) result += "\n";
            else if ((i + 1) % 12 === 0) result += ",\n  ";
            else result += ", ";
        }
        result += "]";
        return result;
    }

    /**
     * @hidden
     */
    [inspect.custom](depth: any, options: any) {
        let result = `Group `;
        result += options.stylize(`'${this.name}'`, "string");
        result += ` [\n  `;
        const possibilities = this.possibilities();
        for (let i = 0; i < possibilities.length; i++) {
            result += options.stylize(possibilities[i], "special");
            if (i + 1 === possibilities.length) result += "\n";
            else if ((i + 1) % 12 === 0) result += ",\n  ";
            else result += ", ";
        }
        result += "]";
        return result;
    }
}

