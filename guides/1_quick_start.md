# Steps

Follow these steps to get started with the _simple-units_ package:

1. [Install the _simple-units_ package](#1-install-the-simple-units-package)
2. [Import the library](#2-import-the-library)
3. [Perform your first unit conversion](#3-perform-your-first-unit-conversion)

## 1. Install the _simple-units_ package

Run the following command to ensure you have the _simple-units_ package installed:

```sh
npm install simple-units
```

## 2. Import the library

To use this library in your code you have to import it.
Note that the import-syntax differs depending on your selected module system.

Either write:

```typescript
const units = require("simple-units").default;
```

or:

```typescript
import units from "simple-units.js";
```

## 3. Perform your first unit conversion

To convert the value `10` from the unit meter to centimeter write the following:

```typescript
const result = units.from(10, "m").to("cm");
console.log(result);
```
