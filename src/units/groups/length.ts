import Group from "../../Group";
import Unit from "../../unit/Unit";
import UnitCreator from "../../unitCreator/UnitCreator";
import siPrefixes from "../variables/siPrefixes";

const length = new Group("length");

length.setUnits(
    ...UnitCreator.create({
        short: ["%m"],
        long: {
            sg: ["%meter", "%kilometre"],
            pl: ["%meters", "%metres"]
        }
    }, val => val, val => val, "metric", [siPrefixes()]),
    new Unit({
        short: ["in", "″"],
        long: {
            sg: ["inch"],
            pl: ["inches"]
        }
    }, (val) => val * 0.0254, (val) => val / 0.0254, "imperial"),
    new Unit(
        {
            short: ["yd"],
            long: {
                sg: ["yard"],
                pl: ["yards"]
            }
        }, (val) => val * 0.9144, (val) => val / 0.9144, "imperial"),
    new Unit({
        short: ["ly"],
        long: {
            sg: ["light-year", "lightyear"],
            pl: ["light-years", "lightyears"]
        }
    }, (val) => val * 9460730472580800, (val) => val / 9460730472580800, "astronomy units"),
    new Unit({
        short: ["ft"],
        long: {
            sg: ["foot"],
            pl: ["feet"]
        }
    }, (val) => val * 0.3048, (val) => val / 0.3048, "imperial"),
    new Unit({
        short: ["mi", "mi."],
        long: {
            sg: ["mile"],
            pl: ["miles"]
        }
    }, (val) => val * 1609.344, (val) => val / 1609.344, "imperial"),
);

export default length;