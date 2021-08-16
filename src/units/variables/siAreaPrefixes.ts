import Multiplicator from "../../multiplicator/Multiplicator";
import Variable from "../../multiplicator/Variable";

const siAreaPrefixes = [
    new Multiplicator("Y", "yotta", 1e48),
    new Multiplicator("Z", "zetta", 1e42),
    new Multiplicator("E", "exa", 1e36),
    new Multiplicator("P", "peta", 1e30),
    new Multiplicator("T", "tera", 1e24),
    new Multiplicator("G", "giga", 1e18),
    new Multiplicator("M", "mega", 1e12),
    new Multiplicator("k", "kilo", 1e6),
    new Multiplicator("h", "hecto", 1e4),
    new Multiplicator("da", "deka", 1e2),
    new Multiplicator("d", "deci", 1e-2),
    new Multiplicator("c", "centi", 1e-4),
    new Multiplicator("m", "milli", 1e-6),
    new Multiplicator("μ", "micro", 1e-12),
    new Multiplicator("n", "nano", 1e-18),
    new Multiplicator("p", "pico", 1e-24),
    new Multiplicator("f", "femto", 1e-30),
    new Multiplicator("a", "atto", 1e-36),
    new Multiplicator("z", "zepto", 1e-42),
    new Multiplicator("y", "yocto", 1e-48),
];

type SIPrefix = "Y" | "Z" | "E" | "P" | "T" | "G" | "M" | "k" | "h" | "da" | "d" | "c" | "m" | "μ" | "n" | "p" | "f" | "a" | "z" | "y";
export default (from: SIPrefix = "y", to: SIPrefix = "Y") => {
    const fromIndex = siAreaPrefixes.findIndex((val) => val.short === from);
    const toIndex = siAreaPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...siAreaPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}