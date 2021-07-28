import MyUnits from "./MyCustomCollection";
import DefaultUnits from "../collections/DefaultUnitCollection";

DefaultUnits.Convertable("3cm").to(MyUnits.CustomUnit);

console.log(MyUnits.Convertable("300CU"));

const data = {
    temperature: MyUnits.Convertable(12, MyUnits.CustomUnit),
    length:
        MyUnits.Convertable("3.432dam"),
    humidities: [
        MyUnits.Convertable("12m").to("cm"),
        MyUnits.Convertable("1009°C"),
        MyUnits.Convertable(12, MyUnits.CustomUnit),
        MyUnits.Convertable(12, MyUnits.CustomUnit),
        1001,
        2322,
        "dfsdf"
    ]
}

const convertedData = MyUnits.convertWithPreferences(data, MyUnits.Preferences({
    [MyUnits.Groups.CustomGroup]: MyUnits.CustomUnit,
}));

console.log(convertedData);
