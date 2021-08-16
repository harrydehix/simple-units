import Multiplicator from "../../multiplicator/Multiplicator";
import Variable from "../../multiplicator/Variable";

const siPrefixes = [
    new Multiplicator("Y", "yotta", 1e24),
    new Multiplicator("Z", "zetta", 1e21),
    new Multiplicator("E", "exa", 1e18),
    new Multiplicator("P", "peta", 1e15),
    new Multiplicator("T", "tera", 1e12),
    new Multiplicator("G", "giga", 1e9),
    new Multiplicator("M", "mega", 1e6),
    new Multiplicator("k", "kilo", 1e3),
    new Multiplicator("h", "hecto", 1e2),
    new Multiplicator("da", "deka", 1e1),
    new Multiplicator("d", "deci", 1e-1),
    new Multiplicator("c", "centi", 1e-2),
    new Multiplicator("m", "milli", 1e-3),
    new Multiplicator("μ", "micro", 1e-6),
    new Multiplicator("n", "nano", 1e-9),
    new Multiplicator("p", "pico", 1e-12),
    new Multiplicator("f", "femto", 1e-15),
    new Multiplicator("a", "atto", 1e-18),
    new Multiplicator("z", "zepto", 1e-21),
    new Multiplicator("y", "yocto", 1e-24),
];

type SIPrefix = "Y" | "Z" | "E" | "P" | "T" | "G" | "M" | "k" | "h" | "da" | "d" | "c" | "m" | "μ" | "n" | "p" | "f" | "a" | "z" | "y";
export default (from: SIPrefix = "y", to: SIPrefix = "Y") => {
    const fromIndex = siPrefixes.findIndex((val) => val.short === from);
    const toIndex = siPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...siPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}