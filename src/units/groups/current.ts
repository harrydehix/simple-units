import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import siPrefixes from "../variables/siPrefixes";

const current = new Group("current");

current.Editor.add(
    new FlexibleUnit({
        short: ["%0A"],
        long: {
            sg: ["%0ampere"],
            pl: ["%0amperes"],
        }
    }, 1, 0, "metric", [siPrefixes])
);

export default current;