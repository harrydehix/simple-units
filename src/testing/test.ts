import UnitNumber from "../UnitNumber";
import UnitPreferences from "../UnitPreference";
import Units from "../collections/DefaultUnitCollection";

const data = {
    temperature: new UnitNumber(12, Units.Celsius),
    length:
        UnitNumber.parse("3.432dam", Units),
    humidities: [
        new UnitNumber(120, Units.Celsius),
        new UnitNumber(3, Units.Celsius),
        new UnitNumber(23, Units.Celsius),
        new UnitNumber(1, Units.Celsius),
        1001,
        2322,
        "dfsdf"
    ]
}

console.log(Units.convertWithPreferences(data, new UnitPreferences({
    [Units.Groups.Length]: Units.Micrometre,
    [Units.Groups.Temperature]: Units.Celsius,
})));
