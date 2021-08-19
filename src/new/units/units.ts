import Collection from "../Collection";
import mass from "./groups/mass";
import pressure from "./groups/pressure";
import temperature from "./groups/temperature";
import time from "./groups/time";
import length from "./groups/length";
import area from "./groups/area";
import digital from "./groups/digital";
import speed from "./groups/speed/speed";

const units = new Collection();

units.Editor.add(
    length,
    mass,
    pressure,
    time,
    area,
    temperature,
    digital,
    speed
);

export default units;