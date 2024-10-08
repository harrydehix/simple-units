import FlexibleUnit from "../../FlexibleUnit.js";
import Group from "../../Group.js";
import siPrefixes from "../variables/siPrefixes.js";
import iecPrefixes from "../variables/iecPrefixes.js";

/**
 * {@link Group} holding all digital units.
 */
const digital = new Group("digital");

digital.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0B"],
            long: {
                sg: ["%0byte"],
                pl: ["%0bytes"],
            },
        },
        8,
        0,
        "bytes",
        [siPrefixes.subcopy("k").combine(iecPrefixes)]
    ),
    new FlexibleUnit(
        {
            short: ["%0b"],
            long: {
                sg: ["%0bit"],
                pl: ["%0bits"],
            },
        },
        1,
        0,
        "bits",
        [siPrefixes.subcopy("k").combine(iecPrefixes)]
    )
);

export default digital;
