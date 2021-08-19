import Convertable from "./Convertable";
import Group from "./Group";
import Unit from "./Unit";

export default class Collection {
    public static None = new Collection();

    private units = new Map<string, Unit>();
    private groups = new Map<string, Group>();

    readonly _internal = {
        _addUnit: (name: string, unit: Unit) => {
            this.units.set(name, unit);
        }
    }

    readonly Editor = {
        add: (...groups: Group[]) => {
            for (const group of groups) {
                group.collection = this;
                this.groups.set(group.name, group);

                const unitMap = group._internal._units();
                unitMap.forEach((unit, key) => {
                    this.units.set(key, unit);
                });
            }
        },
    };

    unit(unit: string) {
        const result = this.units.get(unit);
        if (!result) throw Error(`Invalid unit '${unit}'!`);
        return result;
    }

    group(group: string) {
        const result = this.groups.get(group);
        if (!result) throw Error();
        return result;
    }

    from(value: number, unit: string) {
        return new Convertable(value, this.unit(unit));
    }
}