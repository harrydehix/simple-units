import units from "./units/units";
import { Symbols } from "./Collection";
import convertUnits from "convert-units";
import compareFunctions from "./performance/compareFunctions";
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install()

units.settings = {
    symbols: Symbols.SHORT_FORMS
};

function convert() {
    // prefix conversion
    units.from(12, "cm").to("m");
    // conversion in same group
    units.from(100, "cm").to("in");
}

function convert2() {
    // prefix conversion
    convertUnits(12).from("cm").to("m");
    // conversion in same group
    convertUnits(100).from("cm").to("in");
}

compareFunctions(convert, convert2);