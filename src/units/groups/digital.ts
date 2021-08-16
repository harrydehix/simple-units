import Group from "../../Group";
import Variable from "../../multiplicator/Variable";
import Formats from "../../unit/formatting/Formats";
import PrefixedUnit from "../../unit/PrefixedUnit";
import SimpleUnit from "../../unit/SimpleUnit";
import iecPrefixes from "../variables/iecPrefixes";
import siPrefixes from "../variables/siPrefixes";

const digital = new Group("digital");

digital.setUnits(
    new PrefixedUnit(new Formats(["B"], {
        sg: ["byte"],
        pl: ["bytes"],
    }), (val) => val * 8, (val) => val / 8, siPrefixes("k").concat(iecPrefixes()) as Variable),
    new PrefixedUnit(new Formats(["b"], {
        sg: ["bit"],
        pl: ["bits"],
    }), (val) => val, (val) => val, siPrefixes("k").concat(iecPrefixes()) as Variable),
)

export default digital;