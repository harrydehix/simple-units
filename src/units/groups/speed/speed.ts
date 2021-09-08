
import FlexibleUnit from "../../../FlexibleUnit";
import Group from "../../../Group";
import Unit from "../../../Unit";
import dividedByTimes from "../../variables/dividedByTimes";
import siPrefixes from "../../variables/siPrefixes";
import { beaufortToMeterPerSecond, meterPerSecondToBeaufort } from "./beaufort";

/**
 * {@link Group} holding all speed units.
 */
const speed = new Group("speed");

speed.Editor.add(
    new FlexibleUnit({
        short: ["%0m/%1"],
        long: {
            sg: ["%0meter/%1", "%0metre/%1", "%0meter per %1", "%0metre per %1"],
            pl: ["%0meters/%1", "%0metres/%1", "%0meters per %1", "%0metres per %1"],
        }
    }, 1, 0, "metric", [siPrefixes(), dividedByTimes]),
    new FlexibleUnit({
        short: ["ft/%0", "fp%0"],
        long: {
            sg: ["foot/%0", "foot per %0"],
            pl: ["feet/%0", "feet per %0"],
        }
    }, 1 / 3.280839895013123, 0, "imperial", [dividedByTimes]),
    new FlexibleUnit({
        short: ["mi/%0", "mp%0"],
        long: {
            sg: ["mile/%0", "mile per %0"],
            pl: ["miles/%0", "miles per %0"],
        }
    }, 1609.344, 0, "imperial", [dividedByTimes]),
    new Unit({
        short: ["kt", "kn"], long: {
            sg: ["knot"],
            pl: ["knots"]
        }
    }, 1 / 1.9438444924406046, 0, "imperial"),
    new Unit({
        short: ["Bft"],
        long: {
            sg: ["Beaufort"],
            pl: ["Beaufort"]
        }
    }, beaufortToMeterPerSecond, meterPerSecondToBeaufort, "imperial"),
    new Unit({
        short: ["Ma", "M"],
        long: {
            sg: ["mach", "Mach"],
            pl: ["mach", "Mach"]
        }
    }, 343, 0, "other"),
    new Unit({
        short: ["c"],
        long: {
            sg: ["lightspeed", "light-speed"],
            pl: ["lightspeed", "light-speed"],
        }
    }, 299_792_458, 0, "other"),
);

export default speed;