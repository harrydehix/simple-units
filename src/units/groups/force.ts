import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import siPrefixes from "../variables/siPrefixes";

const force = new Group("force");

force.Editor.add(
    new FlexibleUnit({
        short: ["%0N"],
        long: {
            sg: ["%0newton"],
            pl: ["%0newton"],
        }
    }, 1, 0, "metric", [siPrefixes]),
);

export default force;