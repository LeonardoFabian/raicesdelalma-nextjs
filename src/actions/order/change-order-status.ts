'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { ok } from "assert";
import { revalidatePath } from "next/cache";

export const changeOrderStatus = async (orderId: string, status: string) => {

    const session = await auth();
    if (session?.user.role !== "admin") {
        return {
            ok: false,
            message: "You are not authorized to access this resource",
        };
    }

    try {

        const order = await prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                status: status
            }
        });
        
        if (!order) {
            return {
                ok: false,
                message: 'Order not found'
            }
        }

        revalidatePath('/admin/orders');

        return {
            ok: true
        }
        
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Something went wrong updating order status'
        }
    }

}