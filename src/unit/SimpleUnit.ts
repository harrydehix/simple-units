import SelectedUnit from "../SelectedUnit";
import { Converter } from "./Converter";
import Formats from "./formatting/Formats";
import Unit from "./Unit";

export default class SimpleUnit extends Unit {
    constructor(formats: Formats, fromBase: Converter, toBase: Converter) {
        super(formats, fromBase, toBase);
    }

    isUnit(unit: string): boolean {
        return this.formats.shorts().includes(unit) || this.formats.longs().includes(unit);
    }

    parse(unit: string): SelectedUnit | undefined {
        if (this.isUnit(unit))
            return new SelectedUnit(this);
    }
}