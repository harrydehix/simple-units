import Group from "../../Group";
import Formats from "../../unit/formatting/Formats";
import PrefixedUnit from "../../unit/PrefixedUnit";
import SimpleUnit from "../../unit/SimpleUnit";
import siPrefixes from "../variables/siPrefixes";

const pressure = new Group("pressure");

pressure.addUnits(
    new PrefixedUnit(new Formats(["Pa"], { sg: ["Pascal"], pl: ["Pascals"] }), (val) => val, (val) => val, siPrefixes("μ")),
    new SimpleUnit(new Formats(["bar"], { sg: ["Bar"], pl: ["Bars"] }), (val) => val * 100000, (val) => val / 100000),
    new SimpleUnit(new Formats(["torr"], { sg: ["Torr"], pl: ["Torrs"] }), (val) => val * 133.3224, (val) => val / 133.3224),
    new SimpleUnit(new Formats(["atm"], { sg: ["standard atmosphere"], pl: ["standard atmospheres"] }), (val) => val * 101325, (val) => val / 101325),
    new SimpleUnit(new Formats(["psi", "lb. p. sq. in.", "psia", "psig"], { sg: ["pound-force per square inch", "pound per square inch"], pl: ["pounds per square inch"] }), (val) => val * 6894.75729316836133672267344534689069378, (val) => val / 6894.75729316836133672267344534689069378),
    new SimpleUnit(new Formats(["ksi"], { sg: ["kilopound per square inch"], pl: ["kilopounds per square inch"] }), (val) => val * 6894757.29316836133672267344534689069378, (val) => val / 6894757.29316836133672267344534689069378),
    new SimpleUnit(new Formats(["Mpsi"], { sg: ["megapound per square inch"], pl: ["megapounds per square inch"] }), (val) => val * 6_894_757_293.16836133672267344534689069378, (val) => val / 6_894_757_293.16836133672267344534689069378),
);

export default pressure;