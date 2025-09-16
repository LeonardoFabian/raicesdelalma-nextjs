'use server';

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { sleep } from "@/utils";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string|undefined, role: string ) => {

    const session = await auth();
    if (session?.user.role !== "admin") {
        return {
            ok: false,
            message: "You are not authorized to access this resource",
        };
    }

    // let newRole;
    // switch (role) {
    //     case "admin":
    //         newRole = 'admin';
    //         break;
    //     case "user":
    //         newRole = 'user';
    //         break;
    
    //     default:
    //         newRole = 'user';
    //         break;
    // }

    try {
        const newRole = role === 'admin' ? 'admin' : role === 'client' ? 'client' : role === 'vendor' ? 'vendor' : role === 'salesperson' ? 'salesperson' : role === 'salesrep' ? 'salesrep' : role === 'affiliate' ? 'affiliate' : role === 'distributor' ? 'distributor' : 'user';
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: newRole
            }
        });

        if (!user) {
            return {
                ok: false,
                message: 'User not found'
            }
        }

        // sleep(2);

        revalidatePath('/admin/users');

        return {
            ok: true
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Something went wrong updating user role'
        }
    }
}