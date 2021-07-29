# unitjs
 ![GitHub milestones](https://img.shields.io/github/milestones/all/harrydehix/unitjs) ![GitHub last commit](https://img.shields.io/github/last-commit/harrydehix/unitjs)<br>
expandable unit system, providing unit conversion on small and large scale

# Roadmap
- `Unit<C extends UnitCollection<any>>` ✅
  - Units are the base of this library. A unit is an instance of the `Unit` class. It holds so called `converters`, which "tell" unitjs how
    convert values to other units. Units are always part of a `UnitCollection`. Additionally it is recommended to bound a unit to a `UnitGroup` to support preferenced-based
    conversion on large data sets (see below). Units that are part of the same unit group should be convertible bidirectionally. 
    ```typescript
    ...
    
    Fahrnheit = new Unit("°F", [
      { to: "°C", convert: (val) => val * 1.8 + 32 }, // a 'to-converter'
      { from: "°C", convert: (val) => (val - 32) / 1.8 }, // a 'from-converter'
      ...
    ], this.Groups.Temperature);
    
    Celsius = new Unit("°C", [
      // you don't have to specify converters multiple times
    ], this.Groups.Temperature);
    
    ...
    ```
- `Convertable<C extends UnitCollection<any>>` ✅
  - Convertables provide an easy way to convert single values from one unit to another. The units have to be part of the same `UnitCollection`.
    ```typescript
    import Units from "unitjs"; // the default export of unitjs is the DefaultUnitCollection
    const convertable = Units.Convertable("12m");
    convertable.to("cm");
    convertable.to("km");
    console.log(convertable);       // output: 0.012km
    console.log(convertable.value); // output: 0.012
    console.log(convertable.unit);  // output: Unit { 'km' }
    ```
- `UnitCollection<G extends UnitGroups>` ✅
  - The concept of unit collections is the core of this library. A unit collection is (suprise!) a collection of units. Moreover it offers typed `Convertables` via
    `Collection.Convertable(...)`, typed `GroupSettings` via `Collection.GroupSettings(...)` and the method `Collection.convertByGroupSettings(...)`, which is able to convert
    large data sets (object structures, arrays, ... - see below).
  - Every user can create its own `UnitCollection` by extending from the `UnitCollection` class. Added to that a `UnitGroups` class is necessary to define all available groups (see below). An additional awesome thing is, that you don't have to create a `UnitCollection` from scratch, you also can extend already existing `UnitCollections` like the `DefaultUnitCollection` (see below).
  - Most users won't need a custom `UnitCollection` they just can use the `DefaultUnitCollection`, which is the default export of _unitjs_.
    ```typescript
    import Units from "unitjs";
    
    Units.Convertable(3, Units.Metre).to("cm");
    ...
    ```
  - `DefaultUnitCollection<G extends DefaultUnitGroups>` ❌
    - A collection of all important units. The common user will not need more than this.
    - See current state in detail <a href="#detailsDefaultUnit">here</a>
- `UnitGroups` ✅
  - In combination with `GroupSettings` `UnitGroups` make it easy to convert a huge set of data without loops or sth. like that. It is recommendend to bound any unit to a group. If you want to convert a huge
    set of data which contains many `Convertables` you are able to select one unit for every unit group. Your data gets converted accordingly - with one line of code.
    ```typescript
    const players = [
        {
            x: Collection.Convertable("3m"),
            y: Collection.Convertable("12cm"),
            temperature: Collection.Convertable(37, Collection.Celsius),
            name: "player001",
        },
        {
            x: Collection.Convertable("1.01dm"),
            y: Collection.Convertable("12cm"),
            name: "player003",
        },
    ]
    const settings = Collection.GroupSettings({
        [Collection.Groups.Temperature]: Collection.Fahrenheit,
        [Collection.Groups.Length]: Collection.Metre,
    });

    const convertedData = Collection.convertByGroup(players, settings);

    console.log(convertedData);
    ```
    output:
    ```typescript
    [
        {
            x: 3m,
            y: 0.12m,
            temperature: 98.60000000000001°F,
            name: 'player001'
        },
        { x: 0.101m, y: 0.12m, name: 'player003' }
    ]
    
    ```
- `GroupSettings<C extends UnitCollection<any>>` ✅
  - In combination with `UnitGroups` `GroupSettings` make it easy to convert a huge set of data without loops or sth. like that. It is recommendend to bound any unit to a group. If you want to convert a huge
    set of data which contains many `Convertable`s you are able to select one unit for every unit group (using a `GroupSettings` instance). Your data gets converted accordingly - with one line of code.

### DefaultUnitCollection - Current State
<div id="detailsDefaultUnit"></div>
<details>
  <summary>Length ✅</summary>
  
  * ✅ Ym
  * ✅ Zm
  * ✅ Em
  * ✅ Pm
  * ✅ Tm
  * ✅ Gm
  * ✅ Mm
  * ✅ hm
  * ✅ dam
  * ✅ m
  * ✅ dm
  * ✅ cm
  * ✅ mm
  * ✅ μm
  * ✅ nm
  * ✅ pm
  * ✅ fm
  * ✅ am
  * ✅ zm
  * ✅ ym
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
  <summary>Speed ❌</summary>

  * ✅ km/s
  * ✅ m/s
  * ✅ ft/s
  * ✅ km/h
  * ✅ mi/h
  * ❌ knot
  * ❌ beaufort scale (from 0 to 12)
  * ❌ mach number (divided to the speed of sound)
  * ❌ c (divided to the speed of light)
</details>
<details>
  <summary>Area ❌</summary>
</details>
<details>
  <summary>Mass ❌</summary>
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
