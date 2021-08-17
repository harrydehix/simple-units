import testFunction from "./testFunction"

export default (fn1: (...any: any[]) => any, fn2: (...any: any[]) => any) => {
    const avg1 = testFunction(fn1);
    const avg2 = testFunction(fn2);
    if (avg1 > avg2) {
        const percentageFaster = Math.round((avg1 / avg2 - 1) * 100);
        console.log(`${fn2.name} is ~${percentageFaster}% faster than ${fn1.name}!`);
    } else {
        const percentageFaster = Math.round((avg2 / avg1 - 1) * 100);
        console.log(`${fn1.name} is ~${percentageFaster}% faster than ${fn2.name}!`);
    }
}