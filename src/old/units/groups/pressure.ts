import Group from "../../Group";
import Unit from "../../unit/Unit";
import UnitCreator from "../../unitCreator/UnitCreator";
import siPrefixes from "../variables/siPrefixes";

const pressure = new Group("pressure");

pressure.Editor.add(
    ...UnitCreator.create({
        short: ["%Pa"],
        long: { sg: ["%pascal"], pl: ["%pascals"] },
    }, (val) => val, (val) => val, "metric", [siPrefixes("μ")]),
    new Unit({
        short: ["bar"],
        long: { sg: ["Bar"], pl: ["Bars"] }
    }, (val) => val * 1e5, (val) => val / 1e5, "metric"),
    new Unit({
        short: ["torr"],
        long: { sg: ["Torr"], pl: ["Torrs"] }
    }, (val) => val * 133.3224, (val) => val / 133.3224, "metric"),
    new Unit({
        short: ["atm"],
        long: { sg: ["standard atmosphere"], pl: ["standard atmospheres"] }
    }, (val) => val * 101325, (val) => val / 101325, "imperial"),
    new Unit({
        short: ["Mpsi"],
        long: { sg: ["megapound per square inch"], pl: ["megapounds per square inch"] }
    }, (val) => val * 6_894_757_293.16836133672267344534689069378, (val) => val / 6_894_757_293.16836133672267344534689069378, "imperial"),
    new Unit({
        short: ["psi", "lb. p. sq. in.", "psia", "psig"],
        long: { sg: ["pound-force per square inch", "pound per square inch"], pl: ["pounds per square inch"] }
    }, (val) => val * 6894.75729316836133672267344534689069378, (val) => val / 6894.75729316836133672267344534689069378, "imperial"),
    new Unit({
        short: ["ksi"],
        long: { sg: ["kilopound per square inch"], pl: ["kilopounds per square inch"] }
    }, (val) => val * 6894757.29316836133672267344534689069378, (val) => val / 6894757.29316836133672267344534689069378, "imperial"),
);

export default pressure;