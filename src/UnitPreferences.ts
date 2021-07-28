import UnitGroups from "./collections/groups/UnitGroups";
import UnitCollection from "./collections/UnitCollection";
import UnitPreferenceError from "./errors/UnitPreferenceError";
import Unit from "./Unit";

export type PreferenceLike<C extends UnitCollection<any>> = { [groupname: number]: Unit<C> };

export default class UnitPreferences<C extends UnitCollection<any>> {
    [groupname: number]: Unit<C>,

    constructor(preferences: PreferenceLike<C>, collection: C) {
        Object.assign(this, preferences);
        this.validate(collection.Groups);
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