import Collection from "../Collection";
import area from "./groups/area";
import length from "./groups/length";
import mass from "./groups/mass";
import speed from "./groups/speed/speed";
import temperature from "./groups/temperatures";
import time from "./groups/time";


const units = new Collection();

units.setGroups(
    time,
    length,
    speed,
    area,
    temperature,
    mass,
);

export default units;