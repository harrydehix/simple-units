import { inspect } from "util";
import Convertable from "./convertable/Convertable";
import ConvertableParser from "./convertable/ConvertableParser";
import Group from "./Group";

export enum Symbols {
    ALL,
    SHORT_FORMS,
    LONG_FORMS,
    SINGLE_IDENTIFIER
}

export type CollectionSettings = {
    symbols: Symbols,
}

export default class Collection {
    private groups: Group[] = [];
    private readonly _internal = {
        _tryToFindUnit: (identifier: string) => {
            for (const group of this.groups) {
                const unit = group._internal._tryToFindUnit(identifier);
                if (unit) return unit;
            }
        },

        _tryToFindGroup: (groupname: string) => {
            return this.groups.find((group) => group.name === groupname);
        }
    }

    readonly Editor = {
        add: (...groups: Group[]) => {
            for (const group of groups) {
                if (this._internal._tryToFindGroup(group.name)) throw new Error(`Group '${group.name}' already exists!`);
                group.collection = this;
            }
            this.groups.push(...groups);
        },

        remove: (groupname: string) => {
            this.groups = this.groups.filter((group) => group.name !== groupname);
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

    unit(identifier: string) {
        for (const group of this.groups) {
            const unit = group._internal._tryToFindUnit(identifier);
            if (unit) return unit;
        }
        throw new Error(`Cannot get unit '${identifier}'. Unit doesn't exist.`);
    }

    isSupported(identifier: string): boolean {
        return this._internal._tryToFindUnit(identifier) !== undefined;
    }

    * iterator(): IterableIterator<Group> {
        for (const group of this.groups) yield group;
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
        for (const group of this.groups) {
            const convertible = group._internal._from(value, unit);
            if (convertible) return convertible;
        }
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