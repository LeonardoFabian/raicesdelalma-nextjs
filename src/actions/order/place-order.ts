'use server';

import { auth } from "@/auth.config";
import type { Address, IGiftMessage, ISize } from "@/interfaces";
import type { CartOption, SelectedSize } from "@/lib/pricing";
import prisma from "@/lib/prisma";
import { calcDiscountCents, calcTaxCents, currencyFormat, toCents } from "@/utils";
import { getSettings } from "../settings/get-settings";

interface ProductsToOrder {
    productId: string;
    quantity: number;
    size: SelectedSize | undefined;
    options: CartOption[];
}

export const placeOrder = async (products: ProductsToOrder[], address: Address, giftMessage: IGiftMessage) => {
    const session = await auth();
    const userId = session?.user.id;

    if (!userId) {
        return {
            ok: false,
            message: "No user found"
        }
    }

    // console.log({ products, address, userId });

    // get products information, note you can take the same product id with distint options and size
    const storedProducts = await prisma.product.findMany({
        where: {
            id: {
                in: products.map( p => p.productId )
            }
        },
        include: {
            productSizes: {
                include: {
                    size: true
                }
            },
            ProductOptionGroup: {
                    include: {
                        group: {
                            include: {
                                items: true
                            }
                        }
                    }
                }
        }
        
    });
    // console.log(storedProducts);

    const settings = await getSettings();
    // console.log(settings);

    // calc total items
    const itemsInOrder = products.reduce((count, p) => count + p.quantity, 0);
    // console.log(itemsInOrder);

    // calc total, subtotal, tax, shipping 
    const subTotal = products.reduce((total, item) => {

        const productQty = item.quantity;
        const product = storedProducts.find(p => p.id === item.productId);
        if (!product) throw new Error(`Product not found`);

        // search stored size
        const selectedSize = product.productSizes.find(ps => ps.size.id === item.size?.id);
        const sizeExtraPriceCents = selectedSize && selectedSize.extraPrice ? toCents(Number(selectedSize.extraPrice)) : 0; // 699

        // search stored options
        const selectedOptions = [];
        for ( const opt of item.options) {
            const optionItem = product.ProductOptionGroup
                .flatMap(pg => pg.group.items) 
                .find(i => i.id === opt.id);

            if (optionItem) {
                selectedOptions.push({
                    id: optionItem.id,
                    name: optionItem.name,
                    extraPrice: optionItem.extraPrice ? toCents(Number(optionItem.extraPrice)) : 0
                });
            }
        }
        const optionsExtraPriceCents = selectedOptions.reduce((total, option) => total + option.extraPrice, 0);

        const basePriceCents = toCents(Number(product.price)); // 48.50 = 4850
        const discountCents = calcDiscountCents(Number(product.price), Number(product?.discountPercentage)); // 485       
        const unitPriceCents = basePriceCents + sizeExtraPriceCents + optionsExtraPriceCents - discountCents;

        return total + (unitPriceCents * productQty);       
        
    }, 0);

    // shipping info
        const shippingInput = {
            flatCents: settings?.shippingFlatCents ?? 0,
            freeOverCents: settings?.shippingFreeOverCents ?? 7500,
            // perGramCents: settings?. ?? 0
        }
        const shipping = subTotal >= shippingInput.freeOverCents ? 0 : shippingInput.flatCents; 
        
        // sales taxes info
        const taxInput = {
            rate: settings?.salesTaxRate ?? 0.1, // 0.1 (10%)
            taxesApplyToShipping: settings?.salesTaxesApplyToShipping ?? false
        };
        const taxBase = subTotal + (taxInput.taxesApplyToShipping ? shipping : 0);
        const tax = Math.round(taxBase * taxInput.rate);

        const totalAmount = subTotal + shipping + tax;

    // console.log({ totalAmount, subTotal, tax, shipping });

    try {

        // create the transaction
        const prismaTx = await prisma.$transaction(async (tx) => {
            // 1. update the stock 
            // const updatedProductsPromises = storedProducts.map( async (product) => {

            //     // accumulate the quantity of items by product
            //     const productQty = products
            //         .filter(p => p.productId === product.id)
            //         .reduce((acc, item) => acc + item.quantity, 0); 

            //     if (productQty === 0) {
            //         throw new Error(`Product ${product.id} has 0 items in the order`);
            //     }

            //     // search fulfillmentMode
            //     if (product.fulfillmentMode === "PREMADE") {
            //         // search the sizeId for this cart item
            //         const sizeId = products.find(p => p.productId === product.id)?.size?.id ?? 0;

            //         // search the stored productSize
            //         const productSize = product.productSizes.find(ps => ps.size.id === sizeId);
            //         if (!productSize) throw new Error(`Product size not found for product ${product.id} and size ${sizeId}`);

            //         // calculate the new stock 
            //         const newStock = (productSize.stock ?? 0) - productQty;
            //         if (newStock < 0) throw new Error(`Not enough stock for product ${product.id} and size ${sizeId}`);

            //         // update the stock
            //         return tx.productSize.update({
            //             where: {
            //                 productId_sizeId: {
            //                     productId: product.id,
            //                     sizeId: sizeId
            //                 }
            //             },
            //             data: {
            //                 stock: {
            //                     decrement: productQty
            //                 }
            //                 // stock: newStock
            //             }
            //         });

            //     }

            //     // Si es MAKE_TO_ORDER, descuenta accesorios según las opciones seleccionadas
            //     if (product.fulfillmentMode === "MAKE_TO_ORDER") {
            //         // search items by productId
            //         const cartItems = products.filter(p => p.productId === product.id); 

            //         for (const cartItem of cartItems) {
            //             for (const opt of cartItem.options) {
            //                 // search the stored productOptionGroup 
            //                 const optionItem = product.ProductOptionGroup
            //                     .flatMap(pog => pog.group.items)
            //                     .find(i => i.id === opt.id);

            //                 if (optionItem?.accessoryId && optionItem.stockDeductQty) {
            //                     // discount the stockDeductQty * cartItem.quantity of the accessory
            //                     await tx.accessory.update({
            //                         where: {
            //                             id: optionItem.accessoryId
            //                         },
            //                         data: {
            //                             stockQty: {
            //                                 decrement: Number(optionItem.stockDeductQty) * cartItem.quantity
            //                             }
            //                         }
            //                     })
            //                 }
            //             }
            //         }
            //     }
                
            //     // if the product is not PREMADE or MAKE_TO_ORDER, return null
            //     return null;
            // });

            const updatedProductsPromises = products.map(async (cartItem) => {
                const product = storedProducts.find(p => p.id === cartItem.productId);
                if (!product) throw new Error(`Product not found`);

                // PREMADE: descuenta stock de ProductSize
                if (product.fulfillmentMode === "PREMADE") {
                    const sizeId = cartItem.size?.id ?? 0;
                    const productSize = product.productSizes.find(ps => ps.size.id === sizeId);
                    if (!productSize) throw new Error(`Product size not found for product ${product.id} and size ${sizeId}`);

                    const newStock = (productSize.stock ?? 0) - cartItem.quantity;
                    if (newStock < 0) throw new Error(`Not enough stock for product ${product.id} and size ${sizeId}`);

                    const updatedProductSize = await tx.productSize.update({
                        where: {
                            productId_sizeId: {
                                productId: product.id,
                                sizeId: sizeId
                            }
                        },
                        data: {
                            stock: {
                                decrement: cartItem.quantity
                            }
                        }
                    });

                    return {
                        updatedProductSize: updatedProductSize
                    }
                }

               // MAKE_TO_ORDER: descuenta stock de accesorios según opciones
                if (product.fulfillmentMode === "MAKE_TO_ORDER") {
                    // Acumula los accesorios actualizados
                    const updatedAccessories = [];
                    for (const opt of cartItem.options) {
                        const optionItem = product.ProductOptionGroup
                            .flatMap(pog => pog.group.items)
                            .find(i => i.id === opt.id);

                        if (optionItem?.accessoryId && optionItem.stockDeductQty) {
                            // Consulta el accesorio actual
                            const accessory = await tx.accessory.findUnique({
                                where: { id: optionItem.accessoryId },
                                select: { stockQty: true }
                            });
                            const newAccessoryStock = (accessory?.stockQty ?? 0) - (Number(optionItem.stockDeductQty) * cartItem.quantity);
                            if (newAccessoryStock < 0) throw new Error(`Not enough stock for option: ${optionItem.name}`);

                            // Retorna el accesorio actualizado
                            const updatedAccessory = await tx.accessory.update({
                                where: { id: optionItem.accessoryId },
                                data: {
                                    stockQty: {
                                        decrement: Number(optionItem.stockDeductQty) * cartItem.quantity
                                    }
                                }
                            });
                            updatedAccessories.push(updatedAccessory);
                        }
                    }
                    return {
                        updatedAccessories: updatedAccessories
                    };
                }

                return null;
            });

            const updatedProducts = await Promise.all( updatedProductsPromises );

            // verify negative stock values
            // updatedProducts.forEach(product => {
            //     if (product && product.stock < 0 ) {
            //         throw new Error(`Not enough stock for this product and size}`);
            //     }
            // })

            // 2. create the order (header)
            const order = await tx.order.create({
                data: {
                    subTotal: (subTotal / 100).toString(),
                    shipping: (shipping / 100).toString(),
                    tax: tax / 100,
                    totalAmount: (totalAmount / 100).toString(),
                    totalItems: itemsInOrder,
                    userId: userId,

                    OrderItems: {
                        createMany: {
                            data: products.map(p => {

                                const product = storedProducts.find(product => product.id === p.productId);

                                if (!product) {
                                    throw new Error(`Product not found`);
                                }

                                // Busca el size real
                                const selectedSize = product.productSizes.find(ps => ps.size.id === p.size?.id);
                                const sizeExtraPriceCents = selectedSize && selectedSize.extraPrice ? toCents(Number(selectedSize.extraPrice)) : 0;

                                // Busca las opciones reales
                                const selectedOptions = [];
                                for (const opt of p.options) {
                                    const optionItem = product.ProductOptionGroup
                                    .flatMap(pg => pg.group.items)
                                    .find(i => i.id === opt.id);

                                    if (optionItem) {
                                    selectedOptions.push({
                                        id: optionItem.id,
                                        name: optionItem.name,
                                        extraPrice: optionItem.extraPrice ? toCents(Number(optionItem.extraPrice)) : 0
                                    });
                                    }
                                }
                                const optionsExtraPriceCents = selectedOptions.reduce((total, option) => total + option.extraPrice, 0);

                                const basePriceCents = toCents(Number(product.price));
                                const discountCents = calcDiscountCents(Number(product.price), Number(product?.discountPercentage));
                                const unitPriceCents = basePriceCents + sizeExtraPriceCents + optionsExtraPriceCents - discountCents;

                                return ({
                                    quantity: p.quantity,
                                    basePrice: (basePriceCents / 100).toString(),
                                    discount: (discountCents / 100).toString(),
                                    unitPrice: (unitPriceCents / 100).toString(),
                                    size: p.size?.label ? p.size.label : 'One Size',
                                    extraPrice: (sizeExtraPriceCents / 100).toString(),
                                    optionsExtraPrice: (optionsExtraPriceCents / 100).toString(),
                                    options: JSON.stringify(selectedOptions),
                                    productId: p.productId
                                    
                                })
                            })
                        }
                    }

                    

                }
            });

            // validate if price === 0


            // create the order shipping address 
            const { country, userId: orderUserId, ...restAddress } = address;
            const orderAddress = await tx.orderAddress.create({
                data: {
                    ...restAddress,
                    countryId: country,
                    orderId: order.id
                }
            });

            let orderGiftMessage;
            if (giftMessage?.message) {
                orderGiftMessage = await tx.giftMessage.create({
                    data: {
                        sender: giftMessage.sender!,
                        recipient: giftMessage.recipient!,
                        message: giftMessage.message,
                        orderId: order.id
                    }
                });
            }

            return {
                order: order,
                orderAddress: orderAddress,
                orderGiftMessage: orderGiftMessage,
                updatedProducts: updatedProducts
            }
        });

        return {
            ok: true,
            order: prismaTx.order,
            prismaTx: prismaTx,
        }
        
    } catch (error:any) {
        return {
            ok: false,
            message: error?.message
        }
    }

    
};

