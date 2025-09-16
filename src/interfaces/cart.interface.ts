import { CartOption, MoneyCents, SelectedSize } from "@/lib/pricing";
import { ISize } from "./size.interface";

export interface ICartItem {
    lineId: string; // Unique identifier for the line item
    productId: string; // productId
    title: string;
    slug: string;
    basePriceCents: MoneyCents; // basePriceCents: MoneyCents
    quantity: number;
    image: { id: number; url: string };
    // size: string;
    selectedSize?: SelectedSize; // selected size
    options: CartOption[] | undefined; // configurable options
    discountCents?: MoneyCents; // discounts 
    weightGrams?: number;
}