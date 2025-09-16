'use server';

import { PrismaClient } from '@prisma/client';
import { subMonths, startOfMonth, endOfMonth, format } from 'date-fns';

const prisma = new PrismaClient();

// GRT rate para Delaware (según categoría Retail/Wholesale)
const GRT_RATE = 0.00576;

export const calculateGrossReceiptsTax = async (date = new Date()) => {
  const startDate = startOfMonth(date);
  const endDate = endOfMonth(date);
  const period = format(startDate, 'yyyy-MM'); // Ej: "2025-09"

  // Sumar total bruto de órdenes confirmadas
  const { _sum } = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      status: {
        in: ['paid', 'shipped'], // o ajusta si usas otros estados válidos
      },
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });

  const totalGross = _sum.totalAmount || 0;
  const taxDue = Number(totalGross) * GRT_RATE;

  // Guarda o actualiza log
  const log = await prisma.grossReceiptsLog.upsert({
    where: { period },
    update: {
      totalGross,
      taxDue,
      updatedAt: new Date(),
    },
    create: {
      period,
      totalGross,
      taxDue,
      taxRate: GRT_RATE,
    },
  });

  return log;
};
