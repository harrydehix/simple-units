import { product } from "cartesian-product-generator";
import Multiplicator from "../multiplicator/Multiplicator";
import Variable from "../multiplicator/Variable";
import SelectedUnit from "../SelectedUnit";
import { Converter } from "./Converter";
import Formats from "./formatting/Formats";
import Unit from "./Unit";

export default class FlexibleUnit extends Unit {
    variables: Variable[];

    constructor(formats: Formats, toBase: Converter, fromBase: Converter, variables: Variable[]) {
        super(formats, toBase, fromBase);
        this.variables = variables;
    }

    private generateMultiplicatorCombinations() {
        return [...product(...this.variables)] as Multiplicator[][]
    }

    public findCombinations(callback: (combo: string) => boolean) {
        // short combinations
        const variableCombos = this.generateMultiplicatorCombinations();
        for (const short of this.formats.shorts()) {
            for (const combo of variableCombos) {
                let varIndex = 0;
                let result = "";
                for (let i = 0; i < short.length; i++) {
                    if (short[i] === "%") result += combo[varIndex++].short;
                    else result += short[i];
                }
                if (callback(result)) return;
            }
        }
        // long combinations
        for (const long of this.formats.longs()) {
            for (const combo of variableCombos) {
                let varIndex = 0;
                let result = "";
                for (let i = 0; i < long.length; i++) {
                    if (long[i] === "%") result += combo[varIndex++].long;
                    else result += long[i];
                }
                if (callback(result)) return;
            }
        }
    }

    private findCombinationsWithMultiplicators(callback: (combo: string, multiplicators: Multiplicator[]) => boolean) {
        // short combinations
        const variableCombos = this.generateMultiplicatorCombinations();
        for (const short of this.formats.shorts()) {
            for (const combo of variableCombos) {
                let varIndex = 0;
                let result = "";
                for (let i = 0; i < short.length; i++) {
                    if (short[i] === "%") result += combo[varIndex++].short;
                    else result += short[i];
                }
                if (callback(result, combo)) return;
            }
        }
        // long combinations
        for (const long of this.formats.longs()) {
            for (const combo of variableCombos) {
                let varIndex = 0;
                let result = "";
                for (let i = 0; i < long.length; i++) {
                    if (long[i] === "%") result += combo[varIndex++].long;
                    else result += long[i];
                }
                if (callback(result, combo)) return;
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