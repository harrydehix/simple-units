import Prefix from "./Prefix";


const defaultPrefixes: Prefix[] = [
    new Prefix("Y", "yotta", 1e24),
    new Prefix("Z", "zetta", 1e21),
    new Prefix("E", "exa", 1e18),
    new Prefix("P", "peta", 1e15),
    new Prefix("T", "tera", 1e12),
    new Prefix("G", "giga", 1e9),
    new Prefix("M", "mega", 1e6),
    new Prefix("k", "kilo", 1e3),
    new Prefix("h", "hecto", 1e2),
    new Prefix("da", "deka", 1e1),
    new Prefix("d", "deci", 1e-1),
    new Prefix("c", "centi", 1e-2),
    new Prefix("m", "milli", 1e-3),
    new Prefix("μ", "micro", 1e-6),
    new Prefix("n", "nano", 1e-9),
    new Prefix("p", "pico", 1e-12),
    new Prefix("f", "femto", 1e-15),
    new Prefix("a", "atto", 1e-18),
    new Prefix("z", "zepto", 1e-21),
    new Prefix("y", "yocto", 1e-24),
];

export default defaultPrefixes;