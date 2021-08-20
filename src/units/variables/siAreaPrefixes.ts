import Multiplier from "../../variable/Multiplier";
import Variable from "../../variable/Variable";
import { SIPrefix } from "./siPrefixes";

/**
 * The multipliers belonging to the standard SI area prefixes arranged in an array.
 * @see Multiplier
 */
const siAreaPrefixes = [
    new Multiplier("Y", "yotta", 1e48),
    new Multiplier("Z", "zetta", 1e42),
    new Multiplier("E", "exa", 1e36),
    new Multiplier("P", "peta", 1e30),
    new Multiplier("T", "tera", 1e24),
    new Multiplier("G", "giga", 1e18),
    new Multiplier("M", "mega", 1e12),
    new Multiplier("k", "kilo", 1e6),
    new Multiplier("h", "hecto", 1e4),
    new Multiplier("da", "deka", 1e2),
    new Multiplier("d", "deci", 1e-2),
    new Multiplier("c", "centi", 1e-4),
    new Multiplier("m", "milli", 1e-6),
    new Multiplier("μ", "micro", 1e-12),
    new Multiplier("n", "nano", 1e-18),
    new Multiplier("p", "pico", 1e-24),
    new Multiplier("f", "femto", 1e-30),
    new Multiplier("a", "atto", 1e-36),
    new Multiplier("z", "zepto", 1e-42),
    new Multiplier("y", "yocto", 1e-48),
];

/**
 * Generates a {@link Variable} holding all requested standard SI area prefixes.
 */
export default (from: SIPrefix = "y", to: SIPrefix = "Y") => {
    const toIndex = siAreaPrefixes.findIndex((val) => val.short === from);
    const fromIndex = siAreaPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...siAreaPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}