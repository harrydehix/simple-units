import testFunction from "./testFunction"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import wunderbar from "@gribnoysup/wunderbar";
import units from "../units/units";

export default (...fns: ((...any: any[]) => any)[]) => {
    // Measure the function's average time per call
    const avgs = [];
    for (const fn of fns) {
        const time = units.from(testFunction(fn), "s");
        avgs.push(time);
    }
    let min = avgs[0];
    for (const avg of avgs) {
        if (avg.compare(min) === -1) min = avg;
    }
    min.asBest();
    const avgValues = [];
    for (const avg of avgs) {
        avgValues.push(avg.as(min.unit).value);
    }

    for (let i = 0; i < fns.length; i++) {
        console.log(`'${fns[i].name}' took ${avgs[i]} per call.`);
    }

    printGraph(...avgValues);

    const cps = [];
    for (let i = 0; i < fns.length; i++) {
        avgs[i].as("s");
        cps.push(Math.round(1 / avgs[i].value));
        console.log(`That are ${cps[i]} calls per second for '${fns[i].name}'`);
    }
    printGraph(...cps);
}

function printGraph(...data: number[]) {
    const { chart, scale } = wunderbar(data, {
        min: 0,
        length: 50,
    });
    console.log();
    console.log(chart);
    console.log();
    console.log(scale);
    console.log();
}