import { inspect } from "util";
import Collection from "./Collection";
import Convertable from "./Convertable";
import UnknownUnitError from "./errors/UnknownUnitError";
import FlexibleUnit from "./FlexibleUnit";
import Unit from "./Unit";

export default class Group {
    public static None = new Group("none");

    private units = new Map<string, Unit>();
    collection: Collection = Collection.None;
    name: string;

    readonly _internal = {
        _units: () => {
            return this.units;
        },
    }

    readonly Editor = {
        add: (...units: (FlexibleUnit | Unit)[]) => {
            const hasCollection = this.collection !== Collection.None;
            for (const unit of units) {
                if (unit instanceof FlexibleUnit) {
                    this.Editor.add(...unit._units);
                } else {
                    unit.group = this;
                    if (this.units.get(unit.toString())) {
                        this.Editor.remove(unit.toString());
                    }
                    const keys = unit.format.short.concat(unit.format.long.pl, unit.format.long.sg);
                    for (const key of keys) {
                        this.units.set(key, unit);
                        if (hasCollection) this.collection._internal._setUnit(key, unit);
                    }
                }
            }
        },

        remove: (...units: string[]) => {
            const hasCollection = this.collection !== Collection.None;
            for (const unit of units) {
                const resolvedUnit = this.units.get(unit);
                if (resolvedUnit) {
                    const keys = resolvedUnit.format.short.concat(resolvedUnit.format.long.pl, resolvedUnit.format.long.sg);
                    for (const key of keys) {
                        this.units.delete(key);
                        if (hasCollection) this.collection._internal._deleteUnit(key);
                    }
                }
            }
        }
    };

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

    constructor(name: string) {
        this.name = name;
    }

    unit(unit: string) {
        const result = this.units.get(unit);
        if (!result) throw new UnknownUnitError(`Unknown unit '${unit}'!`);
        return result;
    }

    from(value: number, unit: string) {
        return new Convertable(value, this.unit(unit));
    }
    Convertable = this.from;

    isSupported(unit: string) {
        return Boolean(this.units.get(unit));
    }

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