import { ICartItem } from "@/interfaces";
import { MoneyCents } from "@/lib/pricing";

export const calcItemUnitPriceCents = (item: ICartItem): MoneyCents => {
    const optionsExtra = (item.options ?? []).reduce((total, option) => total + (option.extraPriceCents || 0), 0);
    const sizeExtra = item.selectedSize?.extraPriceCents ?? 0;
    const discount = item.discountCents ?? 0;

    const unit = item.basePriceCents + sizeExtra + optionsExtra - discount;
    return Math.max(unit, 0);
}