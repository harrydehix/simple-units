import Group from "../../../Group";
import Unit from "../../../unit/Unit";
import UnitCreator from "../../../unitCreator/UnitCreator";
import dividedByTimes from "../../variables/dividedByTimes";
import siPrefixes from "../../variables/siPrefixes";
import { beaufortToMeterPerSecond, meterPerSecondToBeaufort } from "./beaufort";

const speed = new Group("speed");

speed.setUnits(
    ...UnitCreator.create({
        short: ["%m/%"],
        long: {
            sg: ["%meter/%", "%metre/%", "%meter per %", "%metre per %"],
            pl: ["%meters/%", "%metres/%", "%meters per %", "%metres per %"],
        }
    }, (val) => val, (val) => val, "metric", [siPrefixes(), dividedByTimes]),
    ...UnitCreator.create({
        short: ["ft/%", "fp%"],
        long: {
            sg: ["foot/%", "foot per %"],
            pl: ["feet/%", "feet per %"],
        }
    }, (val) => val / 3.280839895013123, (val) => val * 3.280839895013123, "imperial", [dividedByTimes]),
    ...UnitCreator.create({
        short: ["mi/%", "mp%"],
        long: {
            sg: ["mile/%", "mile per %"],
            pl: ["miles/%", "miles per %"],
        }
    }, (val) => val * 1609.344, (val) => val / 1609.344, "imperial", [dividedByTimes]),
    new Unit({
        short: ["kt", "kn"], long: {
            sg: ["knot"],
            pl: ["knots"]
        }
    }, (val) => val / 1.9438444924406046, (val) => val * 1.9438444924406046, "imperial"),
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
    }, (val) => val * 343, (val) => val / 343, "other"),
    new Unit({
        short: ["c"],
        long: {
            sg: ["lightspeed", "light-speed"],
            pl: ["lightspeed", "light-speed"],
        }
    }, (val) => val * 299_792_458, (val) => val / 299_792_458, "other"),
);

export default speed;