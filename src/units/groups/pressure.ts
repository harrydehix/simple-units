import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import SimpleUnit from "../../SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

const pressure = new Group("pressure");

pressure.Editor.add(
    new FlexibleUnit({
        short: ["%Pa"],
        long: { sg: ["%pascal"], pl: ["%pascals"] },
    }, 1, 0, "metric", [siPrefixes("μ")]),
    new SimpleUnit({
        short: ["bar"],
        long: { sg: ["Bar"], pl: ["Bars"] }
    }, 1e5, 0, "metric"),
    new SimpleUnit({
        short: ["torr"],
        long: { sg: ["Torr"], pl: ["Torrs"] }
    }, 133.3224, 0, "metric"),
    new SimpleUnit({
        short: ["atm"],
        long: { sg: ["standard atmosphere"], pl: ["standard atmospheres"] }
    }, 101325, 0, "imperial"),
    new SimpleUnit({
        short: ["Mpsi"],
        long: { sg: ["megapound per square inch"], pl: ["megapounds per square inch"] }
    }, 6_894_757_293.16836133672267344534689069378, 0, "imperial"),
    new SimpleUnit({
        short: ["psi", "lb. p. sq. in.", "psia", "psig"],
        long: { sg: ["pound-force per square inch", "pound per square inch"], pl: ["pounds per square inch"] }
    }, 6894.75729316836133672267344534689069378, 0, "imperial"),
    new SimpleUnit({
        short: ["ksi"],
        long: { sg: ["kilopound per square inch"], pl: ["kilopounds per square inch"] }
    }, 6894757.29316836133672267344534689069378, 0, "imperial"),
);

export default pressure;