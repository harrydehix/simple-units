import MyUnits from "./MyCustomCollection";
import DefaultUnits from "../collections/DefaultUnitCollection";

console.log(MyUnits.Convertable("3cm"))

DefaultUnits.Convertable("3cm").to(MyUnits.CustomUnit);

console.log(MyUnits.Convertable("300CU"));

const data = {
    temperature: MyUnits.Convertable(12, MyUnits.Celsius),
    length:
        MyUnits.Convertable("3.432dam"),
    humidities: [
        MyUnits.Convertable("12m").to("cm"),
        MyUnits.Convertable("1009°C"),
        MyUnits.Convertable(12, MyUnits.Celsius),
        MyUnits.Convertable(12, MyUnits.Celsius),
        1001,
        2322,
        "dfsdf"
    ]
}

const convertedData = MyUnits.convertWithPreferences(data, MyUnits.Preferences({
    [MyUnits.Groups.Length]: MyUnits.Micrometre,
    [MyUnits.Groups.Temperature]: MyUnits.Celsius,
}));

console.log(convertedData);
