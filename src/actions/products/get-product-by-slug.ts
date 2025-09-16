'use server'

import prisma from "@/lib/prisma";

export const getProductBySlug = async ( slug: string ) => {
    try {
        const product = await prisma.product.findFirst({
            include: {
                images: {
                    select: {
                        Id: true,
                        url: true
                    }
                },
                productSizes: {
                    include: {
                        size: true
                    }
                },
                ProductOptionGroup: {
                    include: {
                        group: {
                            include: {
                                items: true
                            }
                        }
                    }
                },
                category: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            },
            where: {
                slug: slug,
            }
        });

        // console.log(product);

        if (!product) return null;

        const {images, productSizes, ProductOptionGroup, price, discountPercentage, ...restProduct} = product;

        return ({
                ...restProduct,
                price: Number(product.price),
                discountPercentage: Number(product.discountPercentage),
                images: product.images.map((image) => ({
                    id: image.Id,
                    url: image.url
                })),
                productSizes: product.productSizes.map((ps) => ({
                    productId: ps.productId,
                    sizeId: ps.sizeId,
                    label: ps.size.label,
                    extraPrice: ps.extraPrice ? Number(ps.extraPrice) : null,
                    stock: ps.stock ?? null,
                    sku: ps.sku ?? null,
                    size: ps.size
                })),
                optionGroups: product.ProductOptionGroup.map((pog) => ({
                    description: pog.group.description,
                    id: pog.group.id,
                    isRequired: pog.group.isRequired,
                    title: pog.group.title,
                    minSelect: pog.group.minSelect,
                    maxSelect: pog.group.maxSelect,
                    sortOrder: pog.group.sortOrder,
                    items: pog.group.items.map(item => ({
                        id: item.id,
                        name: item.name,
                        isActive: item.isActive,
                        description: item.description,
                        sortOrder: item.sortOrder,
                        accessoryId: item.accessoryId,
                        groupId: item.groupId,
                        imageUrl: item.imageUrl,
                        extraPrice: toNumberOrNull(item.extraPrice),
                        costOverride: toNumberOrNull(item.costOverride),
                        stockDeductQty: toNumberOrNull(item.stockDeductQty),
                    }))
                }))
            })
        
    } catch (error) {
        throw new Error(`Error fetching product by slug: ${error}`);
    }
}

function toNumberOrNull(val: any) {
    if (val === null || val === undefined ) return null;
    return typeof val === 'number' ? val : Number(val);
}