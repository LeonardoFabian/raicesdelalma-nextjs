'use server';

import prisma from "@/lib/prisma";

interface Pagination {
    take?: number;
}

export const getFeaturedProducts = async ({ take = 5 }: Pagination) => {
    try {
        const products = await prisma.product.findMany({
            take: take,
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
            },
            orderBy: {
                rating: 'desc'
            }
        });
        
        return {
            featuredProducts: products.map( product => {

                const {price, discountPercentage, fulfillmentMode, ...restProduct} = product;

                return ({
                    ...restProduct,
                    price: Number(price),
                    discountPercentage: Number(discountPercentage),
                    fulfillmentMode: fulfillmentMode.toString(),
                    images: product.images.map( image => ({
                        id: image.Id,
                        url: image.url
                    }) ),
                    productSizes: product.productSizes.map( productSize => {
                        const {size, extraPrice, ...restProductSize} = productSize;

                        return ({
                        ...restProductSize,
                        label: productSize.size.label,
                        extraPrice: Number(productSize.extraPrice),
                    })
                    } ),
                })
            }),
        }
    } catch (error) {
        console.log(error);
        return {
            featuredProducts: [],
        };
    }
}