import Unit from "../Unit";
import Convertable from "../Convertable";
import GroupSettings, { PreferenceLike } from "../GroupSettings";
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

    GroupSettings(preferences: PreferenceLike<this>): GroupSettings<this> {
        return new GroupSettings(preferences, this);
    }

    convertByGroup(data: ConvertableData<this>, preferences: GroupSettings<this>): ConvertableData<this> {
        if (data instanceof Convertable) {
            data.assignPreferences(preferences);
            return data;
        } else if (data instanceof Array) {
            data.forEach((element, index) => {
                element = this.convertByGroup(element, preferences);
                data[index] = element;
            });
            return data;
        } else if (typeof data === "object") {
            for (const property in data) {
                data[property] = this.convertByGroup(data[property], preferences);
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
                if (propertyValue.isUnit(unitString)) return propertyValue;
            }
        }
    }

    parseUnit(unitString: string): Unit<this> {
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.isUnit(unitString)) return propertyValue;
            }
        }
        unitString = unitString.trim();
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.isUnit(unitString)) return propertyValue;
            }
        }
        throw new ParseError(`Failed to parse unit '${unitString}'!`)
    }
}