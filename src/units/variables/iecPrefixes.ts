import Multiplier from "../../variable/Multiplier";
import Variable from "../../variable/Variable";

/**
 * The multipliers belonging to the standard IEC prefixes arranged in an array.
 * @see Multiplier
 */
const iecPrefixes = [
    new Multiplier("Yi", "yobi", 1024 ** 8),
    new Multiplier("Zi", "zebi", 1024 ** 7),
    new Multiplier("Ei", "exbi", 1024 ** 6),
    new Multiplier("Pi", "pebi", 1024 ** 5),
    new Multiplier("Ti", "tebi", 1024 ** 4),
    new Multiplier("Gi", "gibi", 1024 ** 3),
    new Multiplier("Mi", "mebi", 1024 ** 2),
    new Multiplier("Ki", "kibi", 1024 ** 1),
];

/**
 * One of the prefixes for binaries specified in the IEC 80000.
 */
type IECBinaryPrefix = "Yi" | "Zi" | "Ei" | "Pi" | "Ti" | "Gi" | "Mi" | "Ki";

/**
 * Generates a {@link Variable} holding all requested standard IEC prefixes.
 */
export default (from: IECBinaryPrefix = "Ki", to: IECBinaryPrefix = "Yi") => {
    const toIndex = iecPrefixes.findIndex((val) => val.short === from);
    const fromIndex = iecPrefixes.findIndex((val) => val.short === to);
    return new Variable(true, ...iecPrefixes.filter((val, index) => index >= fromIndex && index <= toIndex));
}