import { IGiftMessage } from "./gift-message.interface";

export interface IOrderAddress {
    id: string;
    phone: string;
    address: string;
    firstName: string;
    lastName: string;
    address2: string | null;
    postalCode: string;
    city: string;
    countryId: string;
    orderId: string;
}

export interface IOrderItems {
    size: string;
        product: {
            id: string;
            title: string;
            slug: string;
            images: {
                url: string;
            }[];
        };
        quantity: number;
        extraPrice?: number | null;
        basePrice: number;
        discount?: number | null;
        unitPrice: number;
        optionsExtraPrice?: number | null;
        options: string;
}

export interface IOrder {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    subTotal: number;
    shipping: number;
    tax: number;
    totalAmount: number;
    totalItems: number;
    status: string;
    currency: string;
    placedAt: Date | null;
    shippedAt: Date | null;
    deliveredAt: Date | null;
    canceledAt: Date | null;
    transactionId?: string | null;
    OrderAddress?: IOrderAddress | null | undefined;
    giftMessage?: IGiftMessage | null | undefined;
}