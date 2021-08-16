import Group from "../../Group";
import Formats from "../../unit/formatting/Formats";
import PrefixedUnit from "../../unit/PrefixedUnit";
import SimpleUnit from "../../unit/SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

const mass = new Group("mass");

mass.addUnits(
    new PrefixedUnit(new Formats(["g"], {
        sg: ["gram", "gramme"],
        pl: ["gram", "grams"],
    }), (val) => val, (val) => val, siPrefixes()),
    new PrefixedUnit(new Formats(["t"], {
        sg: ["tonne", "metric ton"],
        pl: ["tonnes", "metric tons"],
    }), (val) => val * 1e6, (val) => val / 1e6, siPrefixes("da")),
    new SimpleUnit(new Formats(["oz av"], {
        sg: ["avoirdupois ounce"],
        pl: ["avoirdupois ounces"],
    }), (val) => val * 28.349523125, (val) => val / 28.349523125)
);

export default mass;