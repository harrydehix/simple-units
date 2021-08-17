import Multiplicator from "./Multiplicator";

export default class Variable extends Array<Multiplicator>{
    constructor(isOptional = true, ...multiplicators: Multiplicator[]) {
        super(...multiplicators);
        if (isOptional) this.push(new Multiplicator("", "", 1));
    }


    shorts(): string[] {
        const shorts = [];
        for (const mult of this) {
            shorts.push(mult.short);
        }
        return shorts;
    }

    longs(): string[] {
        const longs = [];
        for (const mult of this) {
            longs.push(mult.long);
        }
        return longs;
    }
}