import Collection from "../Collection";
import area from "./groups/area";
import length from "./groups/length";
import mass from "./groups/mass";
import speed from "./groups/speed/speed";
import temperature from "./groups/temperatures";


const units = new Collection();

units.setGroups(
    temperature,
    length,
    speed,
    area,
    mass
);

export default units;