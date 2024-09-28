import FlexibleUnit from "../../FlexibleUnit.js";
import Group from "../../Group.js";
import siPrefixes from "../variables/siPrefixes.js";

/**
 * {@link Group} holding all "current" units.
 */
const current = new Group("current");

current.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0A"],
            long: {
                sg: ["%0ampere"],
                pl: ["%0amperes"],
            },
        },
        1,
        0,
        "metric",
        [siPrefixes]
    )
);

export default current;
