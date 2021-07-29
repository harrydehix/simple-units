import Unit from "../Unit";
import { inspect } from "util";
import GroupSettings from "../GroupSettings";
import UnitCollection from "../collections/UnitCollection";
import ConversionError from "../errors/ConversionError";
import ParseError from "../errors/ParseError";

export default class Convertable<C extends UnitCollection<any>> {
    public value: number;
    public unit: Unit<C>;
    public readonly collection: C;

    constructor(value: number, unit: Unit<C> | string, collection: C) {
        this.value = value;
        if (typeof unit === "string") {
            unit = collection.parseUnit(unit);
        }
        this.unit = unit;
        this.collection = collection;
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
        const parsedNumber = Number.parseFloat(numberString);
        if (Number.isNaN(parsedNumber)) throw new ParseError(`Failed to parse '${text}'. Invalid number format.`);
        return new this(parsedNumber, unitString, collection);
    }

    public setUnit(targetUnit: Unit<C> | string): this {
        if (typeof targetUnit === "string") {
            targetUnit = this.collection.parseUnit(targetUnit);
        }
        if (targetUnit === this.unit) return this;
        const converter = this.unit.findConverter(targetUnit);
        if (!converter) throw new ConversionError(`Cannot convert from ${this.unit.toString()} to ${targetUnit.toString()}!`);
        this.value = converter.convert(this.value);
        this.unit = targetUnit;
        return this;
    }

    public to(targetUnit: Unit<C> | string): number {
        this.setUnit(targetUnit);
        return this.value;
    }

    public convertByGroupSettings(groupSettings: GroupSettings<C>): boolean {
        const groupName = this.unit.group;
        if (groupName && groupSettings[groupName]) {
            this.setUnit(groupSettings[groupName]);
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