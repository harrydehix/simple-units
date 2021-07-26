import Unit from "../Unit";
import DefaultUnitGroups from "./groups/DefaultUnitGroups";
import UnitCollection from "./UnitCollection";

export class DefaultUnitCollection<T extends DefaultUnitGroups> extends UnitCollection<T> {
    private static singleton = new DefaultUnitCollection(new DefaultUnitGroups());

    public static getInstance() {
        return this.singleton;
    }

    protected constructor(unitGroups: T) {
        super(unitGroups);
    }


    // TEMPERATURE
    Celsius = new Unit("°C", [
        { to: "°F", convert: (val) => val * 1.8 + 32 },
        { to: "K", convert: (val) => val + 273.15 },
        { to: "°R", convert: (val) => val * 9 / 5 + 491.67 }
    ], this.Groups.Temperature);

    Fahrenheit = new Unit("°F", [
        { to: "°C", convert: (val) => (val - 32) / 1.8 },
        { to: "K", convert: (val) => (val - 32) * 5 / 9 + 273.15 },
        { to: "°R", convert: (val) => val + 459.67 }
    ], this.Groups.Temperature);

    Kelvin = new Unit("K", [
        { to: "°C", convert: (val) => val - 273.15 },
        { to: "°F", convert: (val) => (val - 273.15) * 9 / 5 + 32 },
        { to: "°R", convert: (val) => val * 1.8 }
    ], this.Groups.Temperature);

    Rankine = new Unit("°R", [
        { to: "°C", convert: (val) => (val - 491.67) * 5 / 9 },
        { to: "°F", convert: (val) => val - 459.67 },
        { to: "K", convert: (val) => val * 5 / 9 }
    ], this.Groups.Temperature)

    // LENGTH
    Kilometre = new Unit("km", [
        { to: "Ym", convert: (val) => val * 1e-21 },
        { to: "Zm", convert: (val) => val * 1e-18 },
        { to: "Em", convert: (val) => val * 1e-15 },
        { to: "Pm", convert: (val) => val * 1e-12 },
        { to: "Tm", convert: (val) => val * 1e-9 },
        { to: "Gm", convert: (val) => val * 1e-6 },
        { to: "Mm", convert: (val) => val * 1e-3 },
        { to: "hm", convert: (val) => val * 1e1 },
        { to: "dam", convert: (val) => val * 1e2 },
        { to: "m", convert: (val) => val * 1e3 },
        { to: "dm", convert: (val) => val * 1e4 },
        { to: "cm", convert: (val) => val * 1e5 },
        { to: "mm", convert: (val) => val * 1e6 },
        { to: "μm", convert: (val) => val * 1e9 },
        { to: "nm", convert: (val) => val * 1e12 },
        { to: "pm", convert: (val) => val * 1e15 },
        { to: "fm", convert: (val) => val * 1e18 },
        { to: "am", convert: (val) => val * 1e21 },
        { to: "zm", convert: (val) => val * 1e24 },
        { to: "ym", convert: (val) => val * 1e27 },
    ], this.Groups.Length);

    Hectometre = new Unit("hm", [
        { to: "Ym", convert: (val) => val * 1e-22 },
        { to: "Zm", convert: (val) => val * 1e-19 },
        { to: "Em", convert: (val) => val * 1e-16 },
        { to: "Pm", convert: (val) => val * 1e-13 },
        { to: "Tm", convert: (val) => val * 1e-10 },
        { to: "Gm", convert: (val) => val * 1e-7 },
        { to: "Mm", convert: (val) => val * 1e-4 },
        { to: "km", convert: (val) => val * 1e-1 },
        { to: "dam", convert: (val) => val * 1e1 },
        { to: "m", convert: (val) => val * 1e2 },
        { to: "dm", convert: (val) => val * 1e3 },
        { to: "cm", convert: (val) => val * 1e4 },
        { to: "mm", convert: (val) => val * 1e5 },
        { to: "μm", convert: (val) => val * 1e8 },
        { to: "nm", convert: (val) => val * 1e11 },
        { to: "pm", convert: (val) => val * 1e14 },
        { to: "fm", convert: (val) => val * 1e17 },
        { to: "am", convert: (val) => val * 1e20 },
        { to: "zm", convert: (val) => val * 1e23 },
        { to: "ym", convert: (val) => val * 1e26 },
    ], this.Groups.Length);

    Decametre = new Unit("dam", [
        { to: "Ym", convert: (val) => val * 1e-23 },
        { to: "Zm", convert: (val) => val * 1e-20 },
        { to: "Em", convert: (val) => val * 1e-17 },
        { to: "Pm", convert: (val) => val * 1e-14 },
        { to: "Tm", convert: (val) => val * 1e-11 },
        { to: "Gm", convert: (val) => val * 1e-8 },
        { to: "Mm", convert: (val) => val * 1e-5 },
        { to: "km", convert: (val) => val * 1e-2 },
        { to: "hm", convert: (val) => val * 1e-1 },
        { to: "m", convert: (val) => val * 1e1 },
        { to: "dm", convert: (val) => val * 1e2 },
        { to: "cm", convert: (val) => val * 1e3 },
        { to: "mm", convert: (val) => val * 1e4 },
        { to: "μm", convert: (val) => val * 1e7 },
        { to: "nm", convert: (val) => val * 1e10 },
        { to: "pm", convert: (val) => val * 1e13 },
        { to: "fm", convert: (val) => val * 1e16 },
        { to: "am", convert: (val) => val * 1e19 },
        { to: "zm", convert: (val) => val * 1e22 },
        { to: "ym", convert: (val) => val * 1e25 },
    ], this.Groups.Length);

    Metre = new Unit("m", [
        { to: "Ym", convert: (val) => val * 1e-24 },
        { to: "Zm", convert: (val) => val * 1e-21 },
        { to: "Em", convert: (val) => val * 1e-18 },
        { to: "Pm", convert: (val) => val * 1e-15 },
        { to: "Tm", convert: (val) => val * 1e-12 },
        { to: "Gm", convert: (val) => val * 1e-9 },
        { to: "Mm", convert: (val) => val * 1e-6 },
        { to: "km", convert: (val) => val * 1e-3 },
        { to: "hm", convert: (val) => val * 1e-2 },
        { to: "dam", convert: (val) => val * 1e-1 },
        { to: "dm", convert: (val) => val * 1e1 },
        { to: "cm", convert: (val) => val * 1e2 },
        { to: "mm", convert: (val) => val * 1e3 },
        { to: "μm", convert: (val) => val * 1e6 },
        { to: "nm", convert: (val) => val * 1e9 },
        { to: "pm", convert: (val) => val * 1e12 },
        { to: "fm", convert: (val) => val * 1e15 },
        { to: "am", convert: (val) => val * 1e18 },
        { to: "zm", convert: (val) => val * 1e21 },
        { to: "ym", convert: (val) => val * 1e24 },
    ], this.Groups.Length);

    Decimetre = new Unit("dm", [
        { to: "Ym", convert: (val) => val * 1e-25 },
        { to: "Zm", convert: (val) => val * 1e-22 },
        { to: "Em", convert: (val) => val * 1e-19 },
        { to: "Pm", convert: (val) => val * 1e-16 },
        { to: "Tm", convert: (val) => val * 1e-13 },
        { to: "Gm", convert: (val) => val * 1e-10 },
        { to: "Mm", convert: (val) => val * 1e-7 },
        { to: "km", convert: (val) => val * 1e-4 },
        { to: "hm", convert: (val) => val * 1e-3 },
        { to: "dam", convert: (val) => val * 1e-2 },
        { to: "m", convert: (val) => val * 1e-1 },
        { to: "cm", convert: (val) => val * 1e1 },
        { to: "mm", convert: (val) => val * 1e2 },
        { to: "μm", convert: (val) => val * 1e5 },
        { to: "nm", convert: (val) => val * 1e8 },
        { to: "pm", convert: (val) => val * 1e11 },
        { to: "fm", convert: (val) => val * 1e14 },
        { to: "am", convert: (val) => val * 1e17 },
        { to: "zm", convert: (val) => val * 1e20 },
        { to: "ym", convert: (val) => val * 1e23 },
    ], this.Groups.Length);

    Centimetre = new Unit("cm", [
        { to: "Ym", convert: (val) => val * 1e-26 },
        { to: "Zm", convert: (val) => val * 1e-23 },
        { to: "Em", convert: (val) => val * 1e-20 },
        { to: "Pm", convert: (val) => val * 1e-17 },
        { to: "Tm", convert: (val) => val * 1e-14 },
        { to: "Gm", convert: (val) => val * 1e-11 },
        { to: "Mm", convert: (val) => val * 1e-8 },
        { to: "km", convert: (val) => val * 1e-5 },
        { to: "hm", convert: (val) => val * 1e-4 },
        { to: "dam", convert: (val) => val * 1e-3 },
        { to: "m", convert: (val) => val * 1e-2 },
        { to: "dm", convert: (val) => val * 1e-1 },
        { to: "mm", convert: (val) => val * 1e1 },
        { to: "μm", convert: (val) => val * 1e4 },
        { to: "nm", convert: (val) => val * 1e7 },
        { to: "pm", convert: (val) => val * 1e10 },
        { to: "fm", convert: (val) => val * 1e13 },
        { to: "am", convert: (val) => val * 1e16 },
        { to: "zm", convert: (val) => val * 1e19 },
        { to: "ym", convert: (val) => val * 1e22 },
    ], this.Groups.Length);

    Millimetre = new Unit("mm", [
        { to: "Ym", convert: (val) => val * 1e-27 },
        { to: "Zm", convert: (val) => val * 1e-24 },
        { to: "Em", convert: (val) => val * 1e-21 },
        { to: "Pm", convert: (val) => val * 1e-18 },
        { to: "Tm", convert: (val) => val * 1e-15 },
        { to: "Gm", convert: (val) => val * 1e-12 },
        { to: "Mm", convert: (val) => val * 1e-9 },
        { to: "km", convert: (val) => val * 1e-6 },
        { to: "hm", convert: (val) => val * 1e-5 },
        { to: "dam", convert: (val) => val * 1e-4 },
        { to: "m", convert: (val) => val * 1e-3 },
        { to: "dm", convert: (val) => val * 1e-2 },
        { to: "cm", convert: (val) => val * 1e-1 },
        { to: "μm", convert: (val) => val * 1e3 },
        { to: "nm", convert: (val) => val * 1e6 },
        { to: "pm", convert: (val) => val * 1e9 },
        { to: "fm", convert: (val) => val * 1e12 },
        { to: "am", convert: (val) => val * 1e15 },
        { to: "zm", convert: (val) => val * 1e18 },
        { to: "ym", convert: (val) => val * 1e21 },
    ], this.Groups.Length);

    Micrometre = new Unit("μm", [
        { to: "Ym", convert: (val) => val * 1e-30 },
        { to: "Zm", convert: (val) => val * 1e-27 },
        { to: "Em", convert: (val) => val * 1e-24 },
        { to: "Pm", convert: (val) => val * 1e-21 },
        { to: "Tm", convert: (val) => val * 1e-18 },
        { to: "Gm", convert: (val) => val * 1e-15 },
        { to: "Mm", convert: (val) => val * 1e-12 },
        { to: "km", convert: (val) => val * 1e-9 },
        { to: "hm", convert: (val) => val * 1e-8 },
        { to: "dam", convert: (val) => val * 1e-7 },
        { to: "m", convert: (val) => val * 1e-6 },
        { to: "dm", convert: (val) => val * 1e-5 },
        { to: "cm", convert: (val) => val * 1e-4 },
        { to: "mm", convert: (val) => val * 1e-3 },
        { to: "nm", convert: (val) => val * 1e3 },
        { to: "pm", convert: (val) => val * 1e6 },
        { to: "fm", convert: (val) => val * 1e9 },
        { to: "am", convert: (val) => val * 1e12 },
        { to: "zm", convert: (val) => val * 1e15 },
        { to: "ym", convert: (val) => val * 1e18 },
    ], this.Groups.Length);
}

export default DefaultUnitCollection.getInstance();