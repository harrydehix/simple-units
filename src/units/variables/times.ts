import Value from "../../variable/Value";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every time unit.
 */
const times = new Variable([
    new Value("a", "year", 31556952),
    new Value("mth", "month", 2_592_000),
    new Value("wk", "week", 604_800),
    new Value("d", "day", 86_400),
    new Value("h", "hour", 3_600),
    new Value("min", "minute", 60),
    new Value("s", "second", 1),
    new Value("ds", "decisecond", 1e-1),
    new Value("cs", "centisecond", 1e-2),
    new Value("ms", "millisecond", 1e-3),
    new Value("μs", "microsecond", 1e-6),
    new Value("ns", "nanosecond", 1e-9),
    new Value("ps", "picosecond", 1e-12),
    new Value("fs", "femtosecond", 1e-15),
    new Value("as", "attosecond", 1e-18),
    new Value("zs", "zeptosecond", 1e-21),
    new Value("ys", "yoctosecond", 1e-24),
], false);

export default times;