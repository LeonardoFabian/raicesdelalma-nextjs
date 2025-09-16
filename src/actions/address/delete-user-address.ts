'use server';

import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
    try {
        const address = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        if (!address) {
            return {
                ok: false,
                message: 'Address not found'
            }
        }

        await prisma.userAddress.delete({
            where: {
                userId
            }
        })    

        return {
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Something went wrong deleting address'
        }
    }
}