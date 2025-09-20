'use server';

import { auth } from "@/auth.config";
import { Product } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Pagination {
    page?: number;
    take?: number;
}

type WishlistResponse = {
  products: Product[];
  currentPage: number;
  totalPages: number;
  count: number;
};

export const getWishlistByUser = async ({ page = 1, take = 10 }: Pagination): Promise<WishlistResponse> => {
    const session = await auth();

    if (!session?.user) {
        throw new Error('User not authenticated');
    }

    const user = session?.user;

    if ( isNaN( Number(page))) page = 1;
    if ( page < 1 ) page = 1;

    try {
        const items = await prisma.wishlist.findMany({
            take: take,
            skip: (page - 1) * take,
            where: {
                userId: user.id
            },
            include: {
                product: {
                    include: {
                        images: {
                            take: 2,
                            select: {
                                Id: true,
                                url: true
                            }
                        }, 
                        category: {
                            select: {
                                id: true,
                                title: true
                            }
                        },
                        productSizes: {
                            include: {
                                size: {
                                    select: {
                                        id: true,
                                        label: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const count = await prisma.wishlist.count({
            where: {
                userId: user.id
            }
        });

        const totalPages = Math.ceil( count / take );

        return {
            products: items.map( item => {
                const { price, discountPercentage, fulfillmentMode, images, productSizes, ...restProduct } = item.product;

                return ({
                    ...restProduct,
                    price: Number(price),
                    discountPercentage: Number(discountPercentage),
                    fulfillmentMode: fulfillmentMode.toString(),
                    images: images.map( image => ({
                        id: image.Id,
                        url: image.url
                    })),
                    productSizes: productSizes.map( productSize => {
                        const {extraPrice, ...restProductSize} = productSize;

                        return ({
                            ...restProductSize,
                            label: productSize.size.label,
                            extraPrice: Number(productSize.extraPrice),
                        })
                    }),
                })
            }),
            currentPage: page,
            totalPages: totalPages,
            count: count,
        }

    } catch (error) {
        return {
            products: [],
            currentPage: 1,
            totalPages: 1,
            count: 0,
        }
    }
}