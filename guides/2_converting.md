The key concept behind converting in _simple-units_ is the `Convertible`.
_A convertible is a javascript object combining a number with a unit._ Its unit and value are mutable.
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
import units from "simple-units.js";

const convertible = units.Convertible(12, "m");
console.log(convertible.value); // Output: 12
console.log(convertible.unit.toString()); // Output: m
```

## Converting Convertibles

There are several methods to convert a convertible. In the following section I will briefly explain the most important of them. For more details read the {@link Convertible | convertible's documentation}.

### `.to(unit: string): number`

Converts the convertible to the passed unit and returns the conversion's result.

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

### More Methods

Remember that the Convertible offers even more methods to make converting easier. For this purpose read the [full documentation](https://harrydehix.github.io/simple-units/).

## Formatting Convertibles

Convertibles can be output as strings very easily. Depending on the specific demands, there are different methods for this. The simpler method is `Convertible.toString`, `Convertible.format` provides more features. Read the [full documentation](https://harrydehix.github.io/simple-units/) for more details.
