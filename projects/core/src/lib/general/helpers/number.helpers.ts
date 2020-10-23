export function parseFloatWithDefault<T>(value: string, defaultValue: T = null): number | T {
    return parseFloat(value) || defaultValue;
}

export function parseIntWithDefault<T>(value: string, defaultValue: T = null): number | T {
    return parseInt(value, 10) || defaultValue;
}
