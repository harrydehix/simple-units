import Collection from "../Collection";
import mass from "./groups/mass";
import pressure from "./groups/pressure";
import temperature from "./groups/temperature";
import time from "./groups/time";
import length from "./groups/length";
import area from "./groups/area";
import digital from "./groups/digital";
import speed from "./groups/speed/speed";
import energy from "./groups/energy";
import volume from "./groups/volume";
import current from "./groups/current";
import voltage from "./groups/voltage";

/**
 * _simple-units_ default {@link Collection} holding the most common units.
 * 
 * Log the collection to the console to get an overview of all supported units.
 * @example
 * ```typescript
 * import units from "simple-units";
 * 
 * console.log(units);
 * ```
 *
*/
const units = new Collection();

units.Editor.add(
    length,
    mass,
    pressure,
    time,
    area,
    temperature,
    digital,
    speed,
    energy,
    volume,
    current,
    voltage
);

export default units;