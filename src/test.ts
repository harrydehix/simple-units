import { Unit } from ".";
import Group from "./Group";
import units from "./units/units";

const customGroup = new Group("custom");

customGroup.Editor.add(
    Unit.create({
        short: ["ss"],
        long: {
            sg: ["some"],
            pl: ["somes"],
        }
    }, 1, 0, "other")
)

units.Editor.add(customGroup);
units.group("length").Editor.add(Unit.create({
    short: ["m"],
    long: {
        sg: ["manga"],
        pl: ["mangas"],
    }
}, 1.31, 0, "other"));


console.log(units.isSupported("manga"))
console.log(units.from(12, "knot").as("Bft"));
console.log(units.possibilities())