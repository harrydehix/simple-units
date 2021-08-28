import Collection from "./Collection";
import FlexibleUnit from "./FlexibleUnit";
import Group from "./Group";
import Unit from "./Unit";


/**
 * Editor of a {@link Group}. Provides methods to add, remove and overwrite units.
 */
export default class GroupEditor {
    /**
     * Creates a group editor.
     * @hidden
     * @param group
     */
    constructor(private group: Group) {
        this.group = group;
    }

    /**
     * 
     * @param units 
     */
    add(...units: (FlexibleUnit | Unit)[]) {
        const hasCollection = this.group.collection !== Collection.None;
        for (const unit of units) {
            if (unit instanceof FlexibleUnit) {
                this.add(...unit._units);
            } else {
                unit.group = this.group;
                if (this.group._internal._units().get(unit.toString())) {
                    this.remove(unit.toString());
                }
                const keys = unit.format.short.concat(unit.format.long.pl, unit.format.long.sg);
                for (const key of keys) {
                    this.group._internal._units().set(key, unit);
                    if (hasCollection) this.group.collection._internal._setUnit(key, unit);
                }
            }
        }
    }

    remove(...units: string[]) {
        const hasCollection = this.group.collection !== Collection.None;
        for (const unit of units) {
            const resolvedUnit = this.group._internal._units().get(unit);
            if (resolvedUnit) {
                const keys = resolvedUnit.format.short.concat(resolvedUnit.format.long.pl, resolvedUnit.format.long.sg);
                for (const key of keys) {
                    this.group._internal._units().delete(key);
                    if (hasCollection) this.group.collection._internal._deleteUnit(key);
                }
            }
        }
    }
}