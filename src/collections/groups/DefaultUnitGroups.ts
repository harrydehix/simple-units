import UnitGroups from "./UnitGroups";

export default class DefaultUnitGroups extends UnitGroups {
    Length = this.Group();
    Speed = this.Group();
    Area = this.Group();
    Mass = this.Group();
    Volume = this.Group();
    VolumeFlowRate = this.Group();
    Temperature = this.Group();
    Time = this.Group();
    Acceleration = this.Group();
    Charge = this.Group();
    Force = this.Group();
    Voltage = this.Group();
    Power = this.Group();
    Energy = this.Group();
    Pace = this.Group();
    Pressure = this.Group();
    Illuminance = this.Group();
    PartsPer = this.Group();
    Current = this.Group();
    ApparentPower = this.Group();
    ReactivePower = this.Group();
    ReactiveEnergy = this.Group();
    Angle = this.Group();
    Digital = this.Group();
    Frequency = this.Group();
}