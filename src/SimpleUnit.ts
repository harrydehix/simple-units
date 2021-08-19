import Unit, { UnitFormat } from "./Unit";

export default class RatioUnit extends Unit {
    constructor(format: UnitFormat, mult: number, add: number, system: string) {
        super(format,
            (val: number) => {
                return val * mult + add;
            },
            (val: number) => {
                return (val - add) / mult;
            },
            system);
    }
}
