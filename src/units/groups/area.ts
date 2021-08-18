import Group from "../../Group";
import Unit from "../../unit/Unit";
import UnitCreator from "../../unitCreator/UnitCreator";
import Multiplicator from "../../unitCreator/variable/Multiplicator";
import Variable from "../../unitCreator/variable/Variable";
import siAreaPrefixes from "../variables/siAreaPrefixes";

const area = new Group("area");

area.Editor.add(
    ...UnitCreator.create({
        short: ["%m²", "%m^2", "%m2"],
        long: {
            sg: ["square %meter", "sq %meter", "sq %metre", "square %metre"],
            pl: ["square %meters", "sq %meters", "sq %metres", "square %metres"],
        },
    }, (val) => val, (val) => val, "metric", [siAreaPrefixes()]),
    ...UnitCreator.create({
        short: ["%a"],
        long: {
            sg: ["%are"],
            pl: ["%ares"],
        }
    }, (val) => val * 100, (val) => val / 100, "metric", [new Variable(true,
        new Multiplicator("c", "centi", 1e-2),
        new Multiplicator("d", "deci", 1e-1),
        new Multiplicator("da", "dec", 1e1),
        new Multiplicator("h", "hect", 1e2),
    )]),
    new Unit({
        short: ["in²", "″²", "in^2", "″^2", "″2", "in2"],
        long: {
            sg: ["square inch", "sq inch"],
            pl: ["square inches", "sq inches"],
        }
    }, (val) => val * 0.00064516, (val) => val / 0.00064516, "imperial"),
    new Unit({
        short: ["ft²", "ft^2", "ft2"],
        long: {
            sg: ["square foot", "sq foot"],
            pl: ["square feet", "sq feet"],
        }
    }, (val) => val * 0.09290304, (val) => val / 0.09290304, "imperial"),
    new Unit({
        short: ["mi²", "mi^2", "mi2"],
        long: {
            sg: ["square mile", "sq mile"],
            pl: ["square miles", "sq miles"],
        }
    }, (val) => val * 2589988.110336, (val) => val / 2589988.110336, "imperial"),
    new Unit({
        short: ["yd²", "yd^2", "yd2"],
        long: {
            sg: ["square yard", "sq yard"],
            pl: ["square yards", "sq yards"],
        }
    }, (val) => val * 0.83612736, (val) => val / 0.83612736, "imperial"),
    new Unit({
        short: ["ac"],
        long: {
            sg: ["acre"],
            pl: ["acres"],
        }
    }, (val) => val * 4046.8564224, (val) => val / 4046.8564224, "imperial"),
);

export default area;