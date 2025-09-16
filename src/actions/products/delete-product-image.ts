'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImageFromCloudinary = async ( imageId: number, imageUrl: string) => {
    // console.log({ imageId, imageUrl });

    if(!imageUrl.startsWith("http")) {
        return {
            ok: false,
            message: 'Cannot delete local image'
        }
    
        
    };

    const imageName = imageUrl.split("/").pop()!.split(".")[0] ?? '';
    // console.log({ imageName });

    try {
        await cloudinary.uploader.destroy( imageName );
        const deletedImage = await prisma.media.delete({
            where: {
                Id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        revalidatePath(`/admin/products`);
        revalidatePath(`/admin/product/${deletedImage.product.slug}`);
        revalidatePath(`/product/${deletedImage.product.slug}`);


    } catch (error) {
        return {
            ok: false,
            message: 'Something went wrong deleting image from cloudinary'
        }
    }
}