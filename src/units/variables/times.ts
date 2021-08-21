import Option from "../../variable/Option";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every time unit as multiplier.
 * @see Multiplier
 */
const times = new Variable(false,
    new Option("a", "year", 31556952),
    new Option("mth", "month", 2_592_000),
    new Option("wk", "week", 604_800),
    new Option("d", "day", 86_400),
    new Option("h", "hour", 3_600),
    new Option("min", "minute", 60),
    new Option("s", "second", 1),
    new Option("ds", "decisecond", 1e-1),
    new Option("cs", "centisecond", 1e-2),
    new Option("ms", "millisecond", 1e-3),
    new Option("μs", "microsecond", 1e-6),
    new Option("ns", "nanosecond", 1e-9),
    new Option("ps", "picosecond", 1e-12),
    new Option("fs", "femtosecond", 1e-15),
    new Option("as", "attosecond", 1e-18),
    new Option("zs", "zeptosecond", 1e-21),
    new Option("ys", "yoctosecond", 1e-24),
);

export default times;