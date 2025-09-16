import { MoneyCents } from "@/lib/pricing";

/**
 * Format a given amount in cents as a string representing a money amount in the given currency.
 * @param {MoneyCents} cents - The amount in cents
 * @param {string} [currency='USD'] - The three letter currency code
 * @returns {string} - The formatted string
 */
export const formatMoney = (cents: MoneyCents, currency = 'USD') => {
    return (cents / 100).toLocaleString(undefined, {
        style: 'currency', currency
    });
}