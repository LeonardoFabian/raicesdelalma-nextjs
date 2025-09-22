'use server';

import { z } from "zod";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth, signOut } from "@/auth.config";

const updateUserInfoSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.email().max(255),
});

export const updateUserInfo = async (formData: FormData) => {
    const session = await auth();

    if (!session?.user) {
        return {
            ok: false,
            message: 'You are not authenticated'
        };
    }

    const userId = session.user.id ? session.user.id : '';

    const data = Object.fromEntries(formData);
    const parsedUserData = updateUserInfoSchema.safeParse(data);

    if (!parsedUserData.success) {
        console.log(parsedUserData.error);
        return {
            ok: false,
            message: 'Invalid data'
        };
    }

    const { name, email } = parsedUserData.data;

    const emailExists = await prisma.user.findUnique({
        where: {
            email: email
        }
    });

    if (emailExists && emailExists.id !== userId) {
        return {
            ok: false,
            message: 'Email already exists'
        };
    }

    try {
        const prismaTx = await prisma.$transaction( async (tx) => {
            if (emailExists) {
                await tx.user.update({
                    where: { id: userId },
                    data: { name }
                });

                return { emailChanged: false };
            } else {
                await tx.user.update({
                    where: { id: userId },
                    data: { name, email }
                });

                return { emailChanged: true };

            }
        });

        revalidatePath('/');
        revalidatePath('/admin');
        revalidatePath('/admin/account');
        revalidatePath('/admin/account/change-photo');
        revalidatePath('/profile');
       
        return {
            ok: true,
            message: 'User info updated successfully',
            emailChanged: prismaTx?.emailChanged || false
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Failed to update user info',
            emailChanged: false
        };
    }
}