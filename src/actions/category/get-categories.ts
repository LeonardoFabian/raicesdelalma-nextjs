'use server';

import prisma from "@/lib/prisma";


export const getCategories = async () => {
    try {
        const categories = await prisma.category.findMany({
            orderBy: {
                title: 'asc'
            },
            include: {
                products: {
                    include: {
                        images: {
                            select: {
                                Id: true,
                                url: true
                            }
                        }
                    }
                }
            }
        });

        if (!categories) {
            return [];
        }

        return categories.map(category => ({
            id: category.id,
            title: category.title,
            slug: category.slug,
            userId: category.userId,
            products: category.products.map(product => {
                const { price, discountPercentage, images, ...restProduct } = product;

                return ({
                    ...restProduct,
                    price: Number(price),
                    discountPercentage: Number(discountPercentage),
                    images: images.map(image => ({
                        id: image.Id,
                        url: image.url
                    }))
                })
            })
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
}