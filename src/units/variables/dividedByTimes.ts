import Multiplier from "../../variable/Multiplier";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every time unit for use in the denominator.
 * @see Multiplier
 */
const dividedByTimes = new Variable(false,
    new Multiplier("a", "year", 1 / 31556952),
    new Multiplier("mth", "month", 1 / 2_592_000),
    new Multiplier("wk", "week", 1 / 604_800),
    new Multiplier("d", "day", 1 / 86_400),
    new Multiplier("h", "hour", 1 / 3_600),
    new Multiplier("min", "minute", 1 / 60),
    new Multiplier("s", "second", 1),
    new Multiplier("ds", "decisecond", 1e1),
    new Multiplier("cs", "centisecond", 1e2),
    new Multiplier("ms", "millisecond", 1e3),
    new Multiplier("μs", "microsecond", 1e6),
    new Multiplier("ns", "nanosecond", 1e9),
    new Multiplier("ps", "picosecond", 1e12),
    new Multiplier("fs", "femtosecond", 1e15),
    new Multiplier("as", "attosecond", 1e18),
    new Multiplier("zs", "zeptosecond", 1e21),
    new Multiplier("ys", "yoctosecond", 1e24),
);

export default dividedByTimes;