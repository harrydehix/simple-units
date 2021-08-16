import units from "./units/units";
import * as sourceMapping from 'source-map-support';
sourceMapping.install();

console.log(units.Convertable(1, "km/h").as("mi/h").format({ length: "short", divider: "" }));