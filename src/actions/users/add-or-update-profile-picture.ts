'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const addOrUpdateProfilePicture = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'You are not authorized to access this resource'
        };
    }``

    const userId = session.user.id ? session.user.id : '';
    const imageFile = formData.get('image');

    try {
        const prismaTx = await prisma.$transaction( async (tx) => {
           
            if (imageFile) {
                // upload image to cloudinary
                const image = await uploadProfileImageToCloudinary(imageFile as File);

                if (!image) throw new Error('Error uploading image');

                // update user profile picture
                await tx.user.update({
                    where: { id: userId },
                    data: {
                        image
                    }
                });
            }

            return { ok: true };
        });

        revalidatePath('/admin/account');
        revalidatePath('/admin/account/change-photo');
        revalidatePath('/admin/users');
        revalidatePath('/profile');

        return {
            ok: true,
            message: 'Profile picture updated successfully',
        }
    } catch (error) {
        console.log(error);
        return { ok: false, message: 'Error updating profile picture' };
    }
}

export const uploadProfileImageToCloudinary = async ( image: File ) => {
    try {
        const uploadPromise = async (image: File) => {
            try {
                const buffer = await image.arrayBuffer();
                const base64Image = Buffer.from(buffer).toString('base64');

                return cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`).then(r => r.secure_url);
            } catch (error) {
                console.log(error);
                return null;
            }
        }

        const imageUrl = await uploadPromise(image);
        return imageUrl;
    } catch (error) {
        console.log(error);
        return null;
    }
}