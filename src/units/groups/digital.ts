import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import siPrefixes from "../variables/siPrefixes";
import iecPrefixes from "../variables/iecPrefixes";

const digital = new Group("digital");

digital.Editor.add(
    new FlexibleUnit({
        short: ["%B"],
        long: {
            sg: ["%byte"],
            pl: ["%bytes"],
        }
    }, 8, 0, "bytes", [siPrefixes("k").combine(iecPrefixes())]),
    new FlexibleUnit({
        short: ["%b"],
        long: {
            sg: ["%bit"],
            pl: ["%bits"],
        }
    }, 1, 0, "bits", [siPrefixes("k").combine(iecPrefixes())]),
);

export default digital;