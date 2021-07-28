import UnitPreferences from "../UnitPreferences";
import Units from "./MyCustomCollection";

console.log(Units.Convertable("300°Penis"));

const data = {
    temperature: Units.Convertable(12, Units.Celsius),
    length:
        Units.Convertable("3.432dam"),
    humidities: [
        Units.Convertable("12m").to("cm"),
        Units.Convertable("1009°C"),
        Units.Convertable(12, Units.Celsius),
        Units.Convertable(12, Units.Celsius),
        1001,
        2322,
        "dfsdf"
    ]
}

const convertedData = Units.convertWithPreferences(data, new UnitPreferences({
    [Units.Groups.Length]: Units.Micrometre,
    [Units.Groups.Temperature]: Units.Celsius,
}));

console.log(convertedData);
