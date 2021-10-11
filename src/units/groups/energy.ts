import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import siPrefixes from "../variables/siPrefixes";
import times from "../variables/times";

const energy = new Group("energy");

energy.Editor.add(
    new FlexibleUnit({
        short: ["%0J"],
        long: {
            sg: ["%0joule"],
            pl: ["%0jouls"]
        }
    }, 1, 0, "metric", [siPrefixes]),
    new FlexibleUnit({
        short: ["%0W%1"],
        long: {
            sg: ["%0watt-%1"],
            pl: ["%0watt-%1"]
        }
    }, 1, 0, "metric", [siPrefixes, times.filteredCopy(["h", "s"], false)]),
    new FlexibleUnit({
        short: ["%0eV"],
        long: {
            sg: ["%0electronvolt"],
            pl: ["%0electronvolts"]
        }
    }, 1.602_176_634e-19, 0, "metric", [siPrefixes]),
    new FlexibleUnit({
        short: ["%0cal"],
        long: {
            sg: ["%0calorie"],
            pl: ["%0calories"]
        }
    }, 4.184, 0, "metric", [siPrefixes.filteredCopy(["k"], true)]),
    new Unit({
        short: ["erg"],
        long: {
            sg: ["erg"],
            pl: ["ergs"]
        }
    }, 1e-7, 0, "CGS"),
);

export default energy;