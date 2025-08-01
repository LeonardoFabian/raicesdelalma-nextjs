import notFound from "@/src/app/not-found";
import type { Product, ProductsResponse, ProductResponse } from "@/src/products";

interface GetProductsProps {
    limit?: number;
    offset?: number;
    basePath?: string;
}

interface GetProductProps {
    id: string;
    basePath?: string;
}

/**
 * Fetches a list of products from the dummyjson.com API, and returns them formatted
 * as {@link Product}s.
 *
 * @param {Props} props - Options for the API request.
 * @returns {Promise<Product[]>} A promise that resolves to an array of {@link Product}s.
 */
export const getProducts = async ({ limit, offset, basePath }: GetProductsProps ): Promise<Product[]> => {
    const data: ProductsResponse = await fetch(`https://dummyjson.com/products?limit=${ limit }&skip=${ offset }`)
        .then( res => res.json() );

    const products = data.products.map( product => ({
        id: product.id,
        title: product.title,
        thumbnail: product.images[0],
        price: product.price,
        rating: product.rating || 0,
        link: `${ basePath ?? 'product' }/${ product.id }`
    }))

    // throw new Error('Error al obtener los productos');

    return products;
}

export const getProduct  = async ( id: string ) : Promise<Product> => {
    try {
        const product: ProductResponse = await fetch(`https://dummyjson.com/products/${ id }`, { cache: 'force-cache' })
            .then( res => res.json() );

        return product;
    } catch (error) {
        notFound();
        throw new Error("Product not found"); // Ensure function never returns undefined
    }
}