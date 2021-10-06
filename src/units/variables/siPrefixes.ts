import Value from "../../variable/Value";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every SI prefix.
 */
export default new Variable([
    new Value("y", "yocto", 1e-24),
    new Value("z", "zepto", 1e-21),
    new Value("a", "atto", 1e-18),
    new Value("f", "femto", 1e-15),
    new Value("p", "pico", 1e-12),
    new Value("n", "nano", 1e-9),
    new Value("μ", "micro", 1e-6),
    new Value("m", "milli", 1e-3),
    new Value("c", "centi", 1e-2),
    new Value("d", "deci", 1e-1),
    new Value("da", "deka", 1e1),
    new Value("h", "hecto", 1e2),
    new Value("k", "kilo", 1e3),
    new Value("M", "mega", 1e6),
    new Value("G", "giga", 1e9),
    new Value("T", "tera", 1e12),
    new Value("P", "peta", 1e15),
    new Value("E", "exa", 1e18),
    new Value("Z", "zetta", 1e21),
    new Value("Y", "yotta", 1e24),
]);