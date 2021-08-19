import Group from "./Group";
import Unit from "./Unit";
import units from "./units/units";

const customGroup = new Group("custom");

customGroup.Editor.add(
    new Unit({
        short: ["ss"],
        long: {
            sg: ["some"],
            pl: ["somes"],
        }
    }, 1, 0, "other")
)

units.Editor.add(customGroup);
units.group("length").Editor.add(new Unit({
    short: ["m"],
    long: {
        sg: ["manga"],
        pl: ["mangas"],
    }
}, 1.31, 0, "other"));


console.log(units)