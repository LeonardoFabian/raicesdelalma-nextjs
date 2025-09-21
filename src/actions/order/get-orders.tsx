"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface OrdersPagination {
  page?: number;
  take?: number;
}

export const getOrders = async ({ page = 1, take = 12 }: OrdersPagination) => {
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
    const orders = await prisma.order.findMany({
      take: take,
      skip: (page - 1) * take,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        OrderAddress: true,
      },
    });

    const count = await prisma.order.count();

    const totalPages = Math.ceil(count / take);

    return {
      ok: true,
      orders: orders.map((order) => {
        const {
          OrderAddress,
          subTotal,
          shipping,
          tax,
          totalAmount,
          ...orderRest
        } = order;

        return {
          ...orderRest,
          subTotal: Number(order.subTotal),
          shipping: Number(order.shipping),
          tax: Number(order.tax),
          totalAmount: Number(order.totalAmount),
          OrderAddress: OrderAddress,
        };
      }),
      count: count,
      totalPages: totalPages,
      currentPage: page,
    };
  } catch (error) {
    console.log(error);

    return {
      orders: [],
      count: 0,
      totalPages: 0,
      currentPage: 1,
    };
  }
};
