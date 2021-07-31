import UnitGroups from "./collections/groups/UnitGroups";
import UnitCollection from "./collections/UnitCollection";
import UnitPreferenceError from "./errors/UnitPreferenceError";
import Unit from "./Unit";

export type DesiredGroupSettings<C extends UnitCollection<any>> = { [groupname: number]: Unit<C> | string };
export type ResolvedGroupSettings<C extends UnitCollection<any>> = { [groupname: number]: Unit<C> };

export default class GroupSettings<C extends UnitCollection<any>> {
    [groupname: number]: Unit<C>,

    constructor(groupSettings: DesiredGroupSettings<C>, collection: C) {
        groupSettings = this.resolveUnitStrings(groupSettings, collection);
        Object.assign(this, groupSettings);
        this.validate(collection.Groups);
    }

    private resolveUnitStrings(settings: DesiredGroupSettings<C>, collection: C): ResolvedGroupSettings<C> {
        for (const property in settings) {
            let value = settings[property];
            if (typeof value === "string") {
                value = collection.parse(value);
            }
            settings[property] = value;
        }
        return settings as ResolvedGroupSettings<C>;
    }

    private validate<T extends UnitGroups>(groups: T) {
        for (const group in this) {
            const groupNumber = Number(group);
            const desiredUnit = this[group];
            if (desiredUnit.group !== groupNumber)
                throw new UnitPreferenceError(`Unit ${this[group]} does not belong to group '${groups.getName(groupNumber)}'!`)
        }
    }
}