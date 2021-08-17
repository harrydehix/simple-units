import units from "./units/units";
import * as sourceMapping from 'source-map-support';
import testFunction from "../performance/testFunction";
sourceMapping.install();

units.disablePerformanceMode();
function convert() {
    units.from(12, "cm").to("in");
}

console.log(testFunction(convert, 1000000));