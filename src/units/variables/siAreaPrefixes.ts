import Option from "../../variable/Option";
import Variable from "../../variable/Variable";
import { SIPrefix } from "./siPrefixes";

/**
 * The multipliers belonging to the standard SI area prefixes arranged in an array.
 * @see Multiplier
 */
const siAreaPrefixes = [
    new Option("Y", "yotta", 1e48),
    new Option("Z", "zetta", 1e42),
    new Option("E", "exa", 1e36),
    new Option("P", "peta", 1e30),
    new Option("T", "tera", 1e24),
    new Option("G", "giga", 1e18),
    new Option("M", "mega", 1e12),
    new Option("k", "kilo", 1e6),
    new Option("h", "hecto", 1e4),
    new Option("da", "deka", 1e2),
    new Option("d", "deci", 1e-2),
    new Option("c", "centi", 1e-4),
    new Option("m", "milli", 1e-6),
    new Option("μ", "micro", 1e-12),
    new Option("n", "nano", 1e-18),
    new Option("p", "pico", 1e-24),
    new Option("f", "femto", 1e-30),
    new Option("a", "atto", 1e-36),
    new Option("z", "zepto", 1e-42),
    new Option("y", "yocto", 1e-48),
];

/**
 * Generates a {@link Variable} holding all requested standard SI area prefixes.
 */
export default (from: SIPrefix = "y", to: SIPrefix = "Y") => {
    const toIndex = siAreaPrefixes.findIndex((val) => val.short === from);
    const fromIndex = siAreaPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...siAreaPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}