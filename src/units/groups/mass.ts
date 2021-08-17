import Group from "../../Group";
import Unit from "../../unit/Unit";
import UnitCreator from "../../unitCreator/UnitCreator";
import siPrefixes from "../variables/siPrefixes";

const mass = new Group("mass");

mass.setUnits(
    ...UnitCreator.create({
        short: ["%g"],
        long: {
            sg: ["%gram", "%gramme"],
            pl: ["%gram", "%grams"],
        }
    }, (val) => val, (val) => val, [siPrefixes()]),
    ...UnitCreator.create({
        short: ["%t"],
        long: {
            sg: ["%tonne", "%metric ton"],
            pl: ["%tonnes", "%metric tons"],
        }
    }, (val) => val * 1e6, (val) => val / 1e6, [siPrefixes("da")]),
    new Unit({
        short: ["oz", "oz av"],
        long: {
            sg: ["ounce", "avoirdupois ounce"],
            pl: ["ounces", "avoirdupois ounces"],
        }
    }, (val) => val * 28.349523125, (val) => val / 28.349523125),
    new Unit({
        short: ["lb", "lb av"],
        long: {
            sg: ["pound", "avoirdupois pound", "pound-mass"],
            pl: ["pounds", "avoirdupois pounds"],
        }
    }, (val) => val * 453.59237, (val) => val / 453.59237),
);

export default mass;