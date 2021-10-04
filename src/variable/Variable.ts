import Option from "./Option";
import FlexibleUnit from "./../FlexibleUnit";


/**
 * A variable is a placeholder for prefixes, suffixes and similar and is only used in the context of the {@link FlexibleUnit}.
 * In fact it's an array.
 * To get a better understanding of variables read the Flexible Unit's documentation first.
 * 
 * @see FlexibleUnit
 */
export default class Variable extends Array<Option>{
    /**
     * Creates a new variable.
     * @param isOptional whether the variable should be optional
     * @param options the different states the variable can take
     */
    constructor(isOptional = true, ...options: Option[]) {
        super(...options);
        if (isOptional) this.push(new Option("", "", 1));
    }

    /**
     * Adds the options of another variable to this variable.
     * @param variable variable holding more options
     * @returns this
     */
    combine(variable: Variable) {
        this.push(...variable);
        return this;
    }
}