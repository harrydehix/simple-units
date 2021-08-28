import compareFunctions from "./performance/compareFunctions";
import units from "./units/units";
import convert1 from "convert";
import convert2 from "convert-units";

function simpleUnits() {
    units.from(12, "°C").to("°F");
    units.from(100, "m").to("inch");
    units.from(200, "Gb").to("MB");
}

function math() {
    (12 * 9 / 5) + 32;
    100 * 39.3701;
    200 * 128;
}

function convert() {
    convert1(12, "C").to("K");
    convert1(100, "m").to("inch");
    convert1(200, "Gb").to("MB");
}

function convertUnits() {
    convert2(12).from("C").to("K");
    convert2(100).from("m").to("in");
    convert2(200).from("Gb").to("MB");
}

compareFunctions(convertUnits, convert, simpleUnits, math);