import { ICartItem } from "@/interfaces";
import { MoneyCents, ShippingInput } from "@/lib/pricing";
import { calcSubtotalCents } from "./calc-subtotal-cents";

/**
 * Calculate the total shipping cost in cents, given an array of items and a set of shipping rules.
 *
 * The rules are as follows:
 * - If `freeOverCents` is set and the subtotal of the items is >= that amount, shipping is free.
 * - If `perGramCents` is set, add that amount to the total shipping cost for each gram of weight.
 * - If `flatCents` is set, add that amount to the total shipping cost.
 *
 * @param {ICartItem[]} items
 * @param {ShippingInput} input
 * @returns {MoneyCents}
 */
export const calcShippingCents = (items: ICartItem[], input: ShippingInput): MoneyCents => {
    const subtotal = calcSubtotalCents(items);

    // Apply free shipping if applicable
    if (input.freeOverCents && subtotal >= input.freeOverCents) return 0;

    let ship = input.flatCents ?? 0;
    if (input.perGramCents) {
        const grams = items.reduce((g, item) => g + (item.weightGrams ?? 0) * item.quantity, 0);
        ship += Math.ceil(grams) * input.perGramCents;
    }
    return ship;
}