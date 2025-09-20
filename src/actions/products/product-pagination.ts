'use server'

import prisma from "@/lib/prisma";
import { Category } from '@prisma/client';

interface Pagination {
    page?: number;
    take?: number;
    category?: Category;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 3, category }: Pagination) => {

    if ( isNaN( Number(page) ) ) page = 1;
    if ( page < 1 ) page = 1;

    try {
        // get all products
        const products = await prisma.product.findMany({
            take: take,
            skip: ( page - 1 ) * take,
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
            where: {
                categoryId: category?.id
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        // get total pages
        const count = await prisma.product.count({
            where: {
                categoryId: category?.id
            }
        });
        const totalPages = Math.ceil( count / take );

        // console.log('Products with images:', products);

        

        return {
            products: products.map( product => {

                const {price, discountPercentage, fulfillmentMode, images, productSizes, ...restProduct} = product;

                return ({
                    ...restProduct,
                    price: Number(price),
                    discountPercentage: Number(discountPercentage),
                    fulfillmentMode: fulfillmentMode.toString(),
                    images: images.map( image => ({
                        id: image.Id,
                        url: image.url
                    }) ),
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
        // throw new Error(`Error fetching paginated products: ${error}`);
        return {
            products: [],
            currentPage: 1,
            totalPages: 1,
            count: 0
        }
    }
}