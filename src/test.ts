import units from "./units/units";
import * as sourceMapping from 'source-map-support';
sourceMapping.install();

console.log(units.from(2, "km/h").as("mph").format({ length: "long", divider: " " }));