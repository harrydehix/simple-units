import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import SimpleUnit from "../../SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

/**
 * {@link Group} holding all mass units.
 */
const mass = new Group("mass");

mass.Editor.add(
    new FlexibleUnit({
        short: ["%g"],
        long: {
            sg: ["%gram", "%gramme"],
            pl: ["%gram", "%grams"],
        }
    }, 1, 0, "metric", [siPrefixes()]),
    new FlexibleUnit({
        short: ["%mt"],
        long: {
            sg: ["%metric ton"],
            pl: ["%metric tons"],
        }
    }, 1e6, 0, "metric", [siPrefixes("da")]),
    new SimpleUnit({
        short: ["t"],
        long: {
            sg: ["ton", "short ton"],
            pl: ["tons", "short tons"],
        }
    }, 907_184.74, 0, "imperial"),
    new SimpleUnit({
        short: ["oz", "oz av"],
        long: {
            sg: ["ounce", "avoirdupois ounce"],
            pl: ["ounces", "avoirdupois ounces"],
        }
    }, 28.349523125, 0, "imperial"),
    new SimpleUnit({
        short: ["lb", "lb av"],
        long: {
            sg: ["pound", "avoirdupois pound", "pound-mass"],
            pl: ["pounds", "avoirdupois pounds"],
        }
    }, 453.59237, 0, "imperial"),
);

export default mass;