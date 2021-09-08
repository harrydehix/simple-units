import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import siPrefixes from "../variables/siPrefixes";

/**
 * {@link Group} holding all length units.
 */
const length = new Group("length");

length.Editor.add(
    new FlexibleUnit({
        short: ["%0m"],
        long: {
            sg: ["%0meter", "%0kilometre"],
            pl: ["%0meters", "%0metres"]
        }
    }, 1, 0, "metric", [siPrefixes()]),
    new Unit({
        short: ["in", "″"],
        long: {
            sg: ["inch"],
            pl: ["inches"]
        }
    }, 0.0254, 0, "imperial"),
    new Unit(
        {
            short: ["yd"],
            long: {
                sg: ["yard"],
                pl: ["yards"]
            }
        }, 0.9144, 0, "imperial"),
    new Unit({
        short: ["ly"],
        long: {
            sg: ["light-year", "lightyear"],
            pl: ["light-years", "lightyears"]
        }
    }, 9460730472580800, 0, "astronomy units"),
    new Unit({
        short: ["ft"],
        long: {
            sg: ["foot"],
            pl: ["feet"]
        }
    }, 0.3048, 0, "imperial"),
    new Unit({
        short: ["mi", "mi."],
        long: {
            sg: ["mile"],
            pl: ["miles"]
        }
    }, 1609.344, 0, "imperial"),
);

export default length;