import { inspect } from "util";
import Convertable from "./Convertable";
import UnknownGroupError from "./errors/UnknownGroupError";
import UnknownUnitError from "./errors/UnknownUnitError";
import Group from "./Group";
import Unit from "./SimpleUnit";

export default class Collection {
    public static None = new Collection();

    private units = new Map<string, Unit>();
    private groups = new Map<string, Group>();

    readonly _internal = {
        _setUnit: (name: string, unit: Unit) => {
            this.units.set(name, unit);
        },

        _deleteUnit: (name: string) => {
            this.units.delete(name);
        }
    }

    readonly Editor = {
        select: (...groups: string[]) => {
            const groupsToRemove: string[] = [];
            this.groups.forEach((group, key) => {
                if (!groups.includes(key)) groupsToRemove.push(key);
            });
            this.Editor.remove(...groupsToRemove);
        },

        add: (...groups: Group[]) => {
            for (const group of groups) {
                // Remove group if already existing
                if (this.groups.get(group.name)) {
                    this.Editor.remove(group.name);
                }
                // Add group
                group.collection = this;
                this.groups.set(group.name, group);

                const unitMap = group._internal._units();
                unitMap.forEach((unit, key) => {
                    this.units.set(key, unit);
                });
            }
        },

        remove: (...groups: string[]) => {
            for (const group of groups) {
                const resolvedGroup = this.groups.get(group);
                if (resolvedGroup) {
                    this.groups.delete(group);
                    resolvedGroup._internal._units().forEach((unit, key) => {
                        this.units.delete(key);
                    });
                }
            }
        },
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

    isSupported(unit: string) {
        return Boolean(this.units.get(unit));
    }

    unit(unit: string) {
        const result = this.units.get(unit);
        if (!result) throw new UnknownUnitError(`Unknown unit '${unit}'!`);
        return result;
    }

    group(group: string) {
        const result = this.groups.get(group);
        if (!result) throw new UnknownGroupError(`Unknown unit '${group}'!`);
        return result;
    }

    from(value: number, unit: string) {
        return new Convertable(value, this.unit(unit));
    }
    Convertable = this.from;

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