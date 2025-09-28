import { MoneyCents } from "@/lib/pricing";

export const currencyFormat = (value: MoneyCents) => {
    return new Intl.NumberFormat("en-DO", {
        style: "currency",
        currency: "DOP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value / 100);
}