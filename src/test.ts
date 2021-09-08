import 'source-map-support/register'
import units from "./units/units";
import Group from "./Group";
import Unit from "./Unit";


// console.log("LOL")
// const customGroup = new Group("custom");

// console.log("WTF")
// customGroup.Editor.add(
//     new Unit({
//         short: ["ss"],
//         long: {
//             sg: ["some"],
//             pl: ["somes"],
//         }
//     }, 1, 0, "other")
// )
// console.log("here")
// units.Editor.add(customGroup);

// units.group("length").Editor.add(new Unit({
//     short: ["m"],
//     long: {
//         sg: ["manga"],
//         pl: ["mangas"],
//     }
// }, 1.31, 0, "other"));


// console.log(units.isSupported("manga"))
// console.log(units.from(12.2323123, "knot").format("%.2f %s", { length: "long" }));
// const convertible = units.Convertible(12, "kt");

// console.log(convertible.possibilities());
console.log(units)