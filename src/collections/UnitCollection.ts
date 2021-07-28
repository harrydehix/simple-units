import Unit from "../Unit";
import Convertable from "../Convertable";
import UnitPreferences from "../UnitPreferences";
import UnitGroups from "./groups/UnitGroups";
import ParseError from "../errors/ParseError";


export type ConvertableData = {
    [property: string]: Convertable | ConvertableData | any,
    [property: number]: Convertable | ConvertableData | any,
} | Convertable | (Convertable | any)[];

export default abstract class UnitCollection<T extends UnitGroups> {
    public Groups: T;

    public constructor(groups: T) {
        this.Groups = groups;
    }

    Convertable(value: number | string, unit?: Unit): Convertable {
        if (typeof value === "string" && !unit) return Convertable.parse(value, this);
        else if (unit) return new Convertable(Number(value), unit, this);
        else throw new Error("Invalid arguments.");
    }

    convertWithPreferences(data: ConvertableData, preferences: UnitPreferences): ConvertableData {
        preferences.validate(this.Groups);
        if (data instanceof Convertable) {
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

    getUnit(unitString: string): Unit | undefined {
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.stringRepresentation === unitString) return propertyValue;
            }
        }
    }

    parseUnit(unitString: string): Unit {
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.stringRepresentation === unitString) return propertyValue;
            }
        }
        unitString = unitString.trim();
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.stringRepresentation === unitString) return propertyValue;
            }
        }
        throw new ParseError(`Failed to parse unit '${unitString}'!`)
    }
}