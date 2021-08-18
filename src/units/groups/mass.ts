import Group from "../../Group";
import Unit from "../../unit/Unit";
import UnitCreator from "../../unitCreator/UnitCreator";
import siPrefixes from "../variables/siPrefixes";

const mass = new Group("mass");

mass.Editor.add(
    ...UnitCreator.create({
        short: ["%g"],
        long: {
            sg: ["%gram", "%gramme"],
            pl: ["%gram", "%grams"],
        }
    }, (val) => val, (val) => val, "metric", [siPrefixes()]),
    ...UnitCreator.create({
        short: ["%mt"],
        long: {
            sg: ["%metric ton"],
            pl: ["%metric tons"],
        }
    }, (val) => val * 1e6, (val) => val / 1e6, "metric", [siPrefixes("da")]),
    new Unit({
        short: ["t"],
        long: {
            sg: ["ton", "short ton"],
            pl: ["tons", "short tons"],
        }
    }, (val) => val * 907_184.74, (val) => val / 907_184.74, "imperial"),
    new Unit({
        short: ["oz", "oz av"],
        long: {
            sg: ["ounce", "avoirdupois ounce"],
            pl: ["ounces", "avoirdupois ounces"],
        }
    }, (val) => val * 28.349523125, (val) => val / 28.349523125, "imperial"),
    new Unit({
        short: ["lb", "lb av"],
        long: {
            sg: ["pound", "avoirdupois pound", "pound-mass"],
            pl: ["pounds", "avoirdupois pounds"],
        }
    }, (val) => val * 453.59237, (val) => val / 453.59237, "imperial"),
);

export default mass;