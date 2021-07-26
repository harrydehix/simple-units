export default class UnitGroups {
    public getName(unitGroup: number) {
        for (const property in this) {
            const number = this[property as keyof this] as any;
            if (number === unitGroup) return property as string;
        }
    }
}