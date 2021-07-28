import Unit from "../Unit";
import ConverterGenerator, { Prefix } from "../utils/FromPreToPre";
import DefaultUnitGroups from "./groups/DefaultUnitGroups";
import UnitCollection from "./UnitCollection";

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
    Inch = new Unit<this>(["in", "″", "inch"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 0.0254),
        { to: "yd", convert: (val) => val / 36 },
        { to: "ft", convert: (val) => val / 12 },
        { to: "mi", convert: (val) => val / 63360 },
    ], this, this.Groups.Length);

    Yard = new Unit<this>(["yd", "yard"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 0.9144),
        { to: "in", convert: (val) => val * 36 },
        { to: "ft", convert: (val) => val * 3 },
        { to: "mi", convert: (val) => val / 1760 },
    ], this, this.Groups.Length);

    Foot = new Unit<this>(["ft", "foot", "feet"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 0.3048),
        { to: "yd", convert: (val) => val / 3 },
        { to: "in", convert: (val) => val * 12 },
        { to: "mi", convert: (val) => val / 5280 },
    ], this, this.Groups.Length);

    Mile = new Unit<this>(["mi", "mi.", "mile", "miles"], [
        ...ConverterGenerator.fromOtherToAllPre("m", (val) => val * 1609.344),
        { to: "yd", convert: (val) => val * 1760 },
        { to: "in", convert: (val) => val * 63360 },
        { to: "ft", convert: (val) => val * 5280 },
    ], this, this.Groups.Length);

    Yottameter = new Unit<this>(["Ym", "yottameter", "yottameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.Y, "m"),
        { to: "mi", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.Y, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Zettameter = new Unit<this>(["Zm", "zettameter", "zettameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.Z, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.Z, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Exameter = new Unit<this>(["Em", "exameter", "exameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.E, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.E, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Petameter = new Unit<this>(["Pm", "petameter", "petameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.P, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.P, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Terameter = new Unit<this>(["Tm", "terameter", "terameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.T, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.T, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Gigameter = new Unit<this>(["Gm", "gigameter", "gigameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.G, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.G, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Megameter = new Unit<this>(["Mm", "megameter", "megameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.M, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.M, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Kilometer = new Unit<this>(["km", "kilometer", "kilometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.k, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.k, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Hectometer = new Unit<this>(["hm", "hectometer", "hectometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.k, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.h, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Decameter = new Unit<this>(["dam", "decameter", "decameters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.da, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.da, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Meter = new Unit<this>(["m", "meter", "meters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.none, "m"),
        { to: "mile", convert: (val) => val / 1609.344 },
        { to: "ft", convert: (val) => val / 0.3048 },
        { to: "in", convert: (val) => val / 0.0254 },
        { to: "yd", convert: (val) => val / 0.9144 },
    ], this, this.Groups.Length);

    Decimeter = new Unit<this>(["dm", "decimeter", "decimeters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.d, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.d, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Centimeter = new Unit<this>(["cm", "centimeter", "centimeters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.c, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.c, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Millimeter = new Unit<this>(["mm", "millimeter", "millimeters"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.m, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.m, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Micrometer = new Unit<this>(["μm", "micrometer", "micrometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.μ, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.μ, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Nanometer = new Unit<this>(["nm", "nanometer", "nanometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.n, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.n, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Picometer = new Unit<this>(["pm", "picometer", "picometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.p, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.p, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Femtometer = new Unit<this>(["fm", "femtometer", "femtometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.f, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.f, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Attometer = new Unit<this>(["am", "attometer", "attometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.a, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.a, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Zeptometer = new Unit<this>(["zm", "zeptometer", "zeptometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.z, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.z, (val) => val / 0.9144) },
    ], this, this.Groups.Length);

    Yoctometer = new Unit<this>(["ym", "yoctometer", "yoctometers"], [
        ...ConverterGenerator.fromPreToAllPre(Prefix.y, "m"),
        { to: "mile", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 1609.344) },
        { to: "ft", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 0.3048) },
        { to: "in", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 0.0254) },
        { to: "yd", convert: ConverterGenerator.fromPreToOther(Prefix.y, (val) => val / 0.9144) },
    ], this, this.Groups.Length);
}

export default new DefaultUnitCollection(new DefaultUnitGroups());