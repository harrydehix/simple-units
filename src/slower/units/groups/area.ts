import Group from "../../Group";
import Multiplicator from "../../multiplicator/Multiplicator";
import siAreaPrefixes from "../variables/siAreaPrefixes";
import Variable from "../../multiplicator/Variable";
import FlexibleUnit from "../../unit/FlexibleUnit";
import Formats from "../../unit/formatting/Formats";
import PrefixedUnit from "../../unit/PrefixedUnit";
import SimpleUnit from "../../unit/SimpleUnit";

const area = new Group("area");

area.addUnits(
    new FlexibleUnit(new Formats(["%m²", "%m^2", "%m2"], {
        sg: ["square %meter", "sq %meter", "sq %metre", "square %metre"],
        pl: ["square %meters", "sq %meters", "sq %metres", "square %metres"],
    }), (val) => val, (val) => val, [siAreaPrefixes()]),
    new PrefixedUnit(new Formats(["a"], ["are"]), (val) => val * 100, (val) => val / 100, new Variable(true,
        new Multiplicator("c", "centi", 1e-2),
        new Multiplicator("d", "deci", 1e-1),
        new Multiplicator("da", "deca", 1e1),
        new Multiplicator("h", "hect", 1e2),
    )),
    new SimpleUnit(new Formats(["in²", "″²", "in^2", "″^2", "″2", "in2"], {
        sg: ["square inch", "sq inch"],
        pl: ["square inches", "sq inches"],
    }), (val) => val * 0.00064516, (val) => val / 0.00064516),
    new SimpleUnit(new Formats(["ft²", "ft^2", "ft2"], {
        sg: ["square foot", "sq foot"],
        pl: ["square feet", "sq feet"],
    }), (val) => val * 0.09290304, (val) => val / 0.09290304),
    new SimpleUnit(new Formats(["mi²", "mi^2", "mi2"], {
        sg: ["square mile", "sq mile"],
        pl: ["square miles", "sq miles"],
    }), (val) => val * 2589988.110336, (val) => val / 2589988.110336),
    new SimpleUnit(new Formats(["yd²", "yd^2", "yd2"], {
        sg: ["square yard", "sq yard"],
        pl: ["square yards", "sq yards"],
    }), (val) => val * 0.83612736, (val) => val / 0.83612736),
    new SimpleUnit(new Formats(["ac"], {
        sg: ["acre"],
        pl: ["acres"],
    }), (val) => val * 4046.8564224, (val) => val / 4046.8564224),
);

export default area;