'use server';

import prisma from "@/lib/prisma";

export const getSettings = async () => {
    const settings = await prisma.businessSettings.findFirst({
        where: { id: 'default' },
        include: {
            businessHours: true,
            socialLinks: true,
        }
    });

    if (!settings) return null;

    return settings;
}