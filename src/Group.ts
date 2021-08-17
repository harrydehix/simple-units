import { inspect } from "util";
import Collection from "./Collection";
import Convertable from "./convertable/Convertable";
import ConvertableParser from "./convertable/ConvertableParser";
import Unit from "./unit/Unit";

export default class Group {
    name: string;
    collection = new Collection();
    units: Unit[] = [];

    constructor(name: string) {
        this.name = name;
    }

    setUnits(...units: Unit[]) {
        this.units = units;
        for (const unit of units) {
            unit.group = this;
        }
    }

    unit(identifier: string) {
        const unit = this.units.find((unit) => unit.isUnit(identifier));
        if (!unit) throw new Error(`Cannot get unit '${identifier}'. Unit doesn't exist.`);
        return unit;
    }

    tryToFindUnit(identifier: string) {
        return this.units.find((unit) => unit.isUnit(identifier));
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

    _from(value: number, unit: string): Convertable | undefined {
        return ConvertableParser.parse(value, unit, this);
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

    inspectWithIndent(indent: number, depth: any, options: any) {
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
    }

    toStringWithIndent(indent: number) {
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