import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import siPrefixes from "../variables/siPrefixes";

/**
 * {@link Group} holding all time units.
 */
const time = new Group("time");

time.Editor.add(
    new FlexibleUnit({
        short: ["%s"],
        long: {
            sg: ["%second"],
            pl: ["%seconds"],
        }
    }, 1, 0, "SI", [siPrefixes("y", "d")]),
    Unit.create({
        short: ["min"], long: {
            sg: ["minute"],
            pl: ["minutes"],
        }
    }, 60, 0, "SI"),
    Unit.create({
        short: ["h"], long: {
            sg: ["hour"],
            pl: ["hours"],
        }
    }, 3_600, 0, "SI"),
    Unit.create({
        short: ["d"], long: {
            sg: ["day"],
            pl: ["days"],
        }
    }, 86_400, 0, "SI"),
    Unit.create({
        short: ["wk"], long: {
            sg: ["week"],
            pl: ["weeks"],
        }
    }, 604_800, 0, "SI"),
    Unit.create({
        short: ["mth"], long: {
            sg: ["month"],
            pl: ["months"],
        }
    }, 2_592_000, 0, "SI"),
    Unit.create({
        short: ["a"], long: {
            sg: ["year"],
            pl: ["years"],
        }
    }, 31_556_952, 0, "SI"),
);

export default time;