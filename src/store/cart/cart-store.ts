import { create } from "zustand";
import { persist } from "zustand/middleware"
import type { ICartItem } from "@/interfaces";
import { CartTotals, ShippingInput, TaxInput } from "@/lib/pricing";
import { calcCartTotals, toCents, currencyFormat, calcItemLineTotalCents, calcDiscountCents, calcItemUnitPriceCents } from "@/utils";

const optionsKey = (opts?: ICartItem['options']) => JSON.stringify((opts ?? []).map(o => ({ n: o.name, e: o.extraPriceCents})).sort((a, b) => a.n.localeCompare(b.n)));

const makeLineId = (p: { productId: string; sizeId?: number | null; options?: ICartItem['options'];}) => {
    return [p.productId, p.sizeId ?? 'onesize', optionsKey(p.options)].join('::');
}

interface CartState {
    cart: ICartItem[];
    tax: TaxInput;
    shipping: ShippingInput;

    addItemToCart: (product: Omit<ICartItem, 'lineId'>) => string; // void = return lineId
    getTotalItems: () => number;
    updateCartItem: (lineId: string, quantity: number ) => void;
    removeLine: (lineId: string) => void;
    clear: () => void;

    getCartItemLineSummary: (product: Omit<ICartItem, 'lineId'>) => {
        basePrice: string;
        basePriceWithDiscount: string;
        discountPercentage: string;
        unitPrice: string;
        total: string;
        options: {name: string; extraPrice: string}[];
        selectedSize: {id: number | undefined; label: string | undefined; extraPriceCents: number | undefined};
    } 
    getCartTotals: () => CartTotals;
    getCartSummary: () => {
        subtotal: string;
        shipping: string;
        tax: string;
        total: string;
    }
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cart: [],
            tax: { rate: 0, taxesApplyToShipping: false },
            shipping: { flatCents: toCents(0), freeOverCents: toCents(100) },

            // Methods
            addItemToCart: (payload) => {
                const lineId = makeLineId({
                    productId: payload.productId,
                    sizeId: payload.selectedSize?.id ?? null,
                    options: payload.options
                });

                set((s) => {
                    const idx = s.cart.findIndex(i => i.lineId === lineId);
                    if (idx >= 0) {
                        const copy = [...s.cart];
                        copy[idx] = {...copy[idx], quantity: copy[idx].quantity + payload.quantity};
                        return { cart: copy };
                    }
                    const newItem: ICartItem = {...payload, lineId};
                    return { cart: [...s.cart, newItem] };
                });

                return lineId;

            }, 

            getTotalItems: () => {             
                const t = get().cart.reduce((total, item) => total + item.quantity, 0);
                return t;              
            },

            updateCartItem: (lineId, quantity ) =>
                set((s) => ({
                    cart: s.cart.map(i => i.lineId === lineId ? {...i, quantity: Math.max(quantity, 0)} : i),
                })),
           

            removeLine: (lineId) => 
                set((s) => ({
                    cart: s.cart.filter(i => i.lineId !== lineId)
                })),
       

            clear: () => set({ cart: [] }),


            getCartItemLineSummary: (payload) => {
                const lineId = makeLineId({
                    productId: payload.productId,
                    sizeId: payload.selectedSize?.id ?? null,
                    options: payload.options
                });

                const { cart } = get();

                const item = cart.findIndex(i => i.lineId === lineId);
                const total = calcItemLineTotalCents(cart[item]);

                // return options
                const options = (cart[item].options ?? []).map(option => ({ name: option.name, extraPrice: currencyFormat(option.extraPriceCents) })) ?? [];

                // return selected size
                const selectedSize = cart[item].selectedSize ?? { id: 0, label: 'One Size', extraPriceCents: 0 };

                // return base price
                const basePrice = currencyFormat(cart[item].basePriceCents);

                // return discount percentage
                const discountPercentage = cart[item].discountCents ? `${Math.round((cart[item].discountCents / cart[item].basePriceCents) * 100)}%` : '0%';

                // calc discount
                const discount = calcDiscountCents(cart[item].basePriceCents, cart[item].discountCents);

                // return base price with discount
                const basePriceWithDiscount = cart[item]
                    ? currencyFormat(cart[item].basePriceCents - (cart[item].discountCents ?? 0))
                    : currencyFormat(0);

                const unitPrice = currencyFormat(calcItemUnitPriceCents(cart[item]));


                return { 
                    basePrice,
                    basePriceWithDiscount,
                    unitPrice: unitPrice.toString(),
                    discountPercentage,
                    total: currencyFormat(total),
                    options: options,
                    selectedSize: {
                        id: selectedSize.id,
                        label: selectedSize.label,
                        extraPriceCents: selectedSize.extraPriceCents,
                    }
                };
            },

            getCartTotals: () => {
                const { cart, tax, shipping } = get();
                return calcCartTotals(cart, tax, shipping);
            },

            getCartSummary: () => {
                const t = get().getCartTotals();
                return {
                    subtotal: currencyFormat(t.subtotalCents),
                    shipping: currencyFormat(t.shippingCents),
                    tax: currencyFormat(t.taxCents),
                    total: currencyFormat(t.totalCents),
                };                  
            },        
        }), {
            name: 'rda-shopping-cart',
            // skipHydration: true
        }
    )
)