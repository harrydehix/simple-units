import Option from "./Option";

export default class Variable extends Array<Option>{
    constructor(isOptional = true, ...options: Option[]) {
        super(...options);
        if (isOptional) this.push(new Option("", "", 1));
    }

    combine(variable: Variable) {
        this.push(...variable);
        return this;
    }
}