Creating custom unit groups with custom units in _simple-units_ is _not difficult_.

# Steps

1. [Creating the group](#1-creating-the-group)
2. [Creating the units](#2-creating-the-units)
3. [Adding the units to the group](#3-adding-the-units-to-the-group)
4. [Adding the group to an existing collection](#4-adding-the-group-to-an-existing-collection)

## 1. Creating the group

First create a file called `<groupname>.ts` (or `<groupname>.js` depending on your used language). Replace `<groupname>` with your desired group name. E.g. create the file `currencies.ts` or `currencies.js` if you want to create a group holding currencies. Note that your group name has to be unique! Otherwise you are going to overwrite an existing unit group.

In this guide I will always use _currencies_ as group name from now on. _Remember to use your desired group name instead._

To create a new unit group write the following:

```ts
import { Group } from "simple-units.js";

const currencies = new Group("currencies");
```

Depending on your selected module system you might use another import syntax. For example:

```js
const { Group } = require("simple-units");

const currencies = new Group("currencies");
```

Both ways we create the group called "currencies". It is still empty as we haven't added any units yet.

## 2. Creating the units

Before we can fill up our group with units we have to create them.

First we need to import the `Unit` class.

```ts
import { Group, Unit } from "simple-units.js";
```

Then we create our desired units. I start with the us-dollar.

```ts
const usDollar = new Unit(
    // the unit's format
    {
        short: ["US$, $, USD"],
        long: {
            sg: ["US dollar, dollar"],
            pl: ["US dollars, dollars"],
        },
    },
    // the unit's ratio to the base unit
    1,
    // the unit's shift to the base unit
    0,
    // the unit's system
    "metric"
);
```

What?! What happened here? No worries, I'll explain it in detail:

In general we have to pass **four arguments** to the constructor.

1. **The unit's format**
2. **The unit's ratio to the base unit**
3. **The unit's shift to the base unit**
4. **The unit's system**

### The unit's format

The _unit's format_ describes how the unit "looks". It tells the _simple-units_ parser when to recognize a string as the specified unit. It must have the following shape:

```ts
{
    // the unit's short forms
    short: string[],
    // the unit's long forms...
    long: {
        // ...divided in singular forms
        sg: string[],
         // ...and plural forms
        pl: string[]
    }
}
```

In `short` we specify the unit's short forms. E.g. I specify `US$`, `$` and `USD` for the US dollar.

In `long` we specify the unit's long forms. But as you see `long` is not an array, it's an object! That is the case because we have to distinguish between singular and plural long forms.

In `sg` we specify the unit's long singular forms. E.g. `US dollar` and `dollar`.

In `pl` we specify the unit's long plural forms. E.g. `US dollars` and `dollars`.

### The unit's ratio & shift to the base unit

To understand what "the unit's ratio & shift to the base unit" means, you need to understand the concept of base units.

Every unit group has to have one single **base unit**. All other units of the group are defined in relation to this special unit.
In this way, the library can figure out any conversion between any units of one group.

In my example I chose the US dollar as base unit. That's why I set the ratio to `1` (`1US$ = 1US$`) and the shift to `0`.

If I had the euro as base unit, I would have set the ratio to `0.8671` because (at the moment) `1 US$ = 0.8671€`. As there is no shift between the units, the shift would stay `0`.

### The unit's system

Every unit is part of a unit system. E.g. _celsius_ is part of the _metric_ system, _fahrenheit_ is part of the _imperial_ system. If you don't know your unit's system just make something up or leave it empty. It's not that important.

### And that's it!

That's how you create units in _simple-units_. For reference, this is how the definition of the unit euro would look like:

```ts
const euro = new Unit(
    {
        short: ["€"],
        long: {
            sg: ["euro"],
            pl: ["euros"],
        }
    },
    1.1532 // 1€ = 1.1532US$
    0,
    "metric"
);
```

## 3. Adding the units to the group

After we have created our units we have to add them to our group. This is done using the group's powerful editor.

Write the following:

```typescript
currencies.Editor.add(usDollar, euro);
```

## 4. Adding the group to an existing collection

Finally we have to add the group to an existing collection. It's a good practice to export the group first...

```typescript
export default currencies;
```

... then create a file called `units.ts` or `units.js` and write the following:

```typescript
import units from "simple-units.js";
import currencies from "./currencies.js";

units.Editor.add(currencies);

export default units;
```

Similar to adding our custom units to our group we've added our custom group to _simple-unit's_ default unit collection.
After that we've exported the edited collection.

Now we are able to use our new group anywhere in our project.
To test this, create a test file, e.g. `test.ts` or `test.js` and write the following:

```typescript
import units from "./units.js";

console.log(units.from("€").to("$"));
```

Note that you have to import your edited unit collection and not simple-units default one!

### You want more information?

You are currently reading a quick guide, but not the official documentation. Some things have been simplified here. E.g. there are more powerful but complex ways to create units (see FlexibleUnit). Feel free to explore the [official documentation](https://harrydehix.github.io/simple-units/)!
