import times from "./times.js";

/**
 * {@link Variable} holding every time unit for use in the denominator.
 */
const dividedByTimes = times.copy().pow(-1);

export default dividedByTimes;
