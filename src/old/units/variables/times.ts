import Multiplicator from "../../unitCreator/variable/Multiplicator";
import Variable from "../../unitCreator/variable/Variable";

const times = new Variable(false,
    new Multiplicator("a", "year", 31556952),
    new Multiplicator("mth", "month", 2_592_000),
    new Multiplicator("wk", "week", 604_800),
    new Multiplicator("d", "day", 86_400),
    new Multiplicator("h", "hour", 3_600),
    new Multiplicator("min", "minute", 60),
    new Multiplicator("s", "second", 1),
    new Multiplicator("ds", "decisecond", 1e-1),
    new Multiplicator("cs", "centisecond", 1e-2),
    new Multiplicator("ms", "millisecond", 1e-3),
    new Multiplicator("μs", "microsecond", 1e-6),
    new Multiplicator("ns", "nanosecond", 1e-9),
    new Multiplicator("ps", "picosecond", 1e-12),
    new Multiplicator("fs", "femtosecond", 1e-15),
    new Multiplicator("as", "attosecond", 1e-18),
    new Multiplicator("zs", "zeptosecond", 1e-21),
    new Multiplicator("ys", "yoctosecond", 1e-24),
);

export default times;