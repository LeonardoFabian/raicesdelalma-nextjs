'use server';

import prisma from "@/lib/prisma";

export const getSizes = async () => {
    try {
        const sizes = await prisma.size.findMany({
            orderBy: {
                id: 'asc'
            },
            include: {
                productSizes: true
            }
        });

        if (!sizes) {
            return [];
        }


        return sizes.map(size => {
            const {productSizes, ...restSize} = size;
            return {
                ...restSize,
                productSizes: productSizes.map(ps => ({
                    productId: ps.productId,
                    sizeId: ps.sizeId,
                    extraPrice: Number(ps.extraPrice),
                    stock: ps.stock,
                    sku: ps.sku
                }))
            };
        })
         
    } catch (error) {
        console.log(error);
        return [];
    }
}