'use server';

import prisma from "@/lib/prisma";

export const getCategoryBySlug = async (slug: string) => {
    try {
        const category = await prisma.category.findFirst({
            where: {
                slug: slug
            }
        });
        
        if (!category) {
            return null;
        }

        return category;
    } catch (error) {
        throw new Error(`Error fetching category by slug: ${error}`);
    }
}