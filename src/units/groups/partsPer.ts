import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import dividedByTimes from "../variables/dividedByTimes";
import siPrefixes from "../variables/siPrefixes";

const partsPer = new Group("partsPer");

partsPer.Editor.add(
    new Unit({
        short: ["ppm"],
        long: {
            sg: ["part per million"],
            pl: ["parts per million"]
        }
    }, 1, 0, "metric"),
    new Unit({
        short: ["ppb"],
        long: {
            sg: ["part per billion"],
            pl: ["parts per billion"]
        }
    }, 0.001, 0, "metric"),
    new Unit({
        short: ["ppt"],
        long: {
            sg: ["part per trillion"],
            pl: ["parts per trillion"]
        }
    }, 0.000001, 0, "metric"),
    new Unit({
        short: ["ppq"],
        long: {
            sg: ["part per quadrillion"],
            pl: ["parts per quadrillion"]
        }
    }, 0.000000001, 0, "metric"),
);

export default partsPer;