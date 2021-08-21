import Option from "../../variable/Option";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every time unit for use in the denominator.
 * @see Multiplier
 */
const dividedByTimes = new Variable(false,
    new Option("a", "year", 1 / 31556952),
    new Option("mth", "month", 1 / 2_592_000),
    new Option("wk", "week", 1 / 604_800),
    new Option("d", "day", 1 / 86_400),
    new Option("h", "hour", 1 / 3_600),
    new Option("min", "minute", 1 / 60),
    new Option("s", "second", 1),
    new Option("ds", "decisecond", 1e1),
    new Option("cs", "centisecond", 1e2),
    new Option("ms", "millisecond", 1e3),
    new Option("μs", "microsecond", 1e6),
    new Option("ns", "nanosecond", 1e9),
    new Option("ps", "picosecond", 1e12),
    new Option("fs", "femtosecond", 1e15),
    new Option("as", "attosecond", 1e18),
    new Option("zs", "zeptosecond", 1e21),
    new Option("ys", "yoctosecond", 1e24),
);

export default dividedByTimes;