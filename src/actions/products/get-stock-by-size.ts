'use server'

import { sleep } from "@/utils";

export const getStockBySize = async ( productId: string, sizeId: number ) => {
    try {

        // await sleep(3);

        const stock = await prisma?.productSize.groupBy({
            by: ['sizeId'],
            where: { productId, sizeId },
            _sum: { stock: true }
        });

        return {
            stockTotal: stock?.[0]?._sum.stock || 0
        }
    } catch (error) {
        return 0;
    }
}