import Group from "../../Group";
import Formats from "../../unit/formatting/Formats";
import PrefixedUnit from "../../unit/PrefixedUnit";
import SimpleUnit from "../../unit/SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

const time = new Group("time");

time.setUnits(
    new PrefixedUnit(new Formats(["s"], {
        sg: ["second"],
        pl: ["seconds"],
    }), (val) => val, (val) => val, siPrefixes("y", "d")),
    new SimpleUnit(new Formats(["min"], {
        sg: ["minute"],
        pl: ["minutes"],
    }), (val) => val * 60, (val) => val / 60),
    new SimpleUnit(new Formats(["h"], {
        sg: ["hour"],
        pl: ["hours"],
    }), (val) => val * 3_600, (val) => val / 3_600),
    new SimpleUnit(new Formats(["d"], {
        sg: ["day"],
        pl: ["days"],
    }), (val) => val * 86_400, (val) => val / 86_400),
    new SimpleUnit(new Formats(["wk"], {
        sg: ["week"],
        pl: ["weeks"],
    }), (val) => val * 604_800, (val) => val / 604_800),
    new SimpleUnit(new Formats(["m"], {
        sg: ["month"],
        pl: ["months"],
    }), (val) => val * 2_592_000, (val) => val / 2_592_000),
    new SimpleUnit(new Formats(["a"], {
        sg: ["year"],
        pl: ["years"],
    }), (val) => val * 31556952, (val) => val / 31556952),
)

export default time;