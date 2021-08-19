
import FlexibleUnit from "../../../FlexibleUnit";
import Group from "../../../Group";
import SimpleUnit from "../../../SimpleUnit";
import Unit from "../../../Unit";
import dividedByTimes from "../../variables/dividedByTimes";
import siPrefixes from "../../variables/siPrefixes";
import { beaufortToMeterPerSecond, meterPerSecondToBeaufort } from "./beaufort";

const speed = new Group("speed");

speed.Editor.add(
    new FlexibleUnit({
        short: ["%m/%"],
        long: {
            sg: ["%meter/%", "%metre/%", "%meter per %", "%metre per %"],
            pl: ["%meters/%", "%metres/%", "%meters per %", "%metres per %"],
        }
    }, 1, 0, "metric", [siPrefixes(), dividedByTimes]),
    new FlexibleUnit({
        short: ["ft/%", "fp%"],
        long: {
            sg: ["foot/%", "foot per %"],
            pl: ["feet/%", "feet per %"],
        }
    }, 1 / 3.280839895013123, 0, "imperial", [dividedByTimes]),
    new FlexibleUnit({
        short: ["mi/%", "mp%"],
        long: {
            sg: ["mile/%", "mile per %"],
            pl: ["miles/%", "miles per %"],
        }
    }, 1609.344, 0, "imperial", [dividedByTimes]),
    new SimpleUnit({
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
    new SimpleUnit({
        short: ["Ma", "M"],
        long: {
            sg: ["mach", "Mach"],
            pl: ["mach", "Mach"]
        }
    }, 343, 0, "other"),
    new SimpleUnit({
        short: ["c"],
        long: {
            sg: ["lightspeed", "light-speed"],
            pl: ["lightspeed", "light-speed"],
        }
    }, 299_792_458, 0, "other"),
);

export default speed;