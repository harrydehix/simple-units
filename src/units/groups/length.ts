import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import SimpleUnit from "../../SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

const length = new Group("length");

length.Editor.add(
    new FlexibleUnit({
        short: ["%m"],
        long: {
            sg: ["%meter", "%kilometre"],
            pl: ["%meters", "%metres"]
        }
    }, 1, 0, "metric", [siPrefixes()]),
    new SimpleUnit({
        short: ["in", "″"],
        long: {
            sg: ["inch"],
            pl: ["inches"]
        }
    }, 0.0254, 0, "imperial"),
    new SimpleUnit(
        {
            short: ["yd"],
            long: {
                sg: ["yard"],
                pl: ["yards"]
            }
        }, 0.9144, 0, "imperial"),
    new SimpleUnit({
        short: ["ly"],
        long: {
            sg: ["light-year", "lightyear"],
            pl: ["light-years", "lightyears"]
        }
    }, 9460730472580800, 0, "astronomy units"),
    new SimpleUnit({
        short: ["ft"],
        long: {
            sg: ["foot"],
            pl: ["feet"]
        }
    }, 0.3048, 0, "imperial"),
    new SimpleUnit({
        short: ["mi", "mi."],
        long: {
            sg: ["mile"],
            pl: ["miles"]
        }
    }, 1609.344, 0, "imperial"),
);

export default length;