import { ICartItem } from "@/interfaces";
import { MoneyCents } from "@/lib/pricing";
import { calcItemLineTotalCents } from "./calc-item-line-total-cents";

export const calcSubtotalCents = (items: ICartItem[]): MoneyCents => {
    return items.reduce((total, item) => total + calcItemLineTotalCents(item), 0);
}