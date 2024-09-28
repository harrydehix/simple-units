import FlexibleUnit from "../../FlexibleUnit.js";
import Group from "../../Group.js";
import siPrefixes from "../variables/siPrefixes.js";

/**
 * {@link Group} holding all force units.
 */
const force = new Group("force");

force.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0N"],
            long: {
                sg: ["%0newton"],
                pl: ["%0newton"],
            },
        },
        1,
        0,
        "metric",
        [siPrefixes]
    )
);

export default force;
