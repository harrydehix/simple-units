import Group from "../../Group";
import Formats from "../../unit/formatting/Formats";
import SimpleUnit from "../../unit/SimpleUnit";

const temperature = new Group("temperature");

temperature.setUnits(
    new SimpleUnit(new Formats(["K"], ["Kelvin"]), (val) => val, (val) => val),
    new SimpleUnit(new Formats(["°C"], {
        sg: ["degree Celsius"],
        pl: ["degrees Celsius"],
    }), (val) => val + 273.15, (val) => val - 273.15),
    new SimpleUnit(new Formats(["°F"], {
        sg: ["degree Fahrenheit"],
        pl: ["degrees Fahrenheit"],
    }), (val) => (val - 32) * 5 / 9 + 273.15, (val) => (val - 273.15) * 9 / 5 + 32),
    new SimpleUnit(new Formats(["°R"], {
        sg: ["degree Rankine"],
        pl: ["degrees Rankine"],
    }), (val) => val * 5 / 9, (val) => val * 9 / 5),
)

export default temperature;