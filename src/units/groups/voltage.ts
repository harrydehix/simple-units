import FlexibleUnit from "../../FlexibleUnit.js";
import Group from "../../Group.js";
import siPrefixes from "../variables/siPrefixes.js";

/**
 * {@link Group} holding all voltage units.
 */
const voltage = new Group("voltage");

voltage.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0V"],
            long: {
                sg: ["volt"],
                pl: ["volts"],
            },
        },
        1,
        0,
        "metric",
        [siPrefixes]
    )
);

export default voltage;
