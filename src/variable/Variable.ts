import Value from "./Value";


/**
 * A variable is a placeholder for prefixes, suffixes and similar and is only used in the context of the {@link FlexibleUnit}.
 * Under the hood it's similar to an array.
 * To get a better understanding of variables read the Flexible Unit's documentation first.
 * 
 * @see FlexibleUnit
 */
export default class Variable {
    /**
     * @hidden
     */
    private _values: Value[] = [];
    /**
     * @hidden
     */
    private _computedValues: Value[] | null = null;

    /**
     * whether the variable is optional
     */
    isOptional = false;

    /**
     * @hidden
     */
    readonly _internal = {
        _computeValues: () => {
            this._computedValues = [];
            this._values.forEach(value => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this._computedValues!.push(value.copy());
            });
            if (this.isOptional) this._computedValues.push(new Value("", "", 1));
        },

        _toArray: () => {
            if (this._computedValues === null) this._internal._computeValues();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this._computedValues! as Value[];
        }
    }


    /**
     * Creates a new variable.
     * @param isOptional whether the variable should be optional
     * @param values the different values the variable can take
     */
    constructor(values: Value[], isOptional = true) {
        this._values = values;
        this.isOptional = isOptional;
    }

    /**
     * Adds the values of another variable to this variable.
     * @param variable variable holding more values
     * @returns this
     */
    combine(variable: Variable) {
        this._values.push(...variable._values);
        this._computedValues = null;
        return this;
    }

    /**
     * Multiplies every value's ratio with the specified number.
     * @param n
     * @returns this
     */
    multiply(n: number) {
        for (const value of this._values) {
            value.ratio *= n;
        }
        this._computedValues = null;
        return this;
    }

    /**
     * Adds the specified number to every value's ratio.
     * @param n
     * @returns this
     */
    add(n: number) {
        for (const value of this._values) {
            value.ratio += n;
        }
        this._computedValues = null;
        return this;
    }

    /**
     * Subtracts the specified number from every value's ratio.
     * @param n
     * @returns this
     */
    subtract(n: number) {
        for (const value of this._values) {
            value.ratio -= n;
        }
        this._computedValues = null;
        return this;
    }

    /**
     * Divides every value's ratio to the specified number.
     * @param n
     * @returns this
     */
    divide(n: number) {
        for (const value of this._values) {
            value.ratio /= n;
        }
        this._computedValues = null;
        return this;
    }

    /**
     * Takes every value's ratio to the specified power.
     * @param n the exponent
     * @returns this
     */
    pow(n: number) {
        for (const value of this._values) {
            value.ratio **= n;
        }
        this._computedValues = null;
        return this;
    }

    /**
     * Creates a deep copy of this variable.
     * @param isOptional whether the copy should be optional
     * @returns a deep copy of this variable
     */
    copy(isOptional?: boolean) {
        if (isOptional === undefined) isOptional = this.isOptional;
        const copy = new Variable([], isOptional);
        for (const value of this._values) {
            copy._values.push(value.copy());
        }
        return copy;
    }

    /**
     * Creates a deep copy of this variable starting inclusively from the {@link Value} having the first argument
     * as `short` property and ending inclusively at the {@link Value} having the second
     * argument as `short` property.
     * @param startPoint 
     * @param endPoint 
     * @param isOptional whether the subcopy should be optional
     * @returns a subcopy of this variable
     */
    subcopy(startPoint: string, endPoint?: string, isOptional?: boolean) {
        // Find index of start and end point
        const startIndex = this._values.findIndex((value) => {
            if (value.short === startPoint) {
                return true;
            }
        });
        let endIndex = this._values.length - 1;
        if (endPoint) {
            endIndex = this._values.findIndex((value) => {
                if (value.short === endPoint) {
                    return true;
                }
            });
        }

        // Create copied sublist
        if (isOptional === undefined) isOptional = this.isOptional;
        const subcopy = new Variable([], isOptional);
        for (let i = startIndex; i <= endIndex; i++) {
            subcopy._values.push(this._values[i].copy());
        }
        return subcopy;
    }

    filteredCopy(selection: string[], isOptional?: boolean) {
        if (isOptional === undefined) isOptional = this.isOptional;
        const subcopy = new Variable([], isOptional);
        for (let i = 0; i < this._values.length; i++) {
            const value = this._values[i];
            if (selection.includes(value.short)) {
                subcopy._values.push(value.copy());
            }
        }
        return subcopy;
    }
}