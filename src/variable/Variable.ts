import Multiplier from "./Multiplier";

export default class Variable extends Array<Multiplier>{
    constructor(isOptional = true, ...Multipliers: Multiplier[]) {
        super(...Multipliers);
        if (isOptional) this.push(new Multiplier("", "", 1));
    }

    combine(variable: Variable) {
        this.push(...variable);
        return this;
    }
}