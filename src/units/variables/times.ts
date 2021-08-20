import Multiplier from "../../variable/Multiplier";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every time unit as multiplier.
 * @see Multiplier
 */
const times = new Variable(false,
    new Multiplier("a", "year", 31556952),
    new Multiplier("mth", "month", 2_592_000),
    new Multiplier("wk", "week", 604_800),
    new Multiplier("d", "day", 86_400),
    new Multiplier("h", "hour", 3_600),
    new Multiplier("min", "minute", 60),
    new Multiplier("s", "second", 1),
    new Multiplier("ds", "decisecond", 1e-1),
    new Multiplier("cs", "centisecond", 1e-2),
    new Multiplier("ms", "millisecond", 1e-3),
    new Multiplier("μs", "microsecond", 1e-6),
    new Multiplier("ns", "nanosecond", 1e-9),
    new Multiplier("ps", "picosecond", 1e-12),
    new Multiplier("fs", "femtosecond", 1e-15),
    new Multiplier("as", "attosecond", 1e-18),
    new Multiplier("zs", "zeptosecond", 1e-21),
    new Multiplier("ys", "yoctosecond", 1e-24),
);

export default times;