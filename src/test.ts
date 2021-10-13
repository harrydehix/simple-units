import 'source-map-support/register';
import { Group } from '.';
import units from './units/units';
import siPrefixes from './units/variables/siPrefixes';


console.log(units);

console.log(units.from(12, "°C").to("°F"));

console.log(units.from(12, "°C").as("°F"));

const myCustomUnits = new Group("custom-group");

units.Editor.add()