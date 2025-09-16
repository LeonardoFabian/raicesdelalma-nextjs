export type MoneyCents = number;

export type SelectedSize = {
    id?: number;
    label?: string;
    extraPriceCents?: MoneyCents; 
    sku?: string;
    stock?: number;
    // userId: string;
}

export type CartOption = {
    id: string;
    name: string;
    extraPriceCents: MoneyCents;
}

export type ShippingInput = {
    flatCents?: MoneyCents;
    freeOverCents?: MoneyCents;
    perGramCents?: number;
}

export type TaxInput = {
    rate: number;
    taxesApplyToShipping?: boolean;
}

export type CartTotals = {
    subtotalCents: MoneyCents;
    shippingCents: MoneyCents;
    taxCents: MoneyCents;
    totalCents: MoneyCents;
}