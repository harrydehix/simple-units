import Value from "../../variable/Value";
import Variable from "../../variable/Variable";

/**
 * {@link Variable} holding every IEC 80000 binary prefix.
 */
export default new Variable([
    new Value("Yi", "yobi", 1024 ** 8),
    new Value("Zi", "zebi", 1024 ** 7),
    new Value("Ei", "exbi", 1024 ** 6),
    new Value("Pi", "pebi", 1024 ** 5),
    new Value("Ti", "tebi", 1024 ** 4),
    new Value("Gi", "gibi", 1024 ** 3),
    new Value("Mi", "mebi", 1024 ** 2),
    new Value("Ki", "kibi", 1024 ** 1),
], false);