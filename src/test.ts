import units from "./units/units";
import testFunction from "./performance/testFunction";
import { Symbols } from "./Collection";

units.setSettings({
    symbols: Symbols.ALL
})

function convert() {
    units.from(12, "Bft").to("knots");
}

console.log(testFunction(convert));