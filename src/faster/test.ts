import units from "./units/units";
import testFunction from "../performance/testFunction";
import { Symbols } from "./Collection";

units.setSettings({
    symbols: Symbols.SHORT_FORMS
})

function convert() {
    units.from(12, "kB").to("KiB");
}

console.log(testFunction(convert));