import Group from "../../Group";
import UnitCreator from "../../unitCreator/UnitCreator";
import Variable from "../../unitCreator/variable/Variable";
import iecPrefixes from "../variables/iecPrefixes";
import siPrefixes from "../variables/siPrefixes";

const digital = new Group("digital");

digital.setUnits(
    ...UnitCreator.create({
        short: ["%B"],
        long: {
            sg: ["%byte"],
            pl: ["%bytes"],
        }
    }, (val) => val * 8, (val) => val / 8, "metric", [siPrefixes("k").combine(iecPrefixes())]),
    ...UnitCreator.create({
        short: ["%b"],
        long: {
            sg: ["%bit"],
            pl: ["%bits"],
        }
    }, (val) => val, (val) => val, "metric", [siPrefixes("k").combine(iecPrefixes())]),
)

export default digital;