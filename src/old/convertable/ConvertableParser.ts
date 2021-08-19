import Convertable from "./Convertable";
import Group from "../Group";
import Collection, { Symbols } from "../Collection";

export default class ConvertableParser {
    static divide(text: string): [number, string] {
        // Parse number
        let number = "";
        let isFloated = false;
        let i = 0;
        for (i; i < text.length; i++) {
            const character = text[i];
            if (character.match(/[0-9]/)) {
                number += character;
            } else if (character === ".") {
                if (isFloated) break;
                number += character;
                isFloated = true;
            } else {
                break;
            }
        }
        if (i === text.length) throw new Error("No unit detected!");
        const parsedNumber = Number.parseFloat(number);
        if (isNaN(parsedNumber)) throw new Error("No number detected!");

        return [parsedNumber, text.substr(i).trim()];
    }

    static parseCollection(value: number, identifier: string, collection: Collection, symbols?: Symbols): Convertable | undefined {
        const unit = collection._internal._tryToFindUnit(identifier, symbols);
        if (!unit) return undefined;
        return new Convertable(value, unit);
    }

    static parseGroup(value: number, identifier: string, group: Group, symbols?: Symbols): Convertable | undefined {
        const unit = group._internal._tryToFindUnit(identifier, symbols);
        if (!unit) return undefined;
        return new Convertable(value, unit);
    }
}