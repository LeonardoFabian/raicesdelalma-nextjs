'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface Pagination {
    page?: number;
    take?: number;
}

export const getOrdersBySessionUser = async ({ page = 1, take = 12 }: Pagination ) => {

    if (isNaN(Number(page))) page = 1;
    if (page < 1) page = 1;

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
            },
            take: take,
            skip: (page - 1) * take
        });

        const count = orders.length;
        const totalPages = Math.ceil(count / take);

        return {
            ok: true,
            orders: orders.map(order => {
                const {subTotal, totalAmount, shipping, ...restOrder } = order;

                return {
                    ...restOrder,
                    subTotal: Number(subTotal),
                    totalAmount: Number(totalAmount),
                    shipping: Number(shipping)
                }
            }),
            count: count,
            currentPage: page,
            totalPages: totalPages
        }
    } catch (error) {
        console.log(error);

        return {
            ok: false,
            message: 'Something went wrong fetching orders',
            orders: [],
            count: 0,
            currentPage: 1,
            totalPages: 1
        }
    }
}