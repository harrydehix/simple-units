import Multiplicator from "./Multiplicator";

export default class Variable extends Array<Multiplicator>{
    constructor(isOptional = true, ...multiplicators: Multiplicator[]) {
        super(...multiplicators);
        if (isOptional) this.push(new Multiplicator("", "", 1));
    }

    combine(variable: Variable) {
        this.push(...variable);
        return this;
    }
}