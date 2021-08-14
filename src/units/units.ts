import Collection from "../Collection";
import length from "./groups/length";
import speed from "./groups/speed/speed";
import temperature from "./groups/temperatures";


const units = new Collection();

units.setGroups(
    temperature,
    length,
    speed
);

export default units;