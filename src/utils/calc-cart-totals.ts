import { ICartItem } from "@/interfaces";
import { CartTotals, ShippingInput, TaxInput } from "@/lib/pricing";
import { calcSubtotalCents } from "./calc-subtotal-cents";
import { calcShippingCents } from "./calc-shipping-cents";
import { calcTaxCents } from "./calc-tax-cents";

export const calcCartTotals = (items: ICartItem[], tax: TaxInput, shipping: ShippingInput): CartTotals => {
    const subtotalCents = calcSubtotalCents(items);
    const shippingCents = calcShippingCents(items, shipping);
    const taxCents = calcTaxCents(items, tax, shippingCents);

    return {
        subtotalCents,
        shippingCents,
        taxCents,
        totalCents: subtotalCents + shippingCents + taxCents,
    };
}