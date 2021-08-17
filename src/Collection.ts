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
    groups: Group[] = [];
    settings: CollectionSettings = {
        symbols: Symbols.ALL
    }

    setGroups(...groups: Group[]) {
        this.groups = groups;
        for (const group of groups) {
            group.collection = this;
        }
    }

    addGroups(...groups: Group[]) {
        this.groups.push(...groups);
        for (const group of groups) {
            group.collection = this;
        }
    }

    setSettings(settings: Partial<CollectionSettings>) {
        this.settings = Object.assign(this.settings, settings);
    }

    group(groupname: string) {
        const group = this.groups.find((group) => group.name === groupname);
        if (!group) throw new Error(`Cannot get group '${groupname}'. Group doesn't exist.`);
        return group;
    }

    unit(identifier: string) {
        for (const group of this.groups) {
            const unit = group.tryToFindUnit(identifier);
            if (unit) return unit;
        }
        throw new Error(`Cannot get unit '${identifier}'. Unit doesn't exist.`);
    }

    overrideGroup(groupname: string, group: Group) {
        const index = this.groups.findIndex((group) => group.name === groupname);
        if (index !== -1) {
            this.groups[index] = group;
            group.collection = this;
        }
        else throw new Error(`Cannot override group '${groupname}'. Group doesn't exist.`);
    }

    getUnit(identifier: string) {
        for (const group of this.groups) {
            const unit = group.tryToFindUnit(identifier);
            if (unit) return unit;
        }
    }

    isSupported(identifier: string): boolean {
        return this.getUnit(identifier) !== undefined;
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
            const convertible = group._from(value, unit);
            if (convertible) return convertible;
        }
        throw new Error(`Didn't find unit '${unit}'!`);
    }

    Convertable = this.from;

    [inspect.custom](depth: any, options: any): string {
        let result = `Collection [\n`;
        for (let i = 0; i < this.groups.length; i++) {
            result += this.groups[i].inspectWithIndent(3, depth, options)
            if (i + 1 !== this.groups.length) result += ",\n";
            else result += "\n";
        }
        result += "]";
        return result;
    }

    toString(): string {
        let result = `Collection [\n`;
        for (let i = 0; i < this.groups.length; i++) {
            result += this.groups[i].toStringWithIndent(3)
            if (i + 1 !== this.groups.length) result += ",\n";
            else result += "\n";
        }
        result += "]";
        return result;
    }
}