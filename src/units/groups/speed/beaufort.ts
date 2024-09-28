import ConversionError from "../../../errors/ConversionError.js";

/**
 * Converts a value from `m/s` to `Bft`.
 * @param val value in m/s
 * @returns value in Bft
 */
export const meterPerSecondToBeaufort = (val: number) => {
    if (val < 0.5) return 0;
    if (val <= 1.5) return 1;
    if (val <= 3.3) return 2;
    if (val <= 5.5) return 3;
    if (val <= 7.9) return 4;
    if (val <= 10.7) return 5;
    if (val <= 13.8) return 6;
    if (val <= 17.1) return 7;
    if (val <= 20.7) return 8;
    if (val <= 24.4) return 9;
    if (val <= 28.4) return 10;
    if (val <= 32.6) return 11;
    return 12;
};

/**
 * Converts a value from `Bft` to `M/s`.
 * @param val value in Bft
 * @returns value in m/s
 */
export const beaufortToMeterPerSecond = (val: number) => {
    if (val === 0) return 0.25;
    if (val === 1) return 1;
    if (val === 2) return 2.45;
    if (val === 3) return 4.45;
    if (val === 4) return 6.7;
    if (val === 5) return 9.35;
    if (val === 6) return 12.3;
    if (val === 7) return 15.5;
    if (val === 8) return 18.95;
    if (val === 9) return 22.6;
    if (val === 10) return 26.45;
    if (val === 11) return 30.55;
    if (val === 12) return 32.7;
    throw new ConversionError(
        "Beaufort scale only support integers between 0 and 12."
    );
};
