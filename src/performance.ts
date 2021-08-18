import units from "./units/units";
import { Symbols } from "./Collection";
import convertUnits from "convert-units";
import compareFunctions from "./performance/compareFunctions";
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install()

units.settings = {
    symbols: Symbols.ALL
};

const conv = units.from(12, "m²");
function convert() {
    conv.to("cm²");
}

const conv2 = convertUnits(12).from("m2");
function convert2() {
    conv2.to("cm2");
}

compareFunctions(convert, convert2);