import Multiplicator from "../../unitCreator/variable/Multiplicator";
import Variable from "../../unitCreator/variable/Variable";


/** Multiplicators for any/[time, default: s] */
const dividedByTimes = new Variable(false,
    new Multiplicator("a", "year", 1 / 31556952),
    new Multiplicator("mth", "month", 1 / 2_592_000),
    new Multiplicator("wk", "week", 1 / 604_800),
    new Multiplicator("d", "day", 1 / 86_400),
    new Multiplicator("h", "hour", 1 / 3_600),
    new Multiplicator("min", "minute", 1 / 60),
    new Multiplicator("s", "second", 1),
    new Multiplicator("ds", "decisecond", 1e1),
    new Multiplicator("cs", "centisecond", 1e2),
    new Multiplicator("ms", "millisecond", 1e3),
    new Multiplicator("μs", "microsecond", 1e6),
    new Multiplicator("ns", "nanosecond", 1e9),
    new Multiplicator("ps", "picosecond", 1e12),
    new Multiplicator("fs", "femtosecond", 1e15),
    new Multiplicator("as", "attosecond", 1e18),
    new Multiplicator("zs", "zeptosecond", 1e21),
    new Multiplicator("ys", "yoctosecond", 1e24),
);

export default dividedByTimes;