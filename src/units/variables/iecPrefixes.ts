import Option from "../../variable/Option";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every IEC 80000 binary prefix.
 */
const iecPrefixes = [
    new Option("Yi", "yobi", 1024 ** 8),
    new Option("Zi", "zebi", 1024 ** 7),
    new Option("Ei", "exbi", 1024 ** 6),
    new Option("Pi", "pebi", 1024 ** 5),
    new Option("Ti", "tebi", 1024 ** 4),
    new Option("Gi", "gibi", 1024 ** 3),
    new Option("Mi", "mebi", 1024 ** 2),
    new Option("Ki", "kibi", 1024 ** 1),
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