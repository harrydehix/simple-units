import Group from "../../Group";
import SimpleUnit from "../../SimpleUnit";

/**
 * {@link Group} holding all temperature units.
 */
const temperature = new Group("temperature");

temperature.Editor.add(
    new SimpleUnit({
        short: ["°F"],
        long: {
            sg: ["degree Fahrenheit"],
            pl: ["degrees Fahrenheit"]
        }
    }, 5 / 9, 45967 / 180, "imperial"),
    new SimpleUnit({
        short: ["°C"],
        long: {
            sg: ["degree Celsius"],
            pl: ["degrees Celsius"]
        }
    }, 1, 273.15, "metric"),
    new SimpleUnit({
        short: ["K"],
        long: {
            sg: ["Kelvin"],
            pl: ["Kelvin"]
        }
    }, 1, 0, "metric"),
    new SimpleUnit({
        short: ["°R"],
        long: {
            sg: ["degree Rankine"],
            pl: ["degrees Rankine"],
        }
    }, 5 / 9, 0, "imperial"),
);

export default temperature;