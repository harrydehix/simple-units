import Multiplicator from "../../multiplicator/Multiplicator";
import Variable from "../../multiplicator/Variable";

const iecPrefixes = [
    new Multiplicator("Yi", "yobi", 1024 ** 8),
    new Multiplicator("Zi", "zebi", 1024 ** 7),
    new Multiplicator("Ei", "exbi", 1024 ** 6),
    new Multiplicator("Pi", "pebi", 1024 ** 5),
    new Multiplicator("Ti", "tebi", 1024 ** 4),
    new Multiplicator("Gi", "gibi", 1024 ** 3),
    new Multiplicator("Mi", "mebi", 1024 ** 2),
    new Multiplicator("Ki", "kibi", 1024 ** 1),
];

type IECPrefix = "Yi" | "Zi" | "Ei" | "Pi" | "Ti" | "Gi" | "Mi" | "Ki";
export default (from: IECPrefix = "Ki", to: IECPrefix = "Yi") => {
    const toIndex = iecPrefixes.findIndex((val) => val.short === from);
    const fromIndex = iecPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...iecPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}