import Option from "../../variable/Option";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every SI prefix.
 */
const siPrefixes = [
    new Option("Y", "yotta", 1e24),
    new Option("Z", "zetta", 1e21),
    new Option("E", "exa", 1e18),
    new Option("P", "peta", 1e15),
    new Option("T", "tera", 1e12),
    new Option("G", "giga", 1e9),
    new Option("M", "mega", 1e6),
    new Option("k", "kilo", 1e3),
    new Option("h", "hecto", 1e2),
    new Option("da", "deka", 1e1),
    new Option("d", "deci", 1e-1),
    new Option("c", "centi", 1e-2),
    new Option("m", "milli", 1e-3),
    new Option("μ", "micro", 1e-6),
    new Option("n", "nano", 1e-9),
    new Option("p", "pico", 1e-12),
    new Option("f", "femto", 1e-15),
    new Option("a", "atto", 1e-18),
    new Option("z", "zepto", 1e-21),
    new Option("y", "yocto", 1e-24),
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