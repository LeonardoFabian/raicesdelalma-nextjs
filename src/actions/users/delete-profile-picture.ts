'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProfilePictureFromCloudinary = async ( imageUrl: string) => {
    const session = await auth();

    if (session?.user.role !== "admin") {
        return {
            ok: false,
            message: 'Unauthorized'
        }
    }

    if (!imageUrl.startsWith("http")) {
        return {
            ok: false,
            message: 'Cannot delete local image'
        }
    }

    const imageName = imageUrl.split("/").pop()!.split(".")[0] ?? '';

    try {
        await cloudinary.uploader.destroy( imageName );
        await prisma.user.update({
            where: {
                id: session.user.id
            },
            data: {
                image: null
            }
        });

        revalidatePath('/admin/account');
        revalidatePath('/admin/account/change-photo');
        revalidatePath('/admin/users');
        revalidatePath('/profile');

        return {
            ok: true,
            message: 'Image deleted successfully'
        }
    } catch (error) {
        return {
            ok: false,
            message: 'Something went wrong deleting image from cloudinary'
        }
    }
}