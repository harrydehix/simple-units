import Variable from "./Variable";

/**
 * Value a {@link Variable} can take. Only used in the context of the {@link FlexibleUnit}.
 * To get a better understanding of options read the Flexible Unit's documentation first.
 */
export default class Value {
    /** the option's short notation (e.g. `k`) */
    readonly short: string;
    /** the option's long notation (e.g. `kilo`) */
    readonly long: string;
    /** the option's ratio (e.g. `1000`) */
    ratio: number;

    /**
     * Creates a new option.
     * @param short the option's short notation (e.g. `k`)
     * @param long the option's long notation (e.g. `kilo`)
     * @param ratio the option's ratio (e.g. `1000`)
     */
    constructor(short: string, long: string, ratio: number) {
        this.short = short;
        this.long = long;
        this.ratio = ratio;
    }

    copy() {
        return new Value(this.short, this.long, this.ratio);
    }
}