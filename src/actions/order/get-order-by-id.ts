'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'User not found'
        }
    }

    const userId = session?.user?.id;

    try {
        const order = await prisma.order.findUnique({
            where: {
                id: id,
            },
            include: {
                OrderAddress: true,
                OrderItems: {
                    select: {
                        basePrice: true,
                        discount: true,
                        unitPrice: true,
                        quantity: true,
                        size: true,
                        extraPrice: true,
                        optionsExtraPrice: true,
                        options: true,

                        product: {
                            select: {
                                id: true,
                                title: true,
                                slug: true,
                                images: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!order) throw `Order ${id} not found`;

        if ( session.user.role === 'user' || 
            session.user.role === 'vendor' || 
            session.user.role === 'salesperson' || 
            session.user.role === 'salesrep' || 
            session.user.role === 'affiliate' ||
            session.user.role === 'distributor' || 
            session.user.role === 'client'
        ) {
            if (session.user.id !== order.userId) {
                throw `You don't have permission to access this order`;
            }
        }

        return {
            ok: true,
            order: order,
        };

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Order not found'
        }
    }
}