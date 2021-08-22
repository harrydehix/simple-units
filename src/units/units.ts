import Collection from "../Collection";
import mass from "./groups/mass";
import pressure from "./groups/pressure";
import temperature from "./groups/temperature";
import time from "./groups/time";
import length from "./groups/length";
import area from "./groups/area";
import digital from "./groups/digital";
import speed from "./groups/speed/speed";

/**
 * {@link Collection} of a variety of common units.
 * 
 * To simply convert a value from one unit to another use the `from-to`-syntax.
 * @example
 * ```
 * const converted = units.from(12, "°C").to("°F");
 * console.log(converted); // Output: 56.6
 * ```
 * If you want to convert the same value into different units you should use the  `Convertable`-syntax to safe some time
 * and memory.
 * @example
 * ```
 * const convertable = units.Convertable(12, "°C");
 * console.log(convertable.to("°F")); // Output: 56.6
 * console.log(convertable.to("K"));  // Output: 285.15
 * console.log(convertable.to("°R")); // Output: 513.27
 * ```
 * 
 * To learn more about collections in general, like editing this one, creating custom ones and many more read the documentation of the {@link Collection} class.
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
    speed
);

export default units;