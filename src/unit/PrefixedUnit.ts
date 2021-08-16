
import Multiplicator from "../multiplicator/Multiplicator";
import Variable from "../multiplicator/Variable";
import SelectedUnit from "../SelectedUnit";
import { Converter } from "./Converter";
import Formats from "./formatting/Formats";
import Unit from "./Unit";

export default class PrefixedUnit extends Unit {
    private readonly prefixes: Variable;

    constructor(formats: Formats, toBase: Converter, fromBase: Converter, prefixes: Variable) {
        super(formats, toBase, fromBase);
        this.prefixes = prefixes;
    }

    parse(prefixedUnit: string): SelectedUnit | undefined {
        const multiplicator = this.findMultiplicator(prefixedUnit);
        if (multiplicator) {
            return new SelectedUnit(this, [multiplicator]);
        }
        else return undefined;
    }

    isPlainUnit(unit: string): boolean {
        return this.formats.shorts().includes(unit) || this.formats.longs().includes(unit);
    }

    isUnit(unit: string): boolean {
        for (const short of this.formats.shorts()) {
            for (const prefix of this.prefixes) {
                if (prefix.short + short === unit) return true;
            }
        }
        for (const long of this.formats.longs()) {
            for (const prefix of this.prefixes) {
                if (prefix.long + long === unit) return true;
            }
        }
        return false;
    }

    private findMultiplicator(prefixedUnit: string): Multiplicator | undefined {
        for (const short of this.formats.shorts()) {
            for (const prefix of this.prefixes) {
                if (prefix.short + short === prefixedUnit) return prefix;
            }
        }
        for (const long of this.formats.longs()) {
            for (const prefix of this.prefixes) {
                if (prefix.long + long === prefixedUnit) return prefix;
            }
        }
    }
}