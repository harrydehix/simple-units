import Unit, { UnitFormat } from "./Unit";

/**
 * Represents a standard measure that is used to express amounts. 
 * 
 * In difference to the {@link Unit}
 * one doesn't need to specify functions describing how to convert the unit to the group's base unit and vice versa.
 * 
 * Instead one only specifies the mathematical relation the the base unit - in the form of a ratio and a shift.
 * 
 * <b>Example</b>: You want to define the unit <i>Celsius</i> and you have already defined the base unit <i>Kelvin</i>.
 * You know the formula to convert a value from <i>Celsius</i> to <i>Kelvin</i> is: `°C + 273.15 = °K`.
 * Using the `Unit` class you had to write the following:
 * ```
 * new Unit({...}, (val) => val + 273.15, (val) => val - 273.15, ...);
 * ```
 * As you see there is repetitive code. Couldn't one save one of the two converter functions?
 * Lets see how we create the unit using the `SimpleUnit` class.
 * ```
 * new SimpleUnit({...}, 1, 273.15, ...);
 * ```
 * `1` is the ratio between the units, `273.15` the shift. Much easier, isn't it? And no repetitive code!
*/
export default class SimpleUnit extends Unit {
    /**
     * Creates a standard measure that is used to express amounts.
     * @param format the unit's format, holds the unit's different symbols (e.g. `m` for the unit meter)
     * @param ratio the ratio between this and the group's base unit
     * @param shift the shift between this and the group's base unit
     * @param system the unit system the unit is belonging to
     */
    constructor(format: UnitFormat, ratio: number, shift: number, system: string) {
        super(format,
            (val: number) => {
                return val * ratio + shift;
            },
            (val: number) => {
                return (val - shift) / ratio;
            },
            system);
    }
}
