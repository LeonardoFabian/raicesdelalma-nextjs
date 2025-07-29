import { Product, ProductForm, ProductResponse } from "@/src/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";


interface Props {
    params: { id: string }
}

/**
 * This function is used to generate static parameters for the product page.
 * It fetches all available product ids and returns an object with the id as the key and the id as the value.
 * The function is called at build time and the result is used to generate static pages for each product.
 * @returns {Promise<Record<string, string | number>>} An object with the id as the key and the id as the value.
 */
export async function generateStaticParams() {
    const staticProducts = Array.from({ length: 24 }).map((_, i) => `${i + 1}` );

    return staticProducts.map( id => ({
        id: id
    }));
}

export async function generateMetadata({ params }: Props) : Promise<Metadata>{
    try {
        const { title, description } = await getProduct( params.id );

        return {
            title: `Product ${ title }`,
            description: description || 'Single product page'
        }
    } catch (error) {
        return {
            title: 'Product page',
            description: 'Single product page'
        }
    }
}

const getProduct  = async ( id: string ) : Promise<Product> => {
    try {
        const product: ProductResponse = await fetch(`https://dummyjson.com/products/${ id }`, { cache: 'force-cache' })
            .then( res => res.json() );

        return product;
    } catch (error) {
        notFound();
    }
}

export default async function ProductPage( { params }: Props  ) {

    console.log( params.id );

    const product = await getProduct( params.id );

    return (
        <div className="flex flex-col gap-12">
            <h1 className="text-xl font-bold">{ product.title }</h1>

            <ProductForm product={ product } />
        </div>
    )
}


