import { DefaultUnitCollection } from "../collections/DefaultUnitCollection";
import Unit from "../Unit";
import MyCustomGroups from "./MyCustomGroups";

export class MyCustomCollection<T extends MyCustomGroups> extends DefaultUnitCollection<T>{
    Penis = new Unit("°Penis", [], this.Groups.Body);
}

export default new MyCustomCollection(new MyCustomGroups());