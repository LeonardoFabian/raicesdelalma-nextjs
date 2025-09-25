import { IOrder } from "./order.interface";

export interface IGiftMessage {
    id?: string;
    orderId?: string;
    sender?: string;
    recipient?: string;
    message?: string;
    mediaUrl?: string;
    createdAt?: Date;
    views?: IGiftMessageView[];

    order?: IOrder;

}

export interface IGiftMessageView {
    id: string;
    giftId: string;
    viewedAt: Date;
    gift: IGiftMessage;
}