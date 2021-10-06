import Option from "./Option";


/**
 * A variable is a placeholder for prefixes, suffixes and similar and is only used in the context of the {@link FlexibleUnit}.
 * Under the hood it's similar to an array.
 * To get a better understanding of variables read the Flexible Unit's documentation first.
 * 
 * @see FlexibleUnit
 */
export default class Variable {
    private _options: Option[] = [];
    private _computedOptions: Option[] | null = null;
    isOptional = false;

    readonly _internal = {
        _computeOptions: () => {
            this._computedOptions = [];
            this._options.forEach(option => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                this._computedOptions!.push(option.copy());
            });
            if (this.isOptional) this._computedOptions.push(new Option("", "", 1));
        },

        _toArray: () => {
            if (this._computedOptions === null) this._internal._computeOptions();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return this._computedOptions! as Option[];
        }
    }


    /**
     * Creates a new variable.
     * @param isOptional whether the variable should be optional
     * @param options the different states the variable can take
     */
    constructor(options: Option[], isOptional = true) {
        this._options = options;
        this.isOptional = isOptional;
    }

    /**
     * Adds the options of another variable to this variable.
     * @param variable variable holding more options
     * @returns this
     */
    combine(variable: Variable) {
        this._options.push(...variable._options);
        this._computedOptions = null;
        return this;
    }

    /**
     * Multiplies every's option's ratio with the specified value.
     * @param value
     * @returns this
     */
    multiply(value: number) {
        for (const option of this._options) {
            option.ratio *= value;
        }
        this._computedOptions = null;
        return this;
    }

    /**
     * Adds the specified value to every's option's ratio.
     * @param value
     * @returns this
     */
    add(value: number) {
        for (const option of this._options) {
            option.ratio += value;
        }
        this._computedOptions = null;
        return this;
    }

    /**
     * Subtracts the specified value from every's option's ratio.
     * @param value
     * @returns this
     */
    subtract(value: number) {
        for (const option of this._options) {
            option.ratio -= value;
        }
        this._computedOptions = null;
        return this;
    }

    /**
     * Divides every's option's ratio to the specified value.
     * @param value
     * @returns this
     */
    divide(value: number) {
        for (const option of this._options) {
            option.ratio /= value;
        }
        this._computedOptions = null;
        return this;
    }

    /**
     * Takes every's option's ratio to the specified power.
     * @param value the exponent
     * @returns this
     */
    pow(value: number) {
        for (const option of this._options) {
            option.ratio **= value;
        }
        this._computedOptions = null;
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
        for (const option of this._options) {
            copy._options.push(option.copy());
        }
        return copy;
    }

    /**
     * Creates a deep copy of this variable starting from the option having the first argument
     * as `short` property (inclusively) and ending at the option having the second
     * argument as `short` property (inclusively).
     * @param startPoint 
     * @param endPoint 
     * @param isOptional whether the subcopy should be optional
     * @returns a subcopy of this variable
     */
    subcopy(startPoint: string, endPoint?: string, isOptional?: boolean) {
        // Find index of start and end point
        const startIndex = this._options.findIndex((option) => {
            if (option.short === startPoint) {
                return true;
            }
        });
        let endIndex = this._options.length - 1;
        if (endPoint) {
            endIndex = this._options.findIndex((option) => {
                if (option.short === endPoint) {
                    return true;
                }
            });
        }

        // Create copied sublist
        if (isOptional === undefined) isOptional = this.isOptional;
        const subcopy = new Variable([], isOptional);
        for (let i = startIndex; i <= endIndex; i++) {
            subcopy._options.push(this._options[i].copy());
        }
        return subcopy;
    }
}