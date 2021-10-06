import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import Value from "../../variable/Value";
import Variable from "../../variable/Variable";
import siAreaPrefixes from "../variables/siAreaPrefixes";

/**
 * {@link Group} holding all area units.
 */
const area = new Group("area");

area.Editor.add(
    new FlexibleUnit({
        short: ["%0m²", "%0m^2", "%0m2"],
        long: {
            sg: ["square %0meter", "sq %0meter", "sq %0metre", "square %0metre"],
            pl: ["square %0meters", "sq %0meters", "sq %0metres", "square %0metres"],
        },
    }, 1, 0, "metric", [siAreaPrefixes]),
    new FlexibleUnit({
        short: ["%0a"],
        long: {
            sg: ["%0are"],
            pl: ["%0ares"],
        }
    }, 100, 0, "metric", [new Variable([
        new Value("c", "centi", 1e-2),
        new Value("d", "deci", 1e-1),
        new Value("da", "dec", 1e1),
        new Value("h", "hect", 1e2),
    ], true)]),
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