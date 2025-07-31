'use client';

import { Product } from "../interfaces/product";
import { ProductsResponse } from "../interfaces/products-response";
import { ProductGrid } from "./ProductGrid";

export const getProducts = async ( limit: number = 25, offset: number = 0 ): Promise<Product[]> => {
    const data: ProductsResponse = await fetch(`https://dummyjson.com/products?limit=${ limit }&skip=${ offset }`)
        .then( res => res.json() );

    const products = data.products.map( product => ({
        id: product.id,
        title: product.title,
        thumbnail: product.images[0],
        price: product.price,
        rating: product.rating || 0,
        link: `/product/${ product.id }`
    }))

    // throw new Error('Error al obtener los productos');

    return products;
}


export default async function ShopProductList() {

    const products = await getProducts(20, 0);

    return (
        <>
            <ProductGrid products={ products } />            
        </>
    )
}
