import FlexibleUnit from "../../FlexibleUnit.js";
import Group from "../../Group.js";
import Unit from "../../Unit.js";
import siVolumePrefixes from "../variables/siVolumePrefixes.js";
import siPrefixes from "../variables/siPrefixes.js";

/**
 * {@link Group} holding all volume units.
 */
const volume = new Group("volume");

volume.Editor.add(
    new FlexibleUnit(
        {
            short: ["%0m³", "%0m^3", "%0m3"],
            long: {
                sg: ["cubic %0meter", "cubic %0metre"],
                pl: ["cubic %0meters", "cubic %0metres"],
            },
        },
        1,
        0,
        "metric",
        [siVolumePrefixes]
    ),
    new FlexibleUnit(
        {
            short: ["%0l"],
            long: {
                sg: ["%0liter", "%0litre"],
                pl: ["%0liters", "%0litres"],
            },
        },
        0.001,
        0,
        "metric",
        [siPrefixes.subcopy("m", "k")]
    ),
    new Unit(
        {
            short: ["in³", "″³", "in^3", "″^3", "″3", "in3"],
            long: {
                sg: ["cubic inch"],
                pl: ["cubic inches"],
            },
        },
        0.000016387064,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["ft³", "ft^3", "ft3"],
            long: {
                sg: ["cubic foot"],
                pl: ["cubic feet"],
            },
        },
        0.028316846592,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["yd³", "yd^3", "yd3"],
            long: {
                sg: ["cubic yard"],
                pl: ["cubic yards"],
            },
        },
        0.764554857984,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["c"],
            long: {
                sg: ["cup"],
                pl: ["cups"],
            },
        },
        1 / 4000,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["tsp"],
            long: {
                sg: ["teaspoon"],
                pl: ["teaspoons"],
            },
        },
        1 / 202884.1361596055,
        0,
        "U.S. customary"
    ),
    new Unit(
        {
            short: ["tbsp"],
            long: {
                sg: ["tablespoon"],
                pl: ["tablespoons"],
            },
        },
        1 / 67628.04539796905,
        0,
        "U.S. customary"
    ),
    new Unit(
        {
            short: ["fl oz", "fl-oz"],
            long: {
                sg: ["fluid ounce"],
                pl: ["fluid ounces"],
            },
        },
        1 / 35195.07972785405,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["qt"],
            long: {
                sg: ["quart"],
                pl: ["quarts"],
            },
        },
        1 / 879.8769931963512,
        0,
        "imperial"
    ),
    new Unit(
        {
            short: ["gal"],
            long: {
                sg: ["gallon"],
                pl: ["gallons"],
            },
        },
        1 / 219.96924829908778,
        0,
        "imperial"
    )
);

export default volume;
