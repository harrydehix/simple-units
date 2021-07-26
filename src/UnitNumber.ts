import Unit from "./Unit";
import { inspect } from "util";
import UnitPreferences from "./UnitPreference";
import UnitCollection from "./collections/UnitCollection";
import ConversionError from "./errors/ConversionError";

export default class UnitNumber {
    public value: number;
    public unit: Unit;

    constructor(value: number, unit: Unit) {
        this.value = value;
        this.unit = unit;
    }

    public static parse<T extends UnitCollection<any>>(text: string, collection: T) {
        let numberString = "";
        let unitString = "";
        let dot = false;
        let finishedNumber = false;
        for (const char of text) {
            if (!finishedNumber) {
                if (char.match(/[0-9]/)) numberString += char;
                else if (char.match(/(\.|,)/)) {
                    if (!dot) {
                        numberString += ".";
                        dot = true;
                    }
                    else finishedNumber = true;
                } else {
                    finishedNumber = true;
                    unitString += char;
                }
            } else {
                unitString += char;
            }
        }
        try {
            const parsedNumber = Number.parseFloat(numberString);
            const parsedUnit = collection.parseUnit(unitString);
            return new UnitNumber(parsedNumber, parsedUnit);
        } catch (err) {
            throw new Error(`Failed to parse '${text}'!`);
        }
    }

    public toUnit(targetUnit: Unit): number {
        if (targetUnit === this.unit) return this.value;
        const converter = this.unit.findConverter(targetUnit);
        if (!converter) throw new ConversionError(`Cannot convert from ${this.unit.toString()} to ${targetUnit.toString()}!`);
        this.value = converter.convert(this.value);
        this.unit = targetUnit;
        return this.value;
    }

    public assignPreferences(preferences: UnitPreferences): boolean {
        const groupName = this.unit.group;
        if (groupName && preferences[groupName]) {
            this.toUnit(preferences[groupName]);
            return true;
        }
        return false;
    }

    [inspect.custom](depth: any, options: any): string {
        return options.stylize(this.toString(), "special");
    }

    toString(): string {
        return `${this.value}${this.unit.toString()}`
    }
}