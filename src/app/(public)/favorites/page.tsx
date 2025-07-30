import { Product, ProductGrid, ProductsResponse } from "@/src/products";
import Image from "next/image";

export const metadata = {
    title: 'Favorites',
    description: 'List of favorite products',
}


export default async function FavoritesPage() {

    return (
        <div>
            <h1>Products Page</h1>
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col">

                <span>Favorite Products</span>

                <ProductGrid products={ [] } />

            </div>
        </div>
    )
}