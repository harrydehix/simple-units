import Group from "../../../Group";
import dividedByTimes from "../../../multiplicators/dividedByTimes";
import siPrefixes from "../../../multiplicators/siPrefixes";
import FlexibleUnit, { Definition } from "../../../unit/FlexibleUnit";
import Formats from "../../../unit/formatting/Formats";
import PrefixedUnit from "../../../unit/PrefixedUnit";
import SimpleUnit from "../../../unit/SimpleUnit";
import { beaufortToMeterPerSecond, meterPerSecondToBeaufort } from "./beaufort";


const speed = new Group("speed");

speed.addUnits(
    new FlexibleUnit(new Formats(["m/"], {
        sg: ["meter/", "metre/", "meter per ", "metre per "],
        pl: ["meters/", "metres/", "meters per ", "metres per "],
    }), (val) => val, (val) => val, Definition.var(siPrefixes).base().var(dividedByTimes)),
    new FlexibleUnit(new Formats(["ft/", "fp"], {
        sg: ["foot/", "foot per "],
        pl: ["feet/", "feet per "],
    }), (val) => val / 3.280839895013123, (val) => val * 3.280839895013123, Definition.base().var(dividedByTimes)),
    // new SimpleUnit(
    //         new Formats(["ft/s", "fps"], {
    //             sg: ["foot/second", "foot per second"],
    //             pl: ["feet/second", "feet per second"],
    //         }),
    //         (val) => val / 3.280839895013123,
    //         (val) => val * 3.280839895013123,
    //     ),
    // new SimpleUnit(
    //     new Formats(["mph", "mi/h"], {
    //         sg: ["mile/hour", "mile per hour"],
    //         pl: ["miles/hour", "miles per hour"],
    //     }),
    //     (val) => val / 2.2369362920544025,
    //     (val) => val * 2.2369362920544025,
    // ),
    new FlexibleUnit(new Formats(["mp", "mi/"], {
        sg: ["mile/", "mile per "],
        pl: ["miles/", "miles per "],
    }), (val) => val / 2.2369362920544025, (val) => val * 2.2369362920544025, Definition.base().var(dividedByTimes)),
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