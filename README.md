# unitjs
expandable unit system, providing unit conversion on small and large scale

# Roadmap
- Convertables ✅
  - Convertables provide the easiest way to convert single values
    ```typescript
    const convertable = Units.Convertable("12m");
    convertable.to("cm");
    convertable.to("km");
    console.log(convertable); // output: 0.012km
    ```
- Units ✅
  - Units are the base of this library. A unit is an instance of the `Unit` class. It is always part of a `UnitGroup` and holds so called `converters`, which "tell" unitjs how
    convert values to other units.
    ```typescript
    const myUnit = new Unit("°F", [
      { to: "°C", convert: (val) => val * 1.8 + 32 },
      ...
    ], myUnitGroup);
    ```
- UnitCollections ✅
  - Unit Collections like the `DefaultUnitCollection` are the core entry point to any feature this library provides. They are also the key to the library's expandability and 
    flexibility. You can extend the `UnitCollection` class to define your own set of units or extend the `DefaultUnitCollection` class to add your own set of units to the default ones.
  - DefaultUnitCollection ❌
    - A collection of all important units. The common user will not need more than this.
- UnitGroups ✅
  - In combination with `UnitPreferences` `UnitGroups` make it easy to convert a huge set of data without loops or sth. like that. Every unit is part of a unit group (e.g. `Length`, `Temperature`, ...). If you want to convert a huge
    set of data which contains many `Convertable`s you are able to select one unit for every unit group. Your data gets converted accordingly - with one line of code.
- UnitPreferences ✅
  - In combination with `UnitGroups` `UnitPreferences` make it easy to convert a huge set of data without loops or sth. like that. Every unit is part of a unit group (e.g. `Length`, `Temperature`, ...). If you want to convert a huge
    set of data which contains many `Convertable`s you are able to select one unit for every unit group (using a `UnitPreferences` instance). Your data gets converted accordingly - with one line of code.
