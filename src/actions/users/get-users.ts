"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface UsersPagination {
  page?: number;
  take?: number;
}

export const getUsers = async ({ page = 1, take = 12 }: UsersPagination) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();
  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "You are not authorized to access this resource",
    };
  }

  try {
    // TODO: change Order to Orders
    const users = await prisma.user.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        id: "desc",
      },
      // include: {
      //   address: true,
      // },
    });

    const count = await prisma.user.count();

    const totalPages = Math.ceil(count / take);

    return {
      ok: true,
      users: users.map((user) => ({
        id: user.id,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        email: user.email,
        emailVerified: user.emailVerified,
      })),
      count: count,
      totalPages: totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Something went wrong fetching users",
    };
  }
};
