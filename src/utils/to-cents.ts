export const toCents = (value: number | string) => {
    return Math.round(typeof value === 'string' ? parseFloat(value) * 100 : value * 100);
}