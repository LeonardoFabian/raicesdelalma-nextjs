'use server'

import type { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {
        const newAddress = await createOrReplaceAddress(address, userId);
        return {
            ok: true,
            address: newAddress
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Something went wrong creating address'
        };
    }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId
            }
        })

        const addressToStore = {
            userId: userId,
            address: address.address,
            address2: address.address2,
            city: address.city,
            firstName: address.firstName,
            lastName: address.lastName,
            phone: address.phone,
            postalCode: address.postalCode,
            countryId: address.country
        }

        if (!storedAddress) {
            const newAddress = await prisma.userAddress.create({
                data: addressToStore
            })

            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId
            },
            data: addressToStore
        });

        return updatedAddress;
        
    } catch (error) {
        console.log(error);
        throw new Error('Error creating or replacing address'); 
    }
}