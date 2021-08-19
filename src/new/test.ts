import compareFunctions from "../performance/compareFunctions";
import units from "./units/units";
import unitsOld from "../old/units/units";
import convert1 from "convert";
import convert2 from "convert-units";

function unitjs() {
    units.from(12, "°C").to("°F");
}

function math() {
    (12 * 9 / 5) + 32;
}

function convert() {
    convert1(12, "C").to("K");
}

function convertUnits() {
    convert2(12).from("C").to("K");
}

function oldUnitjs() {
    unitsOld.from(12, "°C").to("°F");
}

compareFunctions(convertUnits, unitjs, oldUnitjs, math);