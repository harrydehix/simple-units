import units from "./units/units";
import * as sourceMapping from 'source-map-support';
sourceMapping.install();

console.log(units.Convertable(12, "m").as("year"));