import FlexibleUnit from "../../FlexibleUnit";
import Group from "../../Group";
import Unit from "../../Unit";
import siPrefixes from "../variables/siPrefixes";

/**
 * {@link Group} holding all pressure units.
 */
const pressure = new Group("pressure");

pressure.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0Pa"],
            long: { sg: ["%0pascal"], pl: ["%0pascals"] },
        },
        1,
        0,
        "metric",
        [siPrefixes.subcopy("μ")]
    ),
    new Unit(
        {
            short: ["bar"],
            long: { sg: ["Bar"], pl: ["Bars"] },
        },
        1e5,
        0,
        "metric"
    ),
    new Unit(
        {
            short: ["torr"],
            long: { sg: ["Torr"], pl: ["Torrs"] },
        },
        133.3224,
        0,
        "metric"
    ),
    new Unit(
        {
            short: ["atm"],
            long: { sg: ["standard atmosphere"], pl: ["standard atmospheres"] },
        },
        101325,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["Mpsi"],
            long: {
                sg: ["megapound per square inch"],
                pl: ["megapounds per square inch"],
            },
        },
        6_894_757_293.16836133672267344534689069378,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["psi", "lb. p. sq. in.", "psia", "psig"],
            long: {
                sg: ["pound-force per square inch", "pound per square inch"],
                pl: ["pounds per square inch"],
            },
        },
        6894.75729316836133672267344534689069378,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["ksi"],
            long: {
                sg: ["kilopound per square inch"],
                pl: ["kilopounds per square inch"],
            },
        },
        6894757.29316836133672267344534689069378,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["inHg"],
            long: {
                sg: ["inch of mercury"],
                pl: ["inches of mercury"],
            },
        },
        3386.3886666667,
        0,
        "imperial"
    )
);

export default pressure;
