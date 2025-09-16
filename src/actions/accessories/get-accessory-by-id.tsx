"use server";

import prisma from "@/lib/prisma";

export const getAccessoryById = async (id: string) => {
  try {
    const accessory = await prisma.accessory.findUnique({
      where: {
        id: id,
      },
    });

    if (!accessory) return null;

    return accessory;
  } catch (error) {
    throw new Error(`Error fetching accessory by id: ${error}`);
  }
};
