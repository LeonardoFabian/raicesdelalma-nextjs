'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma"; 
import { revalidatePath } from "next/cache";

export const addProductToWishlist = async (productId: string) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User not found'
        }
    }

    const user = session?.user;

    try {
        if (user?.id) {
            const wishlistItem = await prisma.wishlist.upsert({
                where: {
                    userId_productId: {
                        userId: user.id,
                        productId: productId
                    },
                },
                update: {},
                create: {
                    userId: user.id,
                    productId: productId
                }
            });

            revalidatePath('/favorites');

            return {
                ok: true,
                wishlistItem: wishlistItem
            }
        } else {
            return {
                ok: false,
                message: 'User not found'
            }
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error adding product to wishlist');
    }
}