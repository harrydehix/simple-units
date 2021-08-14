import ConvertableParser from "./convertable/ConvertableParser";
import Group from "./Group";

export default class Collection {
    groups: Group[] = [];

    setGroups(...groups: Group[]) {
        this.groups = groups;
    }

    addGroups(...groups: Group[]) {
        this.groups.push(...groups);
    }

    getGroup(groupname: string) {
        const group = this.groups.find((group) => group.name === groupname);
        if (!group) throw new Error(`Cannot get group '${groupname}'. Group doesn't exist.`);
        return group;
    }

    overrideGroup(groupname: string, group: Group) {
        const index = this.groups.findIndex((group) => group.name === groupname);
        if (index !== -1) this.groups[index] = group;
        else throw new Error(`Cannot override group '${groupname}'. Group doesn't exist.`);
    }

    findUnit(prefixedUnit: string) {
        for (const group of this.groups) {
            const unit = group.findUnit(prefixedUnit);
            if (unit) return unit;
        }
    }

    isSupporting(prefixedUnit: string): boolean {
        return this.findUnit(prefixedUnit) !== undefined;
    }

    from(value: number | string, unit?: string) {
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
}