import { inspect } from "util";
import Convertable from "./convertable/Convertable";
import ConvertableParser from "./convertable/ConvertableParser";
import Group from "./Group";
import Unit from "./unit/Unit";

export enum Symbols {
    ALL,
    SHORTS,
    LONGS,
    SINGLE
}

export type CollectionSettings = {
    symbols: Symbols,
}

export default class Collection {
    private groups: Group[] = [];
    private units: Unit[] = [];
    readonly _internal = {
        _tryToFindUnit: (identifier: string, symbols?: Symbols) => {
            return this.units.find((unit) => unit.validate(identifier, symbols));
        },

        _tryToFindGroup: (groupname: string) => {
            return this.groups.find((group) => group.name === groupname);
        },

        _removeUnit: (unit: Unit) => {
            this.units = this.units.filter((collUnit) => collUnit !== unit);
        },

        _addUnits: (...units: Unit[]) => {
            this.units.push(...units);
        }
    }

    readonly Editor = {
        add: (...groups: Group[]) => {
            for (const group of groups) {
                if (this._internal._tryToFindGroup(group.name)) throw new Error(`Group '${group.name}' already exists!`);
                group.collection = this;
                this.units.push(...group._units);
            }
            this.groups.push(...groups);
        },

        remove: (groupname: string) => {
            const group = this.groups.find((group) => group.name === groupname);
            if (!group) return;
            this.groups = this.groups.filter((group) => group.name !== groupname);
            this.units = this.units.filter((unit) => {
                for (const groupUnit of group.iterator()) {
                    if (unit === groupUnit) return false;
                }
                return true;
            });
        },

        override: (groupname: string, group: Group) => {
            this.Editor.remove(groupname);
            this.Editor.add(group);
        }
    }

    private _settings: CollectionSettings = {
        symbols: Symbols.ALL
    }

    set settings(settings: Partial<CollectionSettings>) {
        this._settings = Object.assign(this._settings, settings);
    }

    get settings(): CollectionSettings {
        return this._settings;
    }

    group(groupname: string) {
        const group = this._internal._tryToFindGroup(groupname);
        if (group) return group;
        throw new Error("Invalid group!");
    }

    unit(identifier: string, symbols?: Symbols) {
        const unit = this._internal._tryToFindUnit(identifier, symbols);
        if (unit) return unit;
        throw new Error(`Cannot get unit '${identifier}'. Unit doesn't exist.`);
    }

    isSupported(identifier: string, symbols?: Symbols): boolean {
        return this._internal._tryToFindUnit(identifier, symbols) !== undefined;
    }

    * iterator(): IterableIterator<Group> {
        for (const group of this.groups) yield group;
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
        const convertible = ConvertableParser.parseCollection(value, unit, this, symbols);
        if (convertible) return convertible;
        throw new Error(`Didn't find unit '${unit}'!`);
    }

    Convertable = this.from;

    [inspect.custom](depth: any, options: any): string {
        let result = `Collection [\n`;
        let i = 0;
        for (const group of this.groups) {
            result += group._internal._inspectWithIndent(3, depth, options)
            if (i + 1 !== this.groups.length) result += ",\n";
            else result += "\n";
            i++;
        }
        result += "]";
        return result;
    }

    toString(): string {
        let result = `Collection [\n`;
        let i = 0;
        for (const group of this.groups) {
            result += group._internal._toStringWithIndent(3)
            if (i + 1 !== this.groups.length) result += ",\n";
            else result += "\n";
            i++;
        }
        result += "]";
        return result;
    }
}