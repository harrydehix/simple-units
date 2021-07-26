import Unit from "../Unit";
import UnitNumber from "../UnitNumber";
import UnitPreferences from "../UnitPreference";
import UnitGroups from "./groups/UnitGroups";


export type ConvertableData = {
    [property: string]: UnitNumber | ConvertableData | any,
    [property: number]: UnitNumber | ConvertableData | any,
} | UnitNumber | (UnitNumber | any)[];

export default abstract class UnitCollection<T extends UnitGroups> {
    public Groups: T;

    public constructor(groups: T) {
        this.Groups = groups;
    }

    convert(value: number, sourceUnit: Unit, targetUnit: Unit) {
        return new UnitNumber(value, sourceUnit).toUnit(targetUnit);
    }

    convertWithPreferences(data: ConvertableData, preferences: UnitPreferences): ConvertableData {
        preferences.validate(this.Groups);
        if (data instanceof UnitNumber) {
            data.assignPreferences(preferences);
            return data;
        } else if (data instanceof Array) {
            data.forEach((element, index) => {
                element = this.convertWithPreferences(element, preferences);
                data[index] = element;
            });
            return data;
        } else if (typeof data === "object") {
            for (const property in data) {
                data[property] = this.convertWithPreferences(data[property], preferences);
            }
            return data;
        } else {
            return data;
        }
    }

    parseUnit(unitString: string): Unit {
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.stringRepresentation === unitString) return propertyValue;
            }
        }
        throw new Error(`Failed to parse unit '${unitString}'!`);
    }
}