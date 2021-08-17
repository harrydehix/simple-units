import units from "./units/units";
// import testFunction from "./performance/testFunction";
import { Symbols } from "./Collection";

units.setSettings({
    symbols: Symbols.ALL
})

console.log(units.unit("m").description())

// function convert() {
//     units.from(12, "Bft").to("knots");
// }

// console.log(units);