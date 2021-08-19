import testFunction from "./testFunction"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import wunderbar from "@gribnoysup/wunderbar";
import units from "../old/units/units";

export default (fn1: (...any: any[]) => any, fn2: (...any: any[]) => any) => {
    const avg1 = units.from(testFunction(fn1), "s");
    const avg2 = units.from(testFunction(fn2), "s");
    if (avg2.value < avg1.value) {
        avg1.asBest();
        avg2.as(avg1.unit.identifier);
    } else {
        avg2.asBest();
        avg1.as(avg2.unit.identifier);
    }

    console.log(`'${fn1.name}' took ${avg1} per call.`);
    console.log(`'${fn2.name}' took ${avg2} per call.`);
    if (avg1 > avg2) {
        const percentageFaster = Math.round((avg1.value / avg2.value - 1) * 100);
        console.log(`'${fn2.name}' is ~${percentageFaster}% faster than '${fn1.name}'!`);
    } else {
        const percentageFaster = Math.round((avg2.value / avg1.value - 1) * 100);
        console.log(`'${fn1.name}' is ~${percentageFaster}% faster than '${fn2.name}'!`);
    }

    const printData = () => {
        const { chart, legend, scale, __raw } = wunderbar([avg1.value, avg2.value], {
            min: 0,
            length: 50,
        });
        console.log();
        console.log(chart);
        console.log();
        console.log(scale);
        console.log();
    };
    printData();
}