import { PageHeader } from "@/src/components";
import { Product, ProductGrid, ProductsResponse } from "@/src/products";
import Image from "next/image";

export const metadata = {
    title: 'Shopping Cart',
    description: 'Shopping cart page',
}


export default async function CartPage() {

    return (
        <>
            <PageHeader title="Shopping Cart" />
            {/* { JSON.stringify( products ) } */}
            <div className="flex flex-col">

                <span>List of Products</span>

                <ProductGrid products={ [] } />

            </div>
        </>
    )
}