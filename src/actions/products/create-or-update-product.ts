'use server';

// import { Role } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { Product, ProductSize } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { auth } from "@/auth.config";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');


const productSchema = z.object({
    id: z.uuid().optional().nullable(),
    title: z.string().min(3).max(255),
    slug: z.string().min(3).max(255),
    description: z.string(),
    price: z.coerce.number().min(0).transform((value) => Number(value.toFixed(2))),
    discountPercentage: z.coerce.number().min(0).max(100).default(0),
    categoryId: z.uuid(),
    // productSizes: z.coerce.string().transform((value) => value.split(',')),
    productSizes: z.string()
        .transform((value) => JSON.parse(value) as { sizeId: number; extraPrice: string, stock: number }[])
        .refine((sizes) => Array.isArray(sizes), {
            message: "productSizes must be an array"
        }),
    isConfigurable: z.union([z.string(), z.boolean()])
        .transform((value) => (typeof value === 'string' ? value === 'true' : value)),
    fulfillmentMode: z.enum(['PREMADE', 'MAKE_TO_ORDER']).default('PREMADE'),
    // sizes: z.array(z.number()).min(1),
    // isActive: z.boolean().default(true),
    // role: z.enum(Role),
})

export const createOrUpdateProduct = async (formData: FormData) => {
    // console.log(formData);

    const session = await auth();
    if (session?.user.role !== "admin") {
        return {
            ok: false,
            message: 'You are not authorized to access this resource'
        };
    }

    const userId = session.user.id ? session.user.id : '';

    const data = Object.fromEntries(formData);
    const productParsed = productSchema.safeParse( data ); 

    if ( !productParsed.success ) {
        console.log(productParsed.error);
        return {
            ok: false
        }
    } 

    // console.log(productParsed.data);

    // return;

    const productData = productParsed.data; 
    productData.slug = productData.slug.toLowerCase().replace(/ /g, '-').trim();
    
    const { id, productSizes, ...restProduct } = productData;

    // console.log({productSizes})

    const productSizeData: ProductSize[] = productSizes.map(({sizeId, extraPrice}) => ({
        productId: id ?? "",
        sizeId,
        extraPrice: extraPrice ? new Decimal(extraPrice) : null,
        stock: 0, // TODO manage stock
        sku: `SKU-${sizeId}-${Date.now()}`,
    }))

    // console.log({productSizeData});

    // return;

    try {
        const prismaTx = await prisma.$transaction( async (tx) => {

        let product: Product;

        if (id) {
            // update product
            product = await tx.product.update({
                where: { id, userId },
                data: {
                    ...restProduct,
                    productSizes: {
                        update: productSizes.map((size) => ({
                            where: {
                                productId_sizeId: {
                                    productId: id,
                                    sizeId: size.sizeId
                                }
                            },
                            data: {
                                extraPrice: size.extraPrice ? new Decimal(size.extraPrice) : null,
                                stock: size.stock,
                                sku: `SKU-${size.sizeId}-${Date.now()}`,
                            }
                        })),
                        // deleteMany: {}, // delete previous sizes
                        // create: productSizeData
                        // set: restProduct.productSizes as ProductSize[]
                    }
                }
            })

            // console.log({ updatedProduct: product });

            // return {
            //     product
            // }
        } else {
            // create product
            product = await tx.product.create({
                data: {
                    title: restProduct.title,
                    slug: restProduct.slug,
                    description: restProduct.description ?? "",
                    price: new Decimal(restProduct.price),
                    discountPercentage: restProduct.discountPercentage,
                    categoryId: restProduct.categoryId,           
                    isConfigurable: restProduct.isConfigurable,     
                    fulfillmentMode: restProduct.fulfillmentMode,   
                    userId: userId,
                }
            });

            const createdProductSizes = await tx.productSize.createMany({
                data: productSizeData.map((size) => ({
                    productId: product.id,
                    sizeId: size.sizeId,
                    extraPrice: size.extraPrice ? new Decimal(size.extraPrice) : null,
                    stock: size.stock,
                    sku: size.sku,
                }))
            })

            // console.log({ createdProduct: product, createdProductSizes });

            // return {
            //     product,
            //     createdProductSizes
            // }
        }

        // load and save images
        if (formData.getAll('images')) {
            // console.log(formData.getAll('images'));
            // File {
            //     size: 106349,
            //     type: 'image/png',
            //     name: 'domo-MT2020-azul.png',
            //     lastModified: 1757958815863
            // },

            // get images urls
            const images = await uploadImagesToCloudinary(formData.getAll('images') as File[]);
            // console.log(images);

            if (!images) {
                throw new Error('Something went wrong uploading images');
            }

            await prisma.media.createMany({
                data: images.map((image) => ({
                    url: image!,
                    productId: product.id
                }))
            });
        }

        return {
            product
        }
    });

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${prismaTx.product.slug}`);
    revalidatePath(`/product/${prismaTx.product.slug}`);

    return {
            ok: true,
            product: prismaTx.product
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Something went wrong creating or updating product'
        }
    }

    

    // TODO revalidatePaths

    return {
        ok: true
    }
}

const uploadImagesToCloudinary = async ( images: File[]) => {

    try {
        const uploadPromises = images.map( async (image) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`)
                    .then(r => r.secure_url);
            } catch (error) {
                console.log(error);
                return null;
            }
        })

        const uploadedImages = await Promise.all(uploadPromises);

        return uploadedImages; // return array of image urls
    } catch (error) {
        console.log(error);
        return null;
    }

}