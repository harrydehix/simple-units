import Group from "../../../Group";
import FlexibleUnit from "../../../unit/FlexibleUnit";
import Formats from "../../../unit/formatting/Formats";
import PrefixedUnit from "../../../unit/PrefixedUnit";
import SimpleUnit from "../../../unit/SimpleUnit";
import dividedByTimes from "../../variables/dividedByTimes";
import siPrefixes from "../../variables/siPrefixes";
import { beaufortToMeterPerSecond, meterPerSecondToBeaufort } from "./beaufort";


const speed = new Group("speed");

speed.addUnits(
    new FlexibleUnit(new Formats(["%m/%"], {
        sg: ["%meter/%", "%metre/%", "%meter per %", "%metre per %"],
        pl: ["%meters/%", "%metres/%", "%meters per %", "%metres per %"],
    }), (val) => val, (val) => val, [siPrefixes(), dividedByTimes]),
    new FlexibleUnit(new Formats(["ft/%", "fp%"], {
        sg: ["foot/%", "foot per %"],
        pl: ["feet/%", "feet per %"],
    }), (val) => val / 3.280839895013123, (val) => val * 3.280839895013123, [dividedByTimes]),
    new FlexibleUnit(new Formats(["mi/%", "mp%"], {
        sg: ["mile/%", "mile per %"],
        pl: ["miles/%", "miles per %"],
    }), (val) => val * 1609.344, (val) => val / 1609.344, [dividedByTimes]),
    new SimpleUnit(
        new Formats(["kt", "kn"], {
            sg: ["knot"],
            pl: ["knots"]
        }),
        (val) => val / 1.9438444924406046,
        (val) => val * 1.9438444924406046,
    ),
    new SimpleUnit(
        new Formats(["Bft"], ["Beaufort"]),
        beaufortToMeterPerSecond,
        meterPerSecondToBeaufort,
    ),
    new SimpleUnit(
        new Formats(["Ma", "M"], ["mach", "Mach"]),
        (val) => val * 343,
        (val) => val / 343,
    ),
    new SimpleUnit(
        new Formats(["c"], ["lightspeed", "light-speed"]),
        (val) => val * 299_792_458,
        (val) => val / 299_792_458,
    ),
);

export default speed;