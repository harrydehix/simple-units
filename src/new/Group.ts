import Collection from "./Collection";
import Convertable from "./Convertable";
import FlexibleUnit from "./FlexibleUnit";
import Unit from "./Unit";

export default class Group {
    public static None = new Group("none");

    private units = new Map<string, Unit>();
    collection: Collection = Collection.None;
    name: string;

    readonly _internal = {
        _units: () => {
            return this.units;
        }
    }

    readonly Editor = {
        add: (...units: (FlexibleUnit | Unit)[]) => {
            if (this.collection !== Collection.None) {
                for (const unit of units) {
                    if (unit instanceof FlexibleUnit) {
                        this.Editor.add(...unit.units);
                    } else {
                        unit.group = this;
                        const keys = unit.format.short.concat(unit.format.long.pl, unit.format.long.sg);
                        for (const key of keys) {
                            this.units.set(key, unit);
                            this.collection._internal._addUnit(key, unit);
                        }
                    }
                }
            } else {
                for (const unit of units) {
                    if (unit instanceof FlexibleUnit) {
                        this.Editor.add(...unit.units);
                    } else {
                        unit.group = this;
                        const keys = unit.format.short.concat(unit.format.long.pl, unit.format.long.sg);
                        for (const key of keys) {
                            this.units.set(key, unit);
                        }
                    }
                }
            }
        },
    };

    constructor(name: string) {
        this.name = name;
    }

    unit(unit: string) {
        const result = this.units.get(unit);
        if (!result) throw Error();
        return result;
    }

    from(value: number, unit: string) {
        return new Convertable(value, this.unit(unit));
    }
}