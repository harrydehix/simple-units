# Converting

The key concept behind converting in _simple-units_ is the `Convertible`.
_A convertible is a javascript object combining a number with a unit._ The convertible's unit and value are mutable. 
Simplified, a convertible looks like this:
```javascript
{
    unit: Unit, // the convertible's current unit
    value: number, // the convertible's current value
}
```
## Creating A Convertible

To create a convertible you have to call `units.from(value: number, unit: string)` or `units.Convertible(value: number, unit: string)`. Both methods do exactly the same. One can use them interchangegebly.

**Example:**
```typescript
import units from "simple-units";

const convertible = units.Convertible(12, "m");
console.log(convertible.value); // Output: 12
console.log(convertible.unit.toString()); // Output: m
```

## Converting Convertibles

There are several methods to convert a convertible. In the following section I will briefly explain them.

### `.to(unit: string): number`
Converts the convertible to the passed unit and returns its property `value`.

**Example**:
```typescript
const convertible = units.Convertible(12, "°C");

console.log(convertible.value); 
// Output: 12

console.log(convertible.unit.toString()); 
// Output: °C

console.log(convertible.to("K")); 
// Output: 261.15

console.log(convertible.value);
// Output: 261.15

console.log(convertible.unit.toString());
// Output: K
```
### `.as(unit: string): this`
Converts the convertible to the passed unit and returns the convertible itself.
**Example**:
```typescript
const convertible = units.from(12, "°C").as("K");

console.log(convertible.value); 
// Output: 261.15

console.log(convertible.unit.toString()); 
// Output: K
```
### `.asBest(crossSystem = false): this`
Converts the convertible to the best possible unit. In this case the best means having as few digits as possible before the decimal point. Returns the convertible itself.
**Example**:
```typescript
const convertible = units.Convertible(1000, "m").asBest();

console.log(convertible.value);
// Output: 1

console.log(convertible.unit.toString()); 
// Output: km
```
By default the convertible remains in the same unit system. If `true` is passed, this behaviour is disabled.

## Formatting Convertibles

Convertibles can be output as strings very easily. Depending on the specific demands, there are different methods for this.

### `.toString(): string`
Returns the convertible as short string.
**Example**:
```typescript
const convertible = units.Convertible(1000, "meter");

console.log(convertible.toString()); 
// Output: 1000m

console.log(convertible);
// Output: 1000m (but in blue ;D)
```

### `.format(format: string, formatOptions?: FormatOptions): string`
Returns the convertible as formatted string. The first argument specifies the string's format (see example), the second one additional format options. Currently there is only the format option `length`. Setting this to `"long"` will result in a long unit symbol (e.g. "meter" or "meters"), `"short"` will result in a short unit symbol (e.g. "m").
**Example**:
```typescript
const convertible = units.Convertible(12.2323123, "kt");

console.log(convertible.format("%.2f %s", { length: "long" })); 
// Output: 12.23 knots
```

## Other Methods

### `.possibilities(): string[]`
Returns an array of units to which the convertible can be converted.

```typescript
const convertible = units.Convertible(12, "kt");

console.log(convertible.possibilities()); 
/*
    Output:
    [
    'Ym/a',    'Zm/a',   'Em/a',   'Pm/a',   'Tm/a',   'Gm/a',
    'Mm/a',    'km/a',   'hm/a',   'dam/a',  'dm/a',   'cm/a',
    'mm/a',    'μm/a',   'nm/a',   'pm/a',   'fm/a',   'am/a',
    'zm/a',    'ym/a',   'm/a',    'Ym/mth', 'Zm/mth', 'Em/mth',
    'Pm/mth',  'Tm/mth', 'Gm/mth', 'Mm/mth', 'km/mth', 'hm/mth',
    'dam/mth', 'dm/mth', 'cm/mth', 'mm/mth', 'μm/mth', 'nm/mth',
    'pm/mth',  'fm/mth', 'am/mth', 'zm/mth', 'ym/mth', 'm/mth',
    'Ym/wk',   'Zm/wk',  'Em/wk',  'Pm/wk',  'Tm/wk',  'Gm/wk',
    'Mm/wk',   'km/wk',  'hm/wk',  'dam/wk', 'dm/wk',  'cm/wk',
    'mm/wk',   'μm/wk',  'nm/wk',  'pm/wk',  'fm/wk',  'am/wk',
    'zm/wk',   'ym/wk',  'm/wk',   'Ym/d',   'Zm/d',   'Em/d',
    'Pm/d',    'Tm/d',   'Gm/d',   'Mm/d',   'km/d',   'hm/d',
    'dam/d',   'dm/d',   'cm/d',   'mm/d',   'μm/d',   'nm/d',
    'pm/d',    'fm/d',   'am/d',   'zm/d',   'ym/d',   'm/d',
    'Ym/h',    'Zm/h',   'Em/h',   'Pm/h',   'Tm/h',   'Gm/h',
    'Mm/h',    'km/h',   'hm/h',   'dam/h',  'dm/h',   'cm/h',
    'mm/h',    'μm/h',   'nm/h',   'pm/h',
    ... 295 more items
    ]
*/
```