import Group from "../../../Group";
import defaultPrefixes from "../../../prefixes/DefaultPrefixes";
import Unit from "../../../Unit";
import { beaufortToMeterPerSecond, meterPerSecondToBeaufort } from "./beaufort";


const speed = new Group("speed");

speed.addUnits(
    new Unit(
        ["m/s"],
        [
            "meter per second",
            "metre per second",
            "meters per second",
            "metres per second",
            "meter/second",
            "metre/second",
            "metres/second",
            "meters/second"
        ],
        (val) => val, (val) => val,
        defaultPrefixes
    ),
    new Unit(
        ["ft/s", "fps"],
        ["foot per second", "feet per second", "foot/second", "feet/second"],
        (val) => val / 3.280839895013123,
        (val) => val * 3.280839895013123,
    ),
    new Unit(
        ["m/h"],
        [
            "meter per hour",
            "metre per hour",
            "meters per hour",
            "metres per hour",
            "meter/hour",
            "metre/hour",
            "metres/hour",
            "meters/hour"
        ],
        (val) => val / 3600,
        (val) => val * 3600,
        defaultPrefixes
    ),
    new Unit(
        ["mph", "mi/h"],
        ["mile per hour", "miles per hour", "mile/hour", "miles/hour"],
        (val) => val / 2.2369362920544025,
        (val) => val * 2.2369362920544025,
    ),
    new Unit(
        ["kt", "kn"],
        ["knot", "knots"],
        (val) => val / 1.9438444924406046,
        (val) => val * 1.9438444924406046,
    ),
    new Unit(
        ["Bft"],
        ["Beaufort"],
        beaufortToMeterPerSecond,
        meterPerSecondToBeaufort,
    ),
    new Unit(
        ["Ma", "M"],
        ["mach", "Mach"],
        (val) => val * 343,
        (val) => val / 343,
    ),
    new Unit(
        ["c"],
        ["speed of light", "lightspeed"],
        (val) => val * 299_792_458,
        (val) => val / 299_792_458,
    ),
);

export default speed;