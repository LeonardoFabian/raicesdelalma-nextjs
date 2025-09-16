'use server';

import prisma from "@/lib/prisma";


export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                title: 'asc'
            }
        });

        if (!categories) {
            return [];
        }

        return categories.map(category => ({
            id: category.id,
            title: category.title,
            slug: category.slug,
            userId: category.userId
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
}