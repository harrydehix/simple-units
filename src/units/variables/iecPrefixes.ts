import Option from "../../variable/Option";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every IEC 80000 binary prefix.
 */
export default new Variable([
    new Option("Yi", "yobi", 1024 ** 8),
    new Option("Zi", "zebi", 1024 ** 7),
    new Option("Ei", "exbi", 1024 ** 6),
    new Option("Pi", "pebi", 1024 ** 5),
    new Option("Ti", "tebi", 1024 ** 4),
    new Option("Gi", "gibi", 1024 ** 3),
    new Option("Mi", "mebi", 1024 ** 2),
    new Option("Ki", "kibi", 1024 ** 1),
], false);