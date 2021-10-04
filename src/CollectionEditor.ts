import Collection from "./Collection";
import Group from "./Group";


/**
 * Editor of a {@link Collection}. Provides methods to add, remove and overwrite unit groups.
 */
export default class CollectionEditor {
    /**
     * Creates a collection editor.
     * @hidden
     * @param collection 
     */
    constructor(private collection: Collection) {
        this.collection = collection;
    }

    /**
     * Removes any unit group whose name was not passed as an argument.
     * @param groups the unit group's that shouldn't get removed
     */
    select(...groups: string[]) {
        const groupsToRemove: string[] = [];
        this.collection._internal._groups().forEach((group, key) => {
            if (!groups.includes(key)) groupsToRemove.push(key);
        });
        this.remove(...groupsToRemove);
    }

    /**
     * Adds all passed unit groups to the collection.
     * If the name of a group is already taken, the old group will be overwritten by the new one.
     * @param groups the unit group's to add
     */
    add(...groups: Group[]) {
        for (const group of groups) {
            // Remove group if already existing
            if (this.collection._internal._groups().get(group.name)) {
                this.remove(group.name);
            }
            // Add group
            group.collection = this.collection;
            this.collection._internal._groups().set(group.name, group);

            const unitMap = group._internal._units();
            unitMap.forEach((unit, key) => {
                this.collection._internal._units().set(key, unit);
            });
        }
    }

    /**
     * Removes any unit group whose name matches one of the passed strings.
     * @param groups the names of the unit groups to delete
     */
    remove(...groups: string[]) {
        for (const group of groups) {
            const resolvedGroup = this.collection._internal._groups().get(group);
            if (resolvedGroup) {
                this.collection._internal._groups().delete(group);
                resolvedGroup._internal._units().forEach((unit, key) => {
                    this.collection._internal._units().delete(key);
                });
            }
        }
    }
}