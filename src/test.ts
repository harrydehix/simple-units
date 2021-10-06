import 'source-map-support/register'
import units from "./units/units";
import Group from "./Group";
import Unit from "./Unit";

const c1 = units.Convertible(100, "kilometer");
const c2 = units.Convertible(1000, "meter");

if (c1.lt(c2)) {
    console.log(`${c1} is less than ${c2}!`);
} else if (c1.eq(c2)) {
    console.log(`${c1} and ${c2} are equal!`);
} else {
    console.log(`${c1} is greater than ${c2}!`);
}