import Collection from "../Collection";
import digital from "./groups/digital";
import length from "./groups/length";

const units = new Collection();

units.setGroups(
    length,
    digital
);

export default units;