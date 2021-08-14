import Group from "../../Group";
import defaultPrefixes from "../../prefixes/DefaultPrefixes";
import Unit from "../../Unit";

const length = new Group("length");

length.setUnits(
    new Unit(["m"], ["meter, metre, meters, metres"], (val) => val, (val) => val, defaultPrefixes),
    new Unit(["in", "″"], ["inch", "inches"], (val) => val * 0.0254, (val) => val / 0.0254),
    new Unit(["yd"], ["yard", "yards"], (val) => val * 0.9144, (val) => val / 0.9144),
    new Unit(["ly"], ["light-year", "light-years", "lightyear", "lightyears"], (val) => val * 9460730472580800, (val) => val / 9460730472580800),
    new Unit(["ft"], ["foot", "feet"], (val) => val * 0.3048, (val) => val / 0.3048),
    new Unit(["mi, mi."], ["mile", "miles"], (val) => val * 1609.344, (val) => val / 1609.344),
);

export default length;