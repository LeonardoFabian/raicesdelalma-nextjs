import { toCents } from "./to-cents"

/**
 * Calculate the discount amount in cents for a given price and discount percentage.
 *
 * @param price The full price of the item before discount.
 * @param discountPercentage The percentage discount to apply, if any.
 * @returns The discount amount in cents.
 */
export const calcDiscountCents = (price: number, discountPercentage?: number) => {
    return discountPercentage ? Math.round(toCents(price) * (Number(discountPercentage) / 100)) : 0;
}