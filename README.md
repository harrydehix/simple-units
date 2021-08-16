# unitjs
 ![GitHub milestones](https://img.shields.io/github/milestones/all/harrydehix/unitjs) ![GitHub last commit](https://img.shields.io/github/last-commit/harrydehix/unitjs)<br>
expandable, flexible unit system, providing unit conversion on small and large scale

# Usage
## Importing
```javascript
const units = require("unitjs");
```
or
```typescript
import units from "unitjs";
```
## Converting
### `from-to-Syntax`
```typescript
let converted = units.from(3, "cm").to("in"); // converts value, returns number
console.log(converted); // output: 1.1811
```
### `Convertable-Syntax`
```typescript
const convertable = units.Convertable(3, "cm"); // creates convertable
convertable.as("dm"); // converts convertable
console.log(convertable.value); // Output: 0.3
console.log(convertable.to("m")); // Output: 0.03
```
## Formatting
```typescript
const convertable = units.Convertable(3, "cm"); 
console.log(convertable.format({ length: "long", divider: " "})); 
// Output: 3 centimeters
```

# Supported Units

<div id="detailsDefaultUnit"></div>
<details>
  <summary>Length ✅</summary>
  
  * ✅ m (including every SI prefix from `ym` to `Ym`, e.g. `km`, `cm`, `nm`, ...)
  * ✅ in
  * ✅ yd
  * ✅ ft
  * ✅ mi
  * ✅ ly
</details>
<details>
  <summary>Temperature ✅</summary>
  
  * ✅ °C
  * ✅ °F
  * ✅ °R
  * ✅ K
</details>
<details>
  <summary>Speed ✅</summary>

  * ✅ m/s (`m` is combinable with any SI prefix, `s` is replaceable with any valid time unit, e.g. `km/min`, `cm/ns`, `dm/a`, ...)
  * ✅ ft/s (`s` is replaceable with any valid time unit, e.g. `ft/min`, `ft/ms`, `ft/d`, ...)
  * ✅ mi/s (`s` is replaceable with any valid time unit, e.g. `mi/h`, `mi/wk`, `mi/m`, ...)
  * ✅ knot
  * ✅ beaufort scale (from 0 to 12)
  * ✅ mach number (divided to the speed of sound)
  * ✅ c (divided to the speed of light)
</details>
<details>
  <summary>Area ✅</summary>

  * ✅ m² (including every SI prefix from `ym²` to `Ym²`, e.g. `km²`, `cm²`, `nm²`, ...)
  * ✅ a (including `ca`, `da`, `daa` and `ha`)
  * ✅ in²
  * ✅ ft²
  * ✅ mi²
  * ✅ yd²
  * ✅ ac
</details>
<details>
  <summary>Mass ❌</summary>

  * ✅ g (including every SI prefix from `yg` to `Yg`, e.g. `kg`, `mg`, ...)
  * ✅ t (metric ton; including every SI prefix from `dat` to `Yt`, e.g. `Mt`, `Gt`, ...)
  * ✅ oz av 
  * ❌ lb 
</details>
<details>
  <summary>Volume ❌</summary>
</details>
<details>
  <summary>Time ❌</summary>
</details>
<details>
  <summary>Acceleration ❌</summary>
</details>
<details>
  <summary>Force ❌</summary>
</details>
<details>
  <summary>Voltage ❌</summary>
</details>
<details>
  <summary>Current ❌</summary>
</details>
<details>
  <summary>Power ❌</summary>
</details>
<details>
  <summary>Energy ❌</summary>
</details>
<details>
  <summary>Pace ❌</summary>
</details>
<details>
  <summary>Pressure ❌</summary>
</details>
<details>
  <summary>Illuminance ❌</summary>
</details>
<details>
  <summary>PartsPer ❌</summary>
</details>
<details>
  <summary>Speed ❌</summary>
</details>
<details>
  <summary>Angle ❌</summary>
</details>
<details>
  <summary>Frequency ❌</summary>
</details>
