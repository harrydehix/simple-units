import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import Option from "../../variable/Option";
import Variable from "../../variable/Variable";
import siAreaPrefixes from "../variables/siAreaPrefixes";

/**
 * {@link Group} holding all area units.
 */
const area = new Group("area");

area.Editor.add(
    new FlexibleUnit({
        short: ["%m²", "%m^2", "%m2"],
        long: {
            sg: ["square %meter", "sq %meter", "sq %metre", "square %metre"],
            pl: ["square %meters", "sq %meters", "sq %metres", "square %metres"],
        },
    }, 1, 0, "metric", [siAreaPrefixes()]),
    new FlexibleUnit({
        short: ["%a"],
        long: {
            sg: ["%are"],
            pl: ["%ares"],
        }
    }, 100, 0, "metric", [new Variable(true,
        new Option("c", "centi", 1e-2),
        new Option("d", "deci", 1e-1),
        new Option("da", "dec", 1e1),
        new Option("h", "hect", 1e2),
    )]),
    new Unit({
        short: ["in²", "″²", "in^2", "″^2", "″2", "in2"],
        long: {
            sg: ["square inch", "sq inch"],
            pl: ["square inches", "sq inches"],
        }
    }, 0.00064516, 0, "imperial"),
    new Unit({
        short: ["ft²", "ft^2", "ft2"],
        long: {
            sg: ["square foot", "sq foot"],
            pl: ["square feet", "sq feet"],
        }
    }, 0.09290304, 0, "imperial"),
    new Unit({
        short: ["mi²", "mi^2", "mi2"],
        long: {
            sg: ["square mile", "sq mile"],
            pl: ["square miles", "sq miles"],
        }
    }, 2589988.110336, 0, "imperial"),
    new Unit({
        short: ["yd²", "yd^2", "yd2"],
        long: {
            sg: ["square yard", "sq yard"],
            pl: ["square yards", "sq yards"],
        }
    }, 0.83612736, 0, "imperial"),
    new Unit({
        short: ["ac"],
        long: {
            sg: ["acre"],
            pl: ["acres"],
        }
    }, 4046.8564224, 0, "imperial"),
);

export default area;