import Unit from "../Unit";
import Convertable from "../Convertable";
import GroupSettings, { DesiredGroupSettings } from "../GroupSettings";
import UnitGroups from "./groups/UnitGroups";
import ParseError from "../errors/ParseError";
import ConversionError from "../errors/ConversionError";


export type ConvertableData<T extends UnitCollection<any>> = {
    [property: string]: Convertable<T> | ConvertableData<T> | any,
    [property: number]: Convertable<T> | ConvertableData<T> | any,
} | Convertable<T> | (Convertable<T> | any)[];

export default abstract class UnitCollection<G extends UnitGroups> {
    public Groups: G;

    public constructor(groups: G) {
        this.Groups = groups;
    }

    Convertable(value: number | string, unit?: Unit<this> | string): Convertable<this> {
        if (typeof value === "string" && !unit) return Convertable.parse(value, this);
        else if (unit) return new Convertable(Number(value), unit, this);
        else throw new Error("Invalid arguments.");
    }

    from = this.Convertable;

    GroupSettings(preferences: DesiredGroupSettings<this>): GroupSettings<this> {
        return new GroupSettings(preferences, this);
    }

    convertByGroup(data: ConvertableData<this>, preferences: GroupSettings<this>): ConvertableData<this> {
        if (data instanceof Convertable) {
            data.convertByGroupSettings(preferences);
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

    find(unitString: string): Unit<this> {
        for (const property in this) {
            const propertyValue = this[property];
            if (propertyValue instanceof Unit) {
                if (propertyValue.isUnit(unitString)) return propertyValue;
            }
        }
        throw new Error(`'${unitString}' is not a valid unit!`)
    }

    parse(unitString: string): Unit<this> {
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