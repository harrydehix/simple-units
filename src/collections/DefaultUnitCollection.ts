import Unit from "../Unit";
import FromPreToPre, { Prefix } from "../utils/FromPreToPre";
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
    Yottameter = new Unit<this>("Ym", [
        ...FromPreToPre.Converters(Prefix.Y, "m"),
    ], this, this.Groups.Length);

    Zettameter = new Unit<this>("Zm", [
        ...FromPreToPre.Converters(Prefix.Z, "m"),
    ], this, this.Groups.Length);

    Exameter = new Unit<this>("Em", [
        ...FromPreToPre.Converters(Prefix.E, "m"),
    ], this, this.Groups.Length);

    Petameter = new Unit<this>("Pm", [
        ...FromPreToPre.Converters(Prefix.P, "m"),
    ], this, this.Groups.Length);

    Terameter = new Unit<this>("Tm", [
        ...FromPreToPre.Converters(Prefix.T, "m"),
    ], this, this.Groups.Length);

    Gigameter = new Unit<this>("Gm", [
        ...FromPreToPre.Converters(Prefix.G, "m"),
    ], this, this.Groups.Length);

    Megameter = new Unit<this>("Mm", [
        ...FromPreToPre.Converters(Prefix.M, "m"),
    ], this, this.Groups.Length);

    Kilometer = new Unit<this>("km", [
        ...FromPreToPre.Converters(Prefix.k, "m"),
    ], this, this.Groups.Length);

    Hectometer = new Unit<this>("hm", [
        ...FromPreToPre.Converters(Prefix.k, "m"),
    ], this, this.Groups.Length);

    Decameter = new Unit<this>("dam", [
        ...FromPreToPre.Converters(Prefix.da, "m"),
    ], this, this.Groups.Length);

    Meter = new Unit<this>("m", [
        ...FromPreToPre.Converters(Prefix.none, "m"),
    ], this, this.Groups.Length);

    Decimeter = new Unit<this>("dm", [
        ...FromPreToPre.Converters(Prefix.d, "m"),
    ], this, this.Groups.Length);

    Centimeter = new Unit<this>("cm", [
        ...FromPreToPre.Converters(Prefix.c, "m"),
    ], this, this.Groups.Length);

    Millimeter = new Unit<this>("mm", [
        ...FromPreToPre.Converters(Prefix.m, "m"),
    ], this, this.Groups.Length);

    Micrometer = new Unit<this>("μm", [
        ...FromPreToPre.Converters(Prefix.μ, "m"),
    ], this, this.Groups.Length);

    Nanometer = new Unit<this>("nm", [
        ...FromPreToPre.Converters(Prefix.n, "m"),
    ], this, this.Groups.Length);

    Picometer = new Unit<this>("pm", [
        ...FromPreToPre.Converters(Prefix.p, "m"),
    ], this, this.Groups.Length);

    Femtometer = new Unit<this>("fm", [
        ...FromPreToPre.Converters(Prefix.f, "m"),
    ], this, this.Groups.Length);

    Attometer = new Unit<this>("am", [
        ...FromPreToPre.Converters(Prefix.a, "m"),
    ], this, this.Groups.Length);

    Zeptometer = new Unit<this>("zm", [
        ...FromPreToPre.Converters(Prefix.z, "m"),
    ], this, this.Groups.Length);

    Yoctometer = new Unit<this>("ym", [
        ...FromPreToPre.Converters(Prefix.y, "m"),
    ], this, this.Groups.Length);
}

export default new DefaultUnitCollection(new DefaultUnitGroups());