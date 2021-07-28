import Unit from "../Unit";
import Convertable from "../Convertable";
import UnitPreferences, { PreferenceLike } from "../UnitPreferences";
import UnitGroups from "./groups/UnitGroups";
import ParseError from "../errors/ParseError";


export type ConvertableData<T extends UnitCollection<any>> = {
    [property: string]: Convertable<T> | ConvertableData<T> | any,
    [property: number]: Convertable<T> | ConvertableData<T> | any,
} | Convertable<T> | (Convertable<T> | any)[];

export default abstract class UnitCollection<G extends UnitGroups> {
    public Groups: G;

    public constructor(groups: G) {
        this.Groups = groups;
    }

    Convertable(value: number | string, unit?: Unit<this>): Convertable<this> {
        if (typeof value === "string" && !unit) return Convertable.parse(value, this);
        else if (unit) return new Convertable(Number(value), unit, this);
        else throw new Error("Invalid arguments.");
    }

    Preferences(preferences: PreferenceLike<this>): UnitPreferences<this> {
        return new UnitPreferences(preferences, this);
    }

    convertWithPreferences(data: ConvertableData<this>, preferences: UnitPreferences<this>): ConvertableData<this> {
        //preferences.validate(this.Groups);
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

    getUnit(unitString: string): Unit<this> | undefined {
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.stringRepresentation === unitString) return propertyValue;
            }
        }
    }

    parseUnit(unitString: string): Unit<this> {
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