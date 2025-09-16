import { ICartItem } from "@/interfaces";
import { MoneyCents, TaxInput } from "@/lib/pricing";
import { calcSubtotalCents } from "./calc-subtotal-cents";

export const calcTaxCents = (items: ICartItem[], tax: TaxInput, shippingCents: MoneyCents): MoneyCents => {
    const base = calcSubtotalCents(items) + (tax.taxesApplyToShipping ? shippingCents : 0);
    return Math.round(base * tax.rate);
}