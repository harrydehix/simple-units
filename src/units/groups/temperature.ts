import Group from "../../Group";
import Unit from "../../Unit";

/**
 * {@link Group} holding all temperature units.
 */
const temperature = new Group("temperature");

temperature.Editor.add(
    Unit.create({
        short: ["°F"],
        long: {
            sg: ["degree Fahrenheit"],
            pl: ["degrees Fahrenheit"]
        }
    }, 5 / 9, 45967 / 180, "imperial"),
    Unit.create({
        short: ["°C"],
        long: {
            sg: ["degree Celsius"],
            pl: ["degrees Celsius"]
        }
    }, 1, 273.15, "metric"),
    Unit.create({
        short: ["K"],
        long: {
            sg: ["Kelvin"],
            pl: ["Kelvin"]
        }
    }, 1, 0, "metric"),
    Unit.create({
        short: ["°R"],
        long: {
            sg: ["degree Rankine"],
            pl: ["degrees Rankine"],
        }
    }, 5 / 9, 0, "imperial"),
);

export default temperature;