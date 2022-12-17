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
     * Removes any unit except the given ones.
     * @param units the units that shouldn't get removed
     */
    select(...units: string[]) {
        const unitsToRemove: string[] = [];
        for (const entry of this.group._internal._units()) {
            const key = entry[0];
            if (!units.includes(key)) unitsToRemove.push(key);
        }
        this.remove(...unitsToRemove);
    }

    /**
     * Adds the given units to the related group. Units having the same _default notation_ (the notation that gets returned on
     * calling `unit.toString()`) are overwritten.
     * @param units units to add
     */
    add(...units: (FlexibleUnit | Unit)[]) {
        for (const unit of units) {
            if (unit instanceof FlexibleUnit) {
                // Handling "Flexible Units" differently (actually a flexible unit is just an object holding an array of common units, therefore it's array is added)
                this.add(...unit._units);
            } else {
                // Set the units group
                unit._internal._group = this.group;

                // Remove units having the same default notation
                if (this.group._internal._units().get(unit.toString())) {
                    this.remove(unit.toString());
                }

                // Mapping the unit to it's notations
                const keys = unit.computeNotations();
                for (const key of keys) {
                    this.group._internal._units().set(key, unit);
                    if (this.group.collection !== null) this.group.collection._internal._setUnit(key, unit);
                }
            }
        }
    }

    /**
     * Removes the given units from the related group. Only a single notation per unit is required.
     * @param units units to remove
     */
    remove(...units: string[]) {
        for (const unit of units) {
            // Resolving the unit object belonging to the key/notation
            const resolvedUnit = this.group._internal._units().get(unit);
            if (resolvedUnit) {
                // Computing the unit's notations
                const keys = resolvedUnit.computeNotations();

                // Removing every related entry in the group (and collection)
                for (const key of keys) {
                    this.group._internal._units().delete(key);
                    if (this.group.collection != null) this.group.collection._internal._deleteUnit(key);
                }
            }
        }
    }
}