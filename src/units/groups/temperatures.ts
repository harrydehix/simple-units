import Group from "../../Group";
import Unit from "../../Unit";

const temperature = new Group("temperature");

temperature.setUnits(
    new Unit(["K"], [], (val) => val, (val) => val),
    new Unit(["°C"], [], (val) => val + 273.15, (val) => val - 273.15),
    new Unit(["°F"], [], (val) => (val - 32) * 5 / 9 + 273.15, (val) => (val - 273.15) * 9 / 5 + 32),
    new Unit(["°R"], [], (val) => val * 5 / 9, (val) => val * 9 / 5),
)

export default temperature;