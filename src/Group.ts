import { inspect } from "util";
import Collection from "./Collection";
import Convertable from "./convertable/Convertable";
import ConvertableParser from "./convertable/ConvertableParser";
import Unit from "./unit/Unit";

export default class Group {
    name: string;
    private _collection = new Collection();
    private units: Unit[] = [];
    readonly _internal = {
        _possibilities: () => {
            const possibilities = [];
            for (const unit of this.units) possibilities.push(unit.toString());
            return possibilities;
        },

        _tryToFindUnit: (identifier: string) => {
            return this.units.find((unit) => unit.validate(identifier));
        },

        _from: (value: number, unit: string): Convertable | undefined => {
            return ConvertableParser.parse(value, unit, this);
        },

        _inspectWithIndent: (indent: number, depth: any, options: any) => {
            let result = "";
            for (let k = 0; k < indent; k++) result += " ";
            result += "Group " + options.stylize(`'${this.name}'`, "string") + " [\n  ";
            for (let k = 0; k < indent; k++) result += " ";
            for (let i = 0; i < this.units.length; i++) {
                const unit = this.units[i];
                result += options.stylize(`${unit.toString()}`, "special");
                if ((i + 1) === this.units.length) {
                    result += "\n";
                    for (let k = 0; k < indent; k++) result += " ";
                } else if ((i + 1) % 12 === 0) {
                    result += "\n  ";
                    for (let k = 0; k < indent; k++) result += " ";
                } else {
                    result += ", ";
                }
            }
            result += "]";
            return result;
        },

        _toStringWithIndent: (indent: number) => {
            let result = "";
            for (let k = 0; k < indent; k++) result += " ";
            result += "Group " + `'${this.name}'` + " [\n  ";
            for (let k = 0; k < indent; k++) result += " ";
            for (let i = 0; i < this.units.length; i++) {
                const unit = this.units[i];
                result += unit.toString()
                if ((i + 1) === this.units.length) {
                    result += "\n";
                    for (let k = 0; k < indent; k++) result += " ";
                } else if ((i + 1) % 12 === 0) {
                    result += "\n  ";
                    for (let k = 0; k < indent; k++) result += " ";
                } else {
                    result += ", ";
                }
            }
            result += "]";
            return result;
        }
    }

    readonly Editor = {
        add: (...units: Unit[]) => {
            for (const unit of units) {
                if (this._internal._tryToFindUnit(unit.identifier)) throw new Error(`Unit '${unit.identifier}' already exists!`);
                unit.group = this;
            }
            this.units.push(...units);
        },

        remove: (identifier: string) => {
            this.units = this.units.filter((unit) => unit.identifier !== identifier);
        },

        override: (identifier: string, unit: Unit) => {
            this.Editor.remove(identifier);
            this.Editor.add(unit);
        }
    }

    constructor(name: string) {
        this.name = name;
    }

    set collection(collection: Collection) {
        this._collection = collection;
    }

    get collection() {
        return this._collection;
    }

    * iterator(): IterableIterator<Unit> {
        for (const unit of this.units) yield unit;
    }

    unit(identifier: string) {
        const unit = this.units.find((unit) => unit.validate(identifier));
        if (!unit) throw new Error(`Cannot get unit '${identifier}'. Unit doesn't exist.`);
        return unit;
    }

    from(value: string): Convertable;
    from(value: number, unit: string): Convertable;
    from(value: number | string, unit?: string): Convertable {
        if (typeof value === "string") {
            const result = ConvertableParser.divide(value);
            value = result[0];
            unit = result[1];
        }
        if (!unit)
            throw new Error(`Missing unit in '${value}'!`);
        const result = ConvertableParser.parse(value, unit, this);
        if (!result)
            throw new Error(`Didn't find unit '${unit}'!`);
        return result;
    }

    [inspect.custom](depth: any, options: any): string {
        let result = "Group " + options.stylize(`'${this.name}'`, "string") + " [\n  ";
        for (let i = 0; i < this.units.length; i++) {
            const unit = this.units[i];
            result += options.stylize(`${unit.toString()}`, "special");
            if ((i + 1) === this.units.length) {
                result += "\n";
            } else if ((i + 1) % 12 === 0) {
                result += "\n  ";
            } else {
                result += ", ";
            }
        }
        result += "]";
        return result;
    }

    toString(): string {
        let result = `Group '${this.name}' [\n  `;
        for (let i = 0; i < this.units.length; i++) {
            const unit = this.units[i];
            result += unit.toString()
            if ((i + 1) === this.units.length) {
                result += "\n";
            } else if ((i + 1) % 12 === 0) {
                result += "\n  ";
            } else {
                result += ", ";
            }
        }
        result += "]";
        return result;
    }


}