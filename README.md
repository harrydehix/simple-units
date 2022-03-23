# simple-units

![GitHub milestones](https://img.shields.io/github/milestones/all/harrydehix/simple-units) ![GitHub last commit](https://img.shields.io/github/last-commit/harrydehix/simple-units)<br>
unit converter with focus on the golden mean between simplicity, customizability and [performance](https://github.com/harrydehix/converters-performance)

# Key Features

## Converting

```typescript
const converted = units.from(3, "cm").to("in");
console.log(converted);
// Output: 1.1811
```

## Comparing

```typescript
const c1 = units.Convertible(100, "kilometer");
const c2 = units.Convertible(1000, "meter");

if (c1.lt(c2)) {
    console.log(`${c1} is less than ${c2}!`);
} else if (c1.eq(c2)) {
    console.log(`${c1} and ${c2} are equal!`);
} else {
    console.log(`${c1} is greater than ${c2}!`);
}
// Output: 100km is greater than 1000m!
```

## Formatting

```typescript
const convertible = units.Convertible(12.2323123, "kt");
console.log(convertible.format("%.2f %s", { length: "long" }));
// Output: 12.23 knots
```

## Customizing

```typescript

const myCustomUnit = new Unit(...);

units.group("length").Editor.add(myCustomUnit);
```

# Documentation

Read useful guides [here](https://github.com/harrydehix/simple-units/tree/main/guides).
Read the full documentation [here](https://harrydehix.github.io/simple-units/).

# Why simple-units?

_simple-units_ is one of the fastest unit converters ([see performance tests](https://github.com/harrydehix/converters-performance)) while being the most flexible and easiest one. It's designed to feel natural. Added to that as adding custom units to _simple-units_ is very simple, you are not dependend on the package developer (!). Last but not least it supports a huge amount of units and powerful functionality like comparing quantities of different units or formatting them nicely.

# Supported Units

## Area

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0m²</th>
			<td><code>%0m^2, %0m2, square %0meter, sq %0meter, sq %0metre, square %0metre, square %0meters, sq %0meters, sq %0metres, square %0metres</code></td>
            <td>
            <p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta)</p>
            </td>
		</tr>
		<tr>
			<th>%0a</th>
			<td><code>%0are, %0ares</code></td>
			<td>
                <p>
                <b>0:</b>
                <code>c</code>(centiare), <code>d</code>(deciare), <code>da</code>(decare), <code>h</code>(hectare)
                </p>
            </td>
		</tr>
        <tr>
			<th>in²</th>
			<td><code>″², in^2, ″^2, ″2, in2, square inch, sq inch, square inches, sq inches</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>ft²</th>
			<td><code>ft^2, ft2, square foot, sq foot, square feet, sq feet</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>mi²</th>
			<td><code>mi^2, mi2, square mile, sq mile, square miles, sq miles</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>yd²</th>
			<td><code>yd^2, yd2, square yard, sq yard, square yards, sq yards</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>ac</th>
			<td><code>acre, acres</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Current

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0A</th>
			<td><code>%0ampere, %0ampere</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p></td>
		</tr>
	</tbody>
</table>

## Digital

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0B</th>
			<td><code>%0byte, %0bytes</code></td>
			<td>
            <p>
            <b>0: </b>
            <a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>k</code>(kilo) to <code>Y</code> (yotta) and <a href="https://en.wikipedia.org/wiki/Binary_prefix">IEC-Prefixes</a> from <code>Ki</code> (kibi) to <code>Yi</code> (yobi)
            </p>
            </td>
		</tr>
		<tr>
			<th>%0b</th>
			<td><code>%0bit, %0bits</code></td>
			<td><p>
            <b>0: </b>
            <a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>k</code>(kilo) to <code>Y</code> (yotta) and <a href="https://en.wikipedia.org/wiki/Binary_prefix">IEC-Prefixes</a> from <code>Ki</code> (kibi) to <code>Yi</code> (yobi)
            </p></td>
		</tr>
	</tbody>
</table>

## Energy

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0J</th>
			<td><code>%0joule, %0joule, %0joules</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p></td>
		</tr>
		<tr>
			<th>%0W%1</th>
			<td><code>%0watt-%1, %0watt-%1</code></td>
			<td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p>
            <p><b>1: </b>h (hour, hours), s (second, seconds)</p></td>
		</tr>
		<tr>
			<th>%0eV</th>
			<td><code>%0electronvolt, %0electronvolts</code></td>
			<td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p></td>
		</tr>
		<tr>
			<th>%0cal</th>
			<td><code>%0calorie, %0calories</code></td>
			<td><p><b>0: </b>k (kilo)</p></td>
		</tr>
        <tr>
			<th>erg</th>
			<td><code>ergs</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Force

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0N</th>
			<td><code>%0newton</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p></td>
		</tr>
	</tbody>
</table>

## Length

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
            <th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0m</th>
			<td><code>%0meter, %0meters, %0metre, %0metres</code></td>
            <td>
                <p>
                <b>0: </b>
                <a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) 
                </p>
            </td>
		</tr>
		<tr>
			<th>in</th>
			<td><code>″, inch, inches</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>yd</th>
			<td><code>yard, yards</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>ly</th>
			<td><code>light-year, lightyear, light-years, lightyears</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>ft</th>
			<td><code>foot, feet</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>mi</th>
			<td><code>mi., mile, miles</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Mass

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
            <th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0g</th>
			<td><code>%0gram, %0gramme, %0grams</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p></td>
		</tr>
		<tr>
			<th>%0mt</th>
			<td><code>%0metric ton, %0metric tons</code></td>
			<td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>da</code> (deca) to <code>Y</code> (yotta) </p></td>
		</tr>
		<tr>
			<th>t</th>
			<td><code>ton, short ton, tons, short tons</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>oz</th>
			<td><code>oz av, ounce, avoirdupois ounce, ounces, avoirdupois ounces</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>lb</th>
			<td><code>lb av, pound, avoirdupois pound, pound-mass, pounds, avoirdupois pounds</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Parts-Per

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>ppm</th>
			<td><code>parts per million, part per million</code></td>
            <td>-</td>
		</tr>
		<tr>
			<th>ppb</th>
			<td><code>parts per billion, part per billion</code></td>
            <td>-</td>
		</tr>
        <tr>
			<th>ppt</th>
			<td><code>parts per trillion, part per trillion</code></td>
            <td>-</td>
		</tr>
        <tr>
			<th>ppq</th>
			<td><code>parts per quadrillion, part per quadrillion</code></td>
            <td>-</td>
		</tr>
	</tbody>
</table>

## Power

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0W</th>
			<td><code>%0watt, %0watts</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>μ</code> (micro) to <code>Y</code> (yotta) </p></td>
		</tr>
		<tr>
			<th>%0J/%1</th>
			<td><code>%0joule/%1, %0joules/%1</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>μ</code> (micro) to <code>Y</code> (yotta) </p>
            <p><b>1: </b>All time units.</p></td>
		</tr>
	</tbody>
</table>

## Pressure

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0Pa</th>
			<td><code>%0pascal, %0pascals</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>μ</code> (micro) to <code>Y</code> (yotta) </p></td>
		</tr>
		<tr>
			<th>bar</th>
			<td><code>Bar, Bars</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>torr</th>
			<td><code>Torr, Torrs</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>atm</th>
			<td><code>standard atmosphere, standard atmospheres</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>Mpsi</th>
			<td><code>megapound per square inch, megapounds per square inch</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>psi</th>
			<td><code>lb. p. sq. in., psia, psig, pound-force per square inch, pound per square inch, pounds per square inch</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>ksi</th>
			<td><code>kilopound per square inch, kilopounds per square inch</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>inHg</th>
			<td><code>inch of mercury, inches of mercury</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Speed

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0m/%1</th>
			<td><code>%0meter/%1, %0metre/%1, %0meter per %1, %0metre per %1, %0meters/%1, %0metres/%1, %0meters per %1, %0metres per %1</code></td>
            <td>
            <p>
                <b>0:</b> <a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta)
            </p>
            <p>
                <b>1:</b> Any time unit
            </p>
            </td>
		</tr>
		<tr>
			<th>ft/%0</th>
			<td><code>foot/%0, foot per %0, feet/%0, feet per %0</code></td>
			<td><p><b>0: </b>Any time unit</p></td>
		</tr>
		<tr>
			<th>mi/%0</th>
			<td><code>mp%0, mile/%0, mile per %0, miles/%0, miles per %0</code></td>
			<td><p><b>0: </b>Any time unit</p></td>
		</tr>
		<tr>
			<th>kt</th>
			<td><code>kn, knot, knots</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>Bft</th>
			<td><code>Beaufort</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>Ma</th>
			<td><code>M, mach, Mach</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>c</th>
			<td><code>lightspeed, light-speed</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Temperature

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>°C</th>
			<td><code>degree Celsius, degrees Celsius</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>°F</th>
			<td><code>degree Fahrenheit, degrees Fahrenheit</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>°R</th>
			<td><code>degree Rankine, degrees Rankine</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>K</th>
			<td><code>Kelvin</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Time

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0s</th>
			<td><code>%0second, %0seconds</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>d</code> (deci) </p></td>
		</tr>
		<tr>
			<th>min</th>
			<td><code>minute, minutes</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>h</th>
			<td><code>hour, hours</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>d</th>
			<td><code>day, days</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>wk</th>
			<td><code>week, weeks</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>mth</th>
			<td><code>month, months</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>a</th>
			<td><code>year, years</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>

## Voltage

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0V</th>
			<td><code>%0volt, %0volts</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>Y</code> (yotta) </p></td>
		</tr>
	</tbody>
</table>

## Volume

<table>
	<thead>
		<tr>
			<th>unit</th>
			<th>synonyms</th>
			<th>%</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<th>%0m³</th>
			<td><code>%0m^3, %0m3, cubic %0meter, cubic %0meters, cubic %0metre, cubic %0metres</code></td>
            <td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>y</code> (yocto) to <code>d</code> (deci) </p></td>
		</tr>
		<tr>
			<th>%0l</th>
			<td><code>%0liter, %0liters, %0litre, %0litres</code></td>
			<td><p><b>0: </b><a href="https://en.wikipedia.org/wiki/Metric_prefix#List_of_SI_prefixes">SI-Prefixes</a> from <code>m</code> (milli) to <code>k</code> (kilo) </p></td>
		</tr>
		<tr>
			<th>in³</th>
			<td><code>″³, in^3, ″^3, ″3, in3, cubic inch, cubic inches</code></td>
			<td>-</td>
		</tr>
		<tr>
			<th>ft³</th>
			<td><code>ft^3, ft3, cubic foot, cubic feet</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>yd³</th>
			<td><code>yd^3, yd3, cubic yard, cubic yards</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>c</th>
			<td><code>cup, cups</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>tsp</th>
			<td><code>teaspoon, teaspoons</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>tbsp</th>
			<td><code>tablespoon, tablespoons</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>fl oz</th>
			<td><code>fl-oz, fluid ounce, fluid ounces</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>qt</th>
			<td><code>quart, quarts</code></td>
			<td>-</td>
		</tr>
        <tr>
			<th>gal</th>
			<td><code>gallon, gallons</code></td>
			<td>-</td>
		</tr>
	</tbody>
</table>
