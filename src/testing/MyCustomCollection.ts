import { DefaultUnitCollection } from "../collections/DefaultUnitCollection";
import Unit from "../Unit";
import MyCustomGroups from "./MyCustomGroups";

export class MyCustomCollection<T extends MyCustomGroups> extends DefaultUnitCollection<T>{
    CustomUnit = new Unit<this>("CU", [], this.Groups.CustomGroup);
}

export default new MyCustomCollection(new MyCustomGroups());