import Collection from "../Collection.js";

import mass from "./groups/mass.js";
import pressure from "./groups/pressure.js";
import temperature from "./groups/temperature.js";
import time from "./groups/time.js";
import length from "./groups/length.js";
import area from "./groups/area.js";
import digital from "./groups/digital.js";
import speed from "./groups/speed/speed.js";
import energy from "./groups/energy.js";
import volume from "./groups/volume.js";
import current from "./groups/current.js";
import voltage from "./groups/voltage.js";
import partsPer from "./groups/partsPer.js";
import force from "./groups/force.js";
import power from "./groups/power.js";

/**
 * _simple-units_ default {@link Collection} holding the most common units.
 *
 * Log the collection to the console to get an overview of all supported units.
 * @example
 * ```typescript
 * import units from "simple-units.js";
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
    voltage,
    power,
    partsPer,
    force
);

export default units;
