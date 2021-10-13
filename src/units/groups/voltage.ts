import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import siPrefixes from "../variables/siPrefixes";

/**
 * {@link Group} holding all voltage units.
 */
const voltage = new Group("voltage");

voltage.Editor.add(
    new FlexibleUnit({
        short: ["%0V"],
        long: {
            sg: ["volt"],
            pl: ["volts"],
        }
    }, 1, 0, "metric", [siPrefixes])
);

export default voltage;