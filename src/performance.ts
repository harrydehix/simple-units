import units from "./units/units";
import { Symbols } from "./Collection";
import convertUnits from "convert-units";
import compareFunctions from "./performance/compareFunctions";
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install()

units.settings = {
    symbols: Symbols.SINGLE
};

function convert() {
    // prefix conversion
    const conv = units.from(12, "cm")
    // conv.to("m");

    // conv.to("cm");
    // conv.to("km");
    // // conversion in same group
    // units.from(100, "cm").to("in");
}

function convert2() {
    // prefix conversion
    const conv = convertUnits(12).from("cm");
    // conv.to("m");
    // conv.to("cm");
    // conv.to("km");
    // // conversion in same group
    // convertUnits(100).from("cm").to("in");
}

compareFunctions(convert, convert2);