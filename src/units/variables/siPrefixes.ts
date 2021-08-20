import Multiplier from "../../variable/Multiplier";
import Variable from "../../variable/Variable";

/**
 * The multipliers belonging to the standard SI prefixes arranged in an array.
 * @see Multiplier
 */
const siPrefixes = [
    new Multiplier("Y", "yotta", 1e24),
    new Multiplier("Z", "zetta", 1e21),
    new Multiplier("E", "exa", 1e18),
    new Multiplier("P", "peta", 1e15),
    new Multiplier("T", "tera", 1e12),
    new Multiplier("G", "giga", 1e9),
    new Multiplier("M", "mega", 1e6),
    new Multiplier("k", "kilo", 1e3),
    new Multiplier("h", "hecto", 1e2),
    new Multiplier("da", "deka", 1e1),
    new Multiplier("d", "deci", 1e-1),
    new Multiplier("c", "centi", 1e-2),
    new Multiplier("m", "milli", 1e-3),
    new Multiplier("μ", "micro", 1e-6),
    new Multiplier("n", "nano", 1e-9),
    new Multiplier("p", "pico", 1e-12),
    new Multiplier("f", "femto", 1e-15),
    new Multiplier("a", "atto", 1e-18),
    new Multiplier("z", "zepto", 1e-21),
    new Multiplier("y", "yocto", 1e-24),
];

/**
 * One of the twenty prefixes specified by the BIPM for the Internation System of Units (SI).
 */
export type SIPrefix = "Y" | "Z" | "E" | "P" | "T" | "G" | "M" | "k" | "h" | "da" | "d" | "c" | "m" | "μ" | "n" | "p" | "f" | "a" | "z" | "y";

/**
 * Generates a {@link Variable} holding all requested standard SI prefixes.
 */
export default (from: SIPrefix = "y", to: SIPrefix = "Y") => {
    const toIndex = siPrefixes.findIndex((val) => val.short === from);
    const fromIndex = siPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...siPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}