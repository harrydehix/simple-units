import compareFunctions from "../performance/compareFunctions";

function convert(val: number) {
    return val * 1000;
}


compareFunctions(() => {
    convert(1);
});