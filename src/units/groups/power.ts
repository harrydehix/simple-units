import FlexibleUnit from "../../FlexibleUnit.js";
import Group from "../../Group.js";
import dividedByTimes from "../variables/dividedByTimes.js";
import siPrefixes from "../variables/siPrefixes.js";

/**
 * {@link Group} holding all power units.
 */
const power = new Group("power");

power.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0W"],
            long: {
                sg: ["%0watt"],
                pl: ["%0watts"],
            },
        },
        1,
        0,
        "metric",
        [siPrefixes]
    ),
    new FlexibleUnit(
        {
            short: ["%0J/%1"],
            long: {
                sg: ["%0joule/%1", "%0joule per %1"],
                pl: ["%0joules/%1", "%0joules per %1"],
            },
        },
        1,
        0,
        "metric",
        [siPrefixes, dividedByTimes]
    )
);

export default power;
