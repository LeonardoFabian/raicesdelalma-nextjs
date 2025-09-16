import { NextResponse } from 'next/server';
import { calculateGrossReceiptsTax } from '@/actions';

/**
 * GET /api/grt/monthly
 *
 * Calculates the gross receipts tax for the current month
 *
 * @returns {object} Gross receipts tax data
 * @property {number} totalGross - Total gross receipts for the month
 * @property {number} taxDue - Total tax due for the month
 * @property {Date} period - The period for which the tax was calculated
 *
 * @throws {object} Error response if there was an error calculating the tax
 * @throws {number} 500
 */
export async function GET( request: Request ) {
    try {
        const grt = await calculateGrossReceiptsTax();
        return NextResponse.json(grt);
    } catch (error) {
        return NextResponse.json(
            {error: "Error calculating gross receipts tax"},
            {status: 500}
        )
    }
}