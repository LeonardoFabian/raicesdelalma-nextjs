'use server';

import prisma from "@/lib/prisma";

export const getGiftMessageById = async (id: string) => {
    try {
        const giftMessage = await prisma.giftMessage.findUnique({
            where: {
                id: id
            }
        });

        if (!giftMessage) return null;
        
        return {
            id: giftMessage.id,
            orderId: giftMessage.orderId,
            sender: giftMessage.sender,
            recipient: giftMessage.recipient,
            message: giftMessage.message
        };
    } catch (error) {
        console.log(`Error: ${error}`);
    }
} 