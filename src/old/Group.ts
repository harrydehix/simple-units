import { inspect } from "util";
import Collection, { Symbols } from "./Collection";
import Convertable from "./convertable/Convertable";
import ConvertableParser from "./convertable/ConvertableParser";
import Unit from "./unit/Unit";

export default class Group {
    name: string;
    private _collection = new Collection();
    _units: Unit[] = [];
    readonly _internal = {
        _possibilities: () => {
            const possibilities = [];
            for (const unit of this._units) possibilities.push(unit.toString());
            return possibilities;
        },

        _tryToFindUnit: (identifier: string, symbols?: Symbols) => {
            return this._units.find((unit) => unit.validate(identifier, symbols));
        },

        _from: (value: number, unit: string): Convertable | undefined => {
            return ConvertableParser.parseGroup(value, unit, this);
        },

        _inspectWithIndent: (indent: number, depth: any, options: any) => {
            let result = "";
            for (let k = 0; k < indent; k++) result += " ";
            result += "Group " + options.stylize(`'${this.name}'`, "string") + " [\n  ";
            for (let k = 0; k < indent; k++) result += " ";
            for (let i = 0; i < this._units.length; i++) {
                const unit = this._units[i];
                result += options.stylize(`${unit.toString()}`, "special");
                if ((i + 1) === this._units.length) {
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
            for (let i = 0; i < this._units.length; i++) {
                const unit = this._units[i];
                result += unit.toString()
                if ((i + 1) === this._units.length) {
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
                if (this._internal._tryToFindUnit(unit.identifier, Symbols.SINGLE)) throw new Error(`Unit '${unit.identifier}' already exists!`);
                unit.group = this;
            }
            this._units.push(...units);
            this.collection._internal._addUnits(...units);
        },

        remove: (exactIdentifier: string) => {
            const unitToRemove = this._units.find((unit) => unit.validate(exactIdentifier, Symbols.SINGLE));
            if (!unitToRemove) return;
            this._units = this._units.filter((unit) => unit !== unitToRemove);
            this.collection._internal._removeUnit(unitToRemove);
        },

        override: (exactIdentifier: string, unit: Unit) => {
            this.Editor.remove(exactIdentifier);
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
        for (const unit of this._units) yield unit;
    }

    unit(identifier: string) {
        const unit = this._units.find((unit) => unit.validate(identifier));
        if (!unit) throw new Error(`Cannot get unit '${identifier}'. Unit doesn't exist.`);
        return unit;
    }

    from(value: string, symbols?: Symbols): Convertable;
    from(value: number, unit: string, symbols?: Symbols): Convertable;
    from(value: number | string, unit?: string | Symbols, symbols?: Symbols): Convertable {
        if (typeof value === "string") {
            const result = ConvertableParser.divide(value);
            value = result[0];
            if (typeof unit === "number") symbols = unit;
            unit = result[1];
        }
        if (!unit || typeof unit === "number")
            throw new Error(`Missing unit in '${value}'!`);
        const result = ConvertableParser.parseGroup(value, unit, this, symbols);
        if (!result)
            throw new Error(`Didn't find unit '${unit}'!`);
        return result;
    }

    [inspect.custom](depth: any, options: any): string {
        let result = "Group " + options.stylize(`'${this.name}'`, "string") + " [\n  ";
        for (let i = 0; i < this._units.length; i++) {
            const unit = this._units[i];
            result += options.stylize(`${unit.toString()}`, "special");
            if ((i + 1) === this._units.length) {
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
        for (let i = 0; i < this._units.length; i++) {
            const unit = this._units[i];
            result += unit.toString()
            if ((i + 1) === this._units.length) {
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