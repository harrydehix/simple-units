import Collection from "../Collection";
import area from "./groups/area";
import digital from "./groups/digital";
import length from "./groups/length";
import mass from "./groups/mass";
import pressure from "./groups/pressure";
import speed from "./groups/speed/speed";
import temperature from "./groups/temperature";
import time from "./groups/time";


const units = new Collection();

units.setGroups(
    time,
    length,
    speed,
    area,
    temperature,
    mass,
    digital,
    pressure
);

export default units;