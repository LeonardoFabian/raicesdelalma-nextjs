import { ICartItem } from "@/interfaces";
import { MoneyCents } from "@/lib/pricing";
import { calcItemUnitPriceCents } from "./calc-item-unit-price-cents";

export const calcItemLineTotalCents = (item: ICartItem): MoneyCents => {
    return calcItemUnitPriceCents(item) * item.quantity;
}