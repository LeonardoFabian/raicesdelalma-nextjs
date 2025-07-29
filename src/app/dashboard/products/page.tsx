import { Product, ProductGrid, ProductsResponse } from "@/src/products";
import Image from "next/image";


export const getProducts = async ( limit: number = 25, offset: number = 0 ): Promise<Product[]> => {
    const data: ProductsResponse = await fetch(`https://dummyjson.com/products?limit=${ limit }&skip=${ offset }`)
        .then( res => res.json() );

    const products = data.products.map( product => ({
        id: product.id,
        title: product.title,
        thumbnail: product.images[0],
        price: product.price,
        rating: product.rating || 0,
        link: `/dashboard/product/${ product.id }`
    }))

    // throw new Error('Error al obtener los productos');

    return products;
}


export default async function ProductsPage() {

    const products = await getProducts();

    return (
        <div>
            <h1>Products Page</h1>
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col">

                <span>Listado de Productos <small>Estatico</small></span>

                <ProductGrid products={ products } />

            </div>
        </div>
    )
}