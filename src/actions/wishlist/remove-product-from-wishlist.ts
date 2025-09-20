'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const removeProductFromWishlist = async (productId: string) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'User not found'
        }
    }

    const user = session?.user;

    try {
        await prisma.wishlist.deleteMany({
            where: {
                productId: productId,
                userId: user.id
            }
        });

        revalidatePath('/favorites');

        return {
            ok: true,
            message: 'Product removed from wishlist'
        }
    } catch (error) {
        console.log(error);
        throw new Error('Error removing product from wishlist');
    }
}