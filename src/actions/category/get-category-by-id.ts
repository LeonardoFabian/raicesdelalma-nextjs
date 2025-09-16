'use server';

import prisma from "@/lib/prisma";

export const getCategoryById = async (id: string) => {
    try {
        const category = await prisma.category.findFirst({
            where: {
                id: id
            }
        });
        
        if (!category) {
            return undefined;
        }

        return category;
    } catch (error) {
        throw new Error(`Error fetching category by slug: ${error}`);
    }
}