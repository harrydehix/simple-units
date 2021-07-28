import UnitGroups from "./collections/groups/UnitGroups";
import UnitPreferenceError from "./errors/UnitPreferenceError";
import Unit from "./Unit";

export default class UnitPreferences {
    [groupname: number]: Unit,

    constructor(preferences: { [groupname: number]: Unit }) {
        Object.assign(this, preferences);
    }

    validate<T extends UnitGroups>(groups: T) {
        for (const group in this) {
            const groupNumber = Number(group);
            const desiredUnit = this[group];
            if (desiredUnit.group !== groupNumber)
                throw new UnitPreferenceError(`Unit ${this[group]} does not belong to group '${groups.getName(groupNumber)}'!`)
        }
    }
}