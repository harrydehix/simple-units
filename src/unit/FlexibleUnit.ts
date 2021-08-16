import { product } from "cartesian-product-generator";
import { EventEmitter } from "stream";
import dividedByTimes from "../multiplicators/dividedByTimes";
import Multiplicator from "../multiplicators/Multiplicator";
import siPrefixes from "../multiplicators/siPrefixes";
import Variable from "../multiplicators/Variable";
import SelectedUnit from "../SelectedUnit";
import { Converter } from "./Converter";
import Formats from "./formatting/Formats";
import Unit from "./Unit";

export class Definition {
    private definition: (Variable | [null])[];
    private index = 0;

    private constructor() {
        this.definition = [];
    }

    var(variable: Variable) {
        this.definition.push(variable);
        return this;
    }

    base() {
        this.definition.push([null]);
        return this;
    }

    static var(variable: Variable) {
        return new Definition().var(variable);
    }

    static base() {
        return new Definition().base();
    }

    product(): IterableIterator<(Multiplicator | null)[]> {
        return product(...this.definition) as IterableIterator<(Multiplicator | null)[]>;
    }
}

export default class FlexibleUnit extends Unit {
    definition: Definition;

    constructor(formats: Formats, toBase: Converter, fromBase: Converter, definition: Definition) {
        super(formats, toBase, fromBase);
        this.definition = definition;
    }

    private findCombinations(callback: (combo: string) => boolean) {
        for (const combination of this.definition.product()) {
            // short combinations
            const shorts = this.formats.shorts();
            for (const short of shorts) {
                let result = "";
                for (const item of combination) {
                    if (item instanceof Multiplicator) {
                        result += item.short;
                    } else {
                        result += short;
                    }
                }
                if (callback(result)) return;
            }
            // long combinations
            const longs = this.formats.longs();
            for (const long of longs) {
                let result = "";
                for (const item of combination) {
                    if (item instanceof Multiplicator) {
                        result += item.long;
                    } else {
                        result += long;
                    }
                }
                if (callback(result)) return;
            }
        }
    }

    private findCombinationsWithMultiplicators(callback: (combo: string, multiplicators: Multiplicator[]) => boolean) {
        for (const combination of this.definition.product()) {
            // short combinations
            const shorts = this.formats.shorts();
            for (const short of shorts) {
                let result = "";
                const multiplicators: Multiplicator[] = [];
                for (const item of combination) {
                    if (item instanceof Multiplicator) {
                        result += item.short;
                        multiplicators.push(item);
                    } else {
                        result += short;
                    }
                }
                if (callback(result, multiplicators)) return;
            }
            // long combinations
            const longs = this.formats.longs();
            for (const long of longs) {
                let result = "";
                const multiplicators: Multiplicator[] = [];
                for (const item of combination) {
                    if (item instanceof Multiplicator) {
                        result += item.long;
                        multiplicators.push(item);
                    } else {
                        result += long;
                    }
                }
                if (callback(result, multiplicators)) return;
            }
        }
    }

    isUnit(prefixedUnit: string): boolean {
        let result = false;
        this.findCombinations((combo) => {
            if (prefixedUnit === combo) {
                result = true;
                return true;
            }
            return false;
        });
        return result;
    }

    parse(prefixedUnit: string): SelectedUnit | undefined {
        let result;
        this.findCombinationsWithMultiplicators((combo, multiplicators) => {
            if (prefixedUnit === combo) {
                result = new SelectedUnit(this, multiplicators);
                return true;
            }
            return false;
        });
        return result;
    }
}
