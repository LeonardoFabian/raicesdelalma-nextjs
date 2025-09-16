'use server';

import prisma from "@/lib/prisma";
import { PayPalCheckoutOrderResponse } from "@/interfaces";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId?: string) => {
    if (!transactionId) {
        return {
            ok: false,
            message: 'Transaction ID not found'
        }
    }
    // console.log({ transactionId });

    const bearerToken = await getPayPalAccessToken();
    // console.log({ bearerToken });

    if (!bearerToken) {
        return {
            ok: false,
            message: 'Access token not found'
        }
    }

    const resp = await verifyPayPalPayment(transactionId, bearerToken);

    if (!resp) {
        return {
            ok: false,
            message: 'Payment verification failed'
        }
    }

    const { status, purchase_units, payer, create_time, update_time } = resp;
    const { amount, payee, shipping, payments, invoice_id: orderId } = purchase_units[0]; // TODO: Crate invoice ID

    // console.log({ status, purchase_units });

    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: 'PayPal Payment is not completed'
        }
    }

    // TODO: Update order status in DB
    try {
        const order = await prisma.order.update({
            where: { id: orderId },
            data: {
                status: 'paid',
                placedAt: new Date(),
            }
        });

        // TODO: revalidate path
        revalidatePath(`/orders/${orderId}`);

        return {
            ok: true
        }

    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'Something went wrong updating order status'
        }
    }
}


/**
 * Fetches an access token from PayPal using the client_id and client_secret.
 * Returns the access token string if successful, otherwise null.
 * @returns {Promise<string|null>}
 */
const getPayPalAccessToken = async (): Promise<string|null> => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET_KEY;
    const PAYPAL_OAUTH2_URL = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        "utf-8"
    ).toString('base64');

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("Authorization", `Basic ${base64Token}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "client_credentials");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
    };

    try {
        const result = await fetch(PAYPAL_OAUTH2_URL, {...requestOptions, cache: 'no-store'})
            .then(r => r.json());

        return result.access_token;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * Verifies the status of a PayPal payment given the transaction ID and a valid Bearer token.
 * Returns the PayPalCheckoutOrderResponse if the payment is completed, otherwise null.
 * @param {string} transactionId - The transaction ID of the payment to verify
 * @param {string} bearerToken - A valid PayPal Bearer token
 * @returns {Promise<PayPalCheckoutOrderResponse|null>}
 */
const verifyPayPalPayment = async (transactionId: string, bearerToken: string): Promise<PayPalCheckoutOrderResponse|null> => {

    const PAYPAL_ORDERS_URL = process.env.PAYPAL_ORDERS_URL;
    const PAYPAL_CHECKOUT_URL = `${PAYPAL_ORDERS_URL}/${transactionId}`;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${bearerToken}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
    };

    try {
        const result = await fetch(PAYPAL_CHECKOUT_URL, {...requestOptions, cache: 'no-store'}).then(r => r.json());
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }

}