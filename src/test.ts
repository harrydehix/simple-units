import units from "./units/units";
import convertUnits from "convert-units";

console.log(convertUnits(250).describe("b"))
console.log(units.from(25000000, "m").asBest())