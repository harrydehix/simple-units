import ParseError from "../errors/ParseError";
import Unit from "../Unit";
import ConverterGenerator, { Prefix } from "../utils/FromPreToPre";
import DefaultUnitGroups from "./groups/DefaultUnitGroups";
import UnitCollection from "./UnitCollection";

const meterPerSecondToBeaufort = (val: number) => {
    if (val < 0.5) return 0;
    if (val <= 1.5) return 1;
    if (val <= 3.3) return 2;
    if (val <= 5.5) return 3;
    if (val <= 7.9) return 4;
    if (val <= 10.7) return 5;
    if (val <= 13.8) return 6;
    if (val <= 17.1) return 7;
    if (val <= 20.7) return 8;
    if (val <= 24.4) return 9;
    if (val <= 28.4) return 10;
    if (val <= 32.6) return 11;
    return 12;
}

const beaufortToMeterPerSecond = (val: number) => {
    if (val === 0) return 0.25;
    if (val === 1) return 1;
    if (val === 2) return 2.45;
    if (val === 3) return 4.45;
    if (val === 4) return 6.7;
    if (val === 5) return 9.35;
    if (val === 6) return 12.3;
    if (val === 7) return 15.5;
    if (val === 8) return 18.95;
    if (val === 9) return 22.6;
    if (val === 10) return 26.45;
    if (val === 11) return 30.55;
    if (val === 12) return 32.7;
    throw new ParseError("Beaufort scale only support integers between 0 and 12.");
}

export class DefaultUnitCollection<G extends DefaultUnitGroups> extends UnitCollection<G> {
    // TEMPERATURE
    Celsius = new Unit<this>("°C", [
        { to: "°F", convert: (val) => val * 1.8 + 32 },
        { to: "K", convert: (val) => val + 273.15 },
        { to: "°R", convert: (val) => val * 9 / 5 + 491.67 }
    ], this, this.Groups.Temperature);

    Fahrenheit = new Unit<this>("°F", [
        { to: "°C", convert: (val) => (val - 32) / 1.8 },
        { to: "K", convert: (val) => (val - 32) * 5 / 9 + 273.15 },
        { to: "°R", convert: (val) => val + 459.67 }
    ], this, this.Groups.Temperature);

    Kelvin = new Unit<this>("K", [
        { to: "°C", convert: (val) => val - 273.15 },
        { to: "°F", convert: (val) => (val - 273.15) * 9 / 5 + 32 },
        { to: "°R", convert: (val) => val * 1.8 }
    ], this, this.Groups.Temperature);

    Rankine = new Unit<this>("°R", [
        { to: "°C", convert: (val) => (val - 491.67) * 5 / 9 },
        { to: "°F", convert: (val) => val - 459.67 },
        { to: "K", convert: (val) => val * 5 / 9 }
    ], this, this.Groups.Temperature)

    // LENGTH
    Lightyear = new Unit<this>(["ly", "light-year", "lightyear"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 9.461e+15),
        { to: "yd", convert: (val) => val * 1.035e+16 },
        { to: "ft", convert: (val) => val * 3.104e+16 },
        { to: "mi", convert: (val) => val * 5.879e+12 },
        { to: "in", convert: (val) => val * 3.725e+17 },
    ], this, this.Groups.Length);


    Inch = new Unit<this>(["in", "″", "inch"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 0.0254),
        { to: "yd", convert: (val) => val / 36 },
        { to: "ft", convert: (val) => val / 12 },
        { to: "mi", convert: (val) => val / 63360 },
        { to: "ly", convert: (val) => val / 3.725e+17 },
    ], this, this.Groups.Length);

    Yard = new Unit<this>(["yd", "yard"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 0.9144),
        { to: "in", convert: (val) => val * 36 },
        { to: "ft", convert: (val) => val * 3 },
        { to: "mi", convert: (val) => val / 1760 },
        { to: "ly", convert: (val) => val / 1.035e+16 },
    ], this, this.Groups.Length);

    Foot = new Unit<this>(["ft", "foot", "feet"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 0.3048),
        { to: "yd", convert: (val) => val / 3 },
        { to: "in", convert: (val) => val * 12 },
        { to: "mi", convert: (val) => val / 5280 },
        { to: "ly", convert: (val) => val / 3.104e+16 },
    ], this, this.Groups.Length);

    Mile = new Unit<this>(["mi", "mi.", "mile", "miles"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 1609.344),
        { to: "yd", convert: (val) => val * 1760 },
        { to: "in", convert: (val) => val * 63360 },
        { to: "ft", convert: (val) => val * 5280 },
        { to: "ly", convert: (val) => val / 5.879e+12 },
    ], this, this.Groups.Length);

    Yottameter = new Unit<this>(["Ym", "yottameter", "yottameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.Y, "m"),
        { to: "mi", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Zettameter = new Unit<this>(["Zm", "zettameter", "zettameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.Z, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Exameter = new Unit<this>(["Em", "exameter", "exameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.E, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Petameter = new Unit<this>(["Pm", "petameter", "petameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.P, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Terameter = new Unit<this>(["Tm", "terameter", "terameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.T, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Gigameter = new Unit<this>(["Gm", "gigameter", "gigameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.G, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Megameter = new Unit<this>(["Mm", "megameter", "megameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.M, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Kilometer = new Unit<this>(["km", "kilometer", "kilometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.k, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Hectometer = new Unit<this>(["hm", "hectometer", "hectometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.k, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Decameter = new Unit<this>(["dam", "decameter", "decameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.da, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Meter = new Unit<this>(["m", "meter", "meters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.none, "m"),
        { to: "mile", convert: (val) => val / 1609.344 },
        { to: "ft", convert: (val) => val / 0.3048 },
        { to: "in", convert: (val) => val / 0.0254 },
        { to: "yd", convert: (val) => val / 0.9144 },
        { to: "ly", convert: (val) => val / 9.461e+15 },
    ], this, this.Groups.Length);

    Decimeter = new Unit<this>(["dm", "decimeter", "decimeters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.d, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Centimeter = new Unit<this>(["cm", "centimeter", "centimeters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.c, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Millimeter = new Unit<this>(["mm", "millimeter", "millimeters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.m, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Micrometer = new Unit<this>(["μm", "micrometer", "micrometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.μ, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Nanometer = new Unit<this>(["nm", "nanometer", "nanometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.n, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Picometer = new Unit<this>(["pm", "picometer", "picometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.p, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Femtometer = new Unit<this>(["fm", "femtometer", "femtometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.f, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Attometer = new Unit<this>(["am", "attometer", "attometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.a, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Zeptometer = new Unit<this>(["zm", "zeptometer", "zeptometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.z, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    Yoctometer = new Unit<this>(["ym", "yoctometer", "yoctometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.y, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 0.9144) },
        { to: "ly", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 9.461e+15) },
    ], this, this.Groups.Length);

    // SPEED
    KilometerPerSecond = new Unit<this>(["km/s", "kilometer per second", "kilometer/second"], [
        { to: "m/s", convert: (val) => val * 1000 },
        { to: "ft/s", convert: (val) => val * 3280.83989501 },
        { to: "km/h", convert: (val) => val * 3600 },
        { to: "mph", convert: (val) => val * 2236.936292054 },
        { to: "kt", convert: (val) => val * 1943.844492441 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val * 1000) },
        { to: "Ma", convert: (val) => val / 0.3432 },
        { to: "c", convert: (val) => val / 299_792.458 }
    ], this, this.Groups.Speed);

    MeterPerSecond = new Unit<this>(["m/s", "meter per second", "meter/second"], [
        { to: "km/s", convert: (val) => val / 1000 },
        { to: "ft/s", convert: (val) => val * 3.280839895013123 },
        { to: "Bft", convert: meterPerSecondToBeaufort },
        { to: "km/h", convert: (val) => val * 3.6 },
        { to: "mph", convert: (val) => val * 2.2369362920544025 },
        { to: "kt", convert: (val) => val * 1.9438444924406046 },
        { to: "Ma", convert: (val) => val / 343 },
        { to: "c", convert: (val) => val / 299_792_458 }
    ], this, this.Groups.Speed);

    FeetPerSecond = new Unit<this>(["ft/s", "fps", "foot per second", "feet per second", "foot/second", "feet/second"], [
        { to: "km/s", convert: (val) => val / 3280.83989501 },
        { to: "m/s", convert: (val) => val / 3.280839895013123 },
        { to: "km/h", convert: (val) => val / 0.9113444152814232 },
        { to: "mph", convert: (val) => val * 0.68181818181818 },
        { to: "kt", convert: (val) => val * 0.5924838012959 },
        { to: "Ma", convert: (val) => val / 1125.33 },
        { to: "c", convert: (val) => val / 983571056.4304148 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val / 3.280839895013123) }
    ], this, this.Groups.Speed);

    KilometerPerHour = new Unit<this>(["km/h", "kmh", "kilometer per hour", "kilometer/hour"], [
        { to: "km/s", convert: (val) => val / 3600 },
        { to: "ft/s", convert: (val) => val * 0.9113444152814232 },
        { to: "m/s", convert: (val) => val / 3.6 },
        { to: "mph", convert: (val) => val * 0.6213711922373341 },
        { to: "kt", convert: (val) => val * 0.5399568034557235 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val / 3.6) },
        { to: "Ma", convert: (val) => val / 1225.044 },
        { to: "c", convert: (val) => val / 1079252848.8 },
    ], this, this.Groups.Speed);

    MilesPerHour = new Unit<this>(["mph", "mi/h", "mile per hour", "miles per hour", "mile/hour", "miles/hour"], [
        { to: "km/s", convert: (val) => val / 2236.936292054 },
        { to: "ft/s", convert: (val) => val / 0.68181818181818 },
        { to: "m/s", convert: (val) => val / 2.2369362920544025 },
        { to: "km/h", convert: (val) => val / 0.6213711922373341 },
        { to: "kt", convert: (val) => val * 0.8689762419006478 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val / 2.2369362920544025) },
        { to: "Ma", convert: (val) => val / 761.2070508231927 },
        { to: "c", convert: (val) => val / 670616629.38 }
    ], this, this.Groups.Speed);

    Knot = new Unit<this>(["kt", "kn", "knot", "knots"], [
        { to: "km/s", convert: (val) => val / 1943.844492441 },
        { to: "ft/s", convert: (val) => val / 0.5924838012959 },
        { to: "m/s", convert: (val) => val / 1.9438444924406046 },
        { to: "km/h", convert: (val) => val / 0.5399568034557235 },
        { to: "mph", convert: (val) => val / 0.8689762419006478 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val / 1.9438444924406046) },
        { to: "Ma", convert: (val) => val / 661.4708423326134 },
        { to: "c", convert: (val) => val / 582749918.3585312 },
    ], this, this.Groups.Speed);

    Beaufort = new Unit<this>(["Bft", "Beaufort"], [
        { to: "m/s", convert: beaufortToMeterPerSecond },
        { to: "km/s", convert: (val) => beaufortToMeterPerSecond(val) / 1000 },
        { to: "ft/s", convert: (val) => beaufortToMeterPerSecond(val) * 3.280839895013123 },
        { to: "mph", convert: (val) => beaufortToMeterPerSecond(val) * 2.2369362920544025 },
        { to: "km/h", convert: (val) => beaufortToMeterPerSecond(val) * 3.6 },
        { to: "kt", convert: (val) => beaufortToMeterPerSecond(val) * 1.9438444924406046 },
        { to: "Ma", convert: (val) => beaufortToMeterPerSecond(val) / 343 },
        { to: "c", convert: (val) => beaufortToMeterPerSecond(val) / 299_792_458 },
    ], this, this.Groups.Speed);

    /**
     * _Mach_ is a length units. `1Ma` is defined as the length of the path
     * sound travels in one second (343.2m).
     */
    Mach = new Unit<this>(["Ma", "M", "mach", "Mach"], [
        { to: "m/s", convert: (val) => val * 343 },
        { to: "km/s", convert: (val) => val * 0.343 },
        { to: "ft/s", convert: (val) => val * 1125.33 },
        { to: "km/h", convert: (val) => val * 1225.044 },
        { to: "mph", convert: (val) => val * 761.2070508231927 },
        { to: "kt", convert: (val) => val * 661.4708423326134 },
        { to: "c", convert: (val) => val / 880991.0899526875 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val * 343) },
    ], this, this.Groups.Speed);

    /**
     * The _speed of light_ is a length unit.
     * `1.0c` is defined as the length of the path light travels in one second in vacuum (299 792 458 metres).
     */
    SpeedOfLight = new Unit<this>(["c", "speed of light"], [
        { to: "km/s", convert: (val) => val * 299_792.458 },
        { to: "ft/s", convert: (val) => val * 983_571_056.4304148 },
        { to: "m/s", convert: (val) => val * 299_792_458 },
        { to: "km/h", convert: (val) => val * 1_079_252_848.8 },
        { to: "mph", convert: (val) => val * 670_616_629.38 },
        { to: "kt", convert: (val) => val * 582_749_918.3585312 },
        { to: "Ma", convert: (val) => val * 880_991.0899526875 },
        { to: "Bft", convert: (val) => meterPerSecondToBeaufort(val * 299_792_458) },
    ], this, this.Groups.Speed);
}

export default new DefaultUnitCollection(new DefaultUnitGroups());