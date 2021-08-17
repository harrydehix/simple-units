import Group from "../../Group";
import Formats from "../../unit/formatting/Formats";
import PrefixedUnit from "../../unit/PrefixedUnit";
import SimpleUnit from "../../unit/SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

const length = new Group("length");

length.setUnits(
    new PrefixedUnit(new Formats(["m"], {
        sg: ["meter", "metre"],
        pl: ["meters", "metres"]
    }), (val) => val, (val) => val, siPrefixes()),
    new SimpleUnit(new Formats(["in", "″"], {
        sg: ["inch"],
        pl: ["inches"]
    }), (val) => val * 0.0254, (val) => val / 0.0254),
    new SimpleUnit(new Formats(["yd"], {
        sg: ["yard"],
        pl: ["yards"],
    }), (val) => val * 0.9144, (val) => val / 0.9144),
    new SimpleUnit(new Formats(["ly"], {
        sg: ["light-year", "lightyear"],
        pl: ["light-years", "lightyears"],
    }), (val) => val * 9460730472580800, (val) => val / 9460730472580800),
    new SimpleUnit(new Formats(["ft"], {
        sg: ["foot"],
        pl: ["feet"],
    }), (val) => val * 0.3048, (val) => val / 0.3048),
    new SimpleUnit(new Formats(["mi, mi."], {
        sg: ["mile"],
        pl: ["miles"],
    }), (val) => val * 1609.344, (val) => val / 1609.344),
);

export default length;