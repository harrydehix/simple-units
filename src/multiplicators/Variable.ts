import Multiplicator from "./Multiplicator";

export default class Variable extends Array<Multiplicator>{
    constructor(...multiplicators: Multiplicator[]) {
        super(...multiplicators);
        this.push(new Multiplicator("", "", 1));
    }
}