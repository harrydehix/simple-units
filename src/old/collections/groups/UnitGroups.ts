export default class UnitGroups {
    private id = 1;

    public getName(unitGroup: number) {
        for (const property in this) {
            const number = this[property as keyof this] as any;
            if (number === unitGroup) return property as string;
        }
    }

    protected Group() {
        return this.id++;
    }
}