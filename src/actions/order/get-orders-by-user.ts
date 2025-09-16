'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersBySessionUser = async () => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'User is not authenticated'
        }
    }

    try {
        const orders = await prisma.order.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                OrderAddress: true,
            }
        });

        return {
            ok: true,
            orders: orders
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'Something went wrong fetching orders'
        }
    }
}