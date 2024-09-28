import { inspect } from "util";
import ConversionError from "./errors/ConversionError.js";
import Unit from "./Unit.js";
import { sprintf } from "sprintf-js";
import IllegalArgumentsError from "./errors/IllegalArgumentsError.js";

export type FormatOptions = {
    length?: "long" | "short";
};

/**
 * A convertible combines a number with a unit.
 * It offers several methods to convert itself into
 * different units and therefore is the key concept behind converting
 * in _simple-units_.
 */
export default class Convertible {
    /**
     * The convertible's value. Changes through converting.
     */
    value: number;

    /**
     * The convertible's unit. Changes through converting.
     */
    get unit() {
        return this._internal._unit as Unit;
    }

    /**
     * These methods and properties are only used internally.
     * @hidden
     */
    _internal = {
        /**
         * The convertible's unit. Changes through converting.
         */
        _unit: null as null | Unit,

        /**
         * Converts the convertible to the passed unit without checking for compatibilty.
         * This method exists due to performance enhancement. Returns the conversion's result.
         * @param unit the target unit
         * @returns the conversion's result
         */
        _toUnitUnchecked: (unit: Unit) => {
            this.value = this.unit.toBase(this.value);
            this.value = unit.fromBase(this.value);
            this._internal._unit = unit;
            return this.value;
        },

        /**
         * Converts the convertible to the passed unit without checking for compatibilty.
         * This method exists due to performance enhancement. Returns the convertible itself.
         * @param unit the target unit
         * @returns the convertible itself
         */
        _asUnitUnchecked: (unit: Unit): this => {
            this.value = this.unit.toBase(this.value);
            this.value = unit.fromBase(this.value);
            this._internal._unit = unit;
            return this;
        },
    };

    /**
     * Creates a convertible with the passed value and unit.
     * It is not recommended to create a convertible this way. Instead
     * use the collection's `.from(value: number, unit: string)` or `.Convertible(value: number, unit: string)` method.
     *
     * **Recommended way to create a convertible**:
     * @example
     * ```
     * import units from "simple-units.js";
     *
     * const convertible = units.Convertible(12, "m");
     * console.log(convertible.value); // Output: 12
     * console.log(convertible.unit.toString()); // Output: m
     * ```
     *
     * @param value the convertible's value
     * @param unit the convertible's unit
     */
    constructor(value: number, unit: Unit) {
        this.value = value;
        this._internal._unit = unit;
    }

    /**
     * Returns an array of units to which the convertible can be converted.
     *
     * @example
     * ```typescript
     * const convertible = units.Convertible(12, "kt");
     *
     * for(const unit of convertible.possibilities()){
     *    console.log(unit); // Output: Ym/a, Zm/a, Em/a, Pm/a, ...
     * }
     * ```
     *
     * @returns an array of units to which the convertible can be converted
     */
    possibilities() {
        return this.unit.possibilities();
    }

    /**
     * Converts the convertible to the passed unit and returns the conversion's result.
     *
     * @example
     * ```
     * const convertible = units.Convertible(12, "°C");
     *
     * console.log(convertible.to("K"));
     * // Output: 261.15
     *
     * console.log(convertible.value);
     * // Output: 261.15
     *
     * console.log(convertible.unit.toString());
     * // Output: K
     * ```
     *
     * @param unit the target unit
     * @returns the conversion's result
     */
    to(unit: string | Unit): number {
        let target: Unit | undefined;
        if (typeof unit === "string") {
            target = this.unit.group._internal._units().get(unit);
            if (!target)
                throw new ConversionError(
                    `Unit '${unit}' does not belong to group '${this.unit.group.name}'!`
                );
        } else {
            target = unit;
            if (target.group !== this.unit.group)
                throw new ConversionError(
                    `Unit '${unit}' does not belong to group '${this.unit.group.name}'!`
                );
        }
        this.value = this.unit.toBase(this.value);
        this.value = target.fromBase(this.value);
        this._internal._unit = target;
        return this.value;
    }

    /**
     * Converts the convertible to the passed unit and returns the convertible itself.
     *
     * @example
     * ```
     * const convertible = units.from(12, "°C").as("K");
     *
     * console.log(convertible.value);
     * // Output: 261.15
     *
     * console.log(convertible.unit.toString());
     * // Output: K
     * ```
     * @param unit the target unit
     * @returns the convertible itself
     */
    as(unit: string | Unit) {
        this.to(unit);
        return this;
    }

    /**
     * Converts the convertible to the best possible unit. In this case the best means having as few digits
     * as possible before the decimal point. Returns the convertible itself.
     *
     * @example
     * ```
     * const convertible = units.Convertible(1000, "m").asBest();
     *
     * console.log(convertible.value);
     * // Output: 1
     *
     * console.log(convertible.unit.toString());
     * // Output: km
     * ```
     *
     * By default the convertible remains in the same unit system. If `false` is passed, this behaviour is disabled.
     * @param remainInUnitSystem whether to remain in the same unit system (default is `true`)
     * @returns the convertible itself
     */
    asBest(remainInUnitSystem = true) {
        let bestUnit = this.unit;
        let bestCount = Number.MAX_VALUE;
        this.unit.group._internal._units().forEach((unit: Unit) => {
            if (!remainInUnitSystem || unit.system === this.unit.system) {
                this._internal._toUnitUnchecked(unit);
                if (this.value >= 1 || this.value <= -1) {
                    const str = String(this.value);
                    if (!str.includes("e")) {
                        let count;
                        if (str.includes(".")) count = str.split(".")[0].length;
                        else count = str.length;
                        if (count < bestCount) {
                            bestUnit = unit;
                            bestCount = count;
                        }
                    }
                }
            }
        });
        this._internal._toUnitUnchecked(bestUnit);
        return this;
    }

    /**
     * Returns the convertible as short string.
     *
     * @example
     * ```
     * const convertible = units.Convertible(1000, "meter");
     *
     * console.log(convertible.toString());
     * // Output: 1000m
     *
     * console.log(convertible);
     * // Output: 1000m (but in blue :D)
     * ```
     *
     * @returns
     */
    toString() {
        return this.value + this.unit.toString();
    }

    /**
     * @hidden
     */
    [inspect.custom](depth: any, options: any) {
        return options.stylize(this.toString(), "special");
    }

    /**
     * Returns the convertible as formatted string.
     *
     * The first argument specifies the _string's format_ (see example), the second one _additional format options_.
     *
     * Currently there is only the format option `length`. Setting this to `"long"` will result in a long unit symbol
     *  (e.g. "meter" or "meters"), `"short"` will result in a short unit symbol (e.g. "m").
     *
     * @example
     * ```
     * const convertible = units.Convertible(12.2323123, "kt");
     *
     * console.log(convertible.format("%.2f %s", { length: "long" }));
     * // Output: 12.23 knots
     * ```
     *
     * @param format the string's format
     * @param formatOptions additional format options
     * @returns the convertible as formatted string
     */
    format(format: string, formatOptions?: FormatOptions): string {
        let length = "short",
            count = "pl";

        if (formatOptions?.length) length = formatOptions.length;
        if (this.value === 1) count = "sg";

        let unit;
        if (length === "short") {
            unit = this.unit.format.short[0];
        } else {
            if (count === "sg") unit = this.unit.format.long.sg[0];
            else unit = this.unit.format.long.pl[0];
        }
        return sprintf(format, this.value, unit);
    }

    /**
     * Creates a copy of the convertible.
     * @returns a copy of the convertible
     */
    copy() {
        return new Convertible(this.value, this.unit);
    }

    /**
     * Compares this convertible semantically to another. Returns `-1`, `0`,
     * or `1` as this convertible is less than, equal to, or greater
     * than the passed convertible.
     * @param other the convertible to be compared
     * @returns `-1`, `0`, or `1` as this convertible is less than, equal to, or greater
     * than the passed convertible
     */
    compare(other: Convertible) {
        if (other.unit.group !== this.unit.group)
            throw new IllegalArgumentsError(
                `Cannot compare convertibles. Unit '${other}' does not belong to the same group as '${this.unit}'!`
            );
        const copyOfOther = other.copy()._internal._asUnitUnchecked(this.unit);
        if (this.value < copyOfOther.value) return -1;
        else if (this.value === copyOfOther.value) return 0;
        else return 1;
    }

    /**
     * Returns whether this convertible is semantically equal to the passed convertible.
     * @param other the convertible to be compared
     * @returns whether this convertible is semantically equal to the passed convertible
     */
    eq(other: Convertible) {
        if (other.unit.group !== this.unit.group)
            throw new IllegalArgumentsError(
                `Cannot compare convertibles. Unit '${other}' does not belong to the same group as '${this.unit}'!`
            );
        const copyOfOther = other.copy()._internal._asUnitUnchecked(this.unit);
        return this.value === copyOfOther.value;
    }

    /**
     * Returns whether this convertible is semantically less than the passed convertible.
     * @param other the convertible to be compared
     * @returns whether this convertible is semantically less than the passed convertible
     */
    lt(other: Convertible) {
        if (other.unit.group !== this.unit.group)
            throw new IllegalArgumentsError(
                `Cannot compare convertibles. Unit '${other}' does not belong to the same group as '${this.unit}'!`
            );
        const copyOfOther = other.copy()._internal._asUnitUnchecked(this.unit);
        return this.value < copyOfOther.value;
    }

    /**
     * Returns whether this convertible is semantically less than or equal to the passed convertible.
     * @param other the convertible to be compared
     * @returns whether this convertible is semantically less than or equal to the passed convertible
     */
    lte(other: Convertible) {
        if (other.unit.group !== this.unit.group)
            throw new IllegalArgumentsError(
                `Cannot compare convertibles. Unit '${other}' does not belong to the same group as '${this.unit}'!`
            );
        const copyOfOther = other.copy()._internal._asUnitUnchecked(this.unit);
        return this.value <= copyOfOther.value;
    }

    /**
     * Returns whether this convertible is semantically greater than the passed convertible.
     * @param other the convertible to be compared
     * @returns whether this convertible is semantically greater than the passed convertible
     */
    gt(other: Convertible) {
        if (other.unit.group !== this.unit.group)
            throw new IllegalArgumentsError(
                `Cannot compare convertibles. Unit '${other}' does not belong to the same group as '${this.unit}'!`
            );
        const copyOfOther = other.copy()._internal._asUnitUnchecked(this.unit);
        return this.value > copyOfOther.value;
    }

    /**
     * Returns whether this convertible is semantically greater than or equal to the passed convertible.
     * @param other the convertible to be compared
     * @returns whether this convertible is semantically greater than or equal to the passed convertible
     */
    gte(other: Convertible) {
        if (other.unit.group !== this.unit.group)
            throw new IllegalArgumentsError(
                `Cannot compare convertibles. Unit '${other}' does not belong to the same group as '${this.unit}'!`
            );
        const copyOfOther = other.copy()._internal._asUnitUnchecked(this.unit);
        return this.value >= copyOfOther.value;
    }
}
