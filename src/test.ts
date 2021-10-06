import 'source-map-support/register';
import units from './units/units';


console.log(units.from(3000, "m/s").as("km/h"));