import Group from "../../Group";
import Unit from "../../unit/Unit";
import UnitCreator from "../../unitCreator/UnitCreator";
import siPrefixes from "../variables/siPrefixes";

const time = new Group("time");

time.setUnits(
    ...UnitCreator.create({
        short: ["%s"],
        long: {
            sg: ["%second"],
            pl: ["%seconds"],
        }
    }, (val) => val, (val) => val, "metric", [siPrefixes("y", "d")]),
    new Unit({
        short: ["min"], long: {
            sg: ["minute"],
            pl: ["minutes"],
        }
    }, (val) => val * 60, (val) => val / 60, "metric"),
    new Unit({
        short: ["h"], long: {
            sg: ["hour"],
            pl: ["hours"],
        }
    }, (val) => val * 3_600, (val) => val / 3_600, "metric"),
    new Unit({
        short: ["d"], long: {
            sg: ["day"],
            pl: ["days"],
        }
    }, (val) => val * 86_400, (val) => val / 86_400, "metric"),
    new Unit({
        short: ["wk"], long: {
            sg: ["week"],
            pl: ["weeks"],
        }
    }, (val) => val * 604_800, (val) => val / 604_800, "metric"),
    new Unit({
        short: ["mth"], long: {
            sg: ["month"],
            pl: ["months"],
        }
    }, (val) => val * 2_592_000, (val) => val / 2_592_000, "metric"),
    new Unit({
        short: ["a"], long: {
            sg: ["year"],
            pl: ["years"],
        }
    }, (val) => val * 31556952, (val) => val / 31556952, "metric"),
);

export default time;