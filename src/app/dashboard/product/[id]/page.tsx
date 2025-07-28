import { Product, ProductForm, ProductResponse } from "@/src/products";
import { Metadata } from "next";


interface Props {
    params: { id: string }
}

export async function generateMetadata({ params }: Props) : Promise<Metadata>{

    const { title, description } = await getProduct( params.id );

    return {
        title: `Product ${ title }`,
        description: description || 'Single product page'
    }
}

const getProduct  = async ( id: string ) : Promise<Product> => {
    const product: ProductResponse = await fetch(`https://dummyjson.com/products/${ id }`, { cache: 'force-cache' })
        .then( res => res.json() );

    return product;
}

export default async function ProductPage( { params }: Props  ) {

    console.log( params.id );

    const product = await getProduct( params.id );

    return (
        <div>
            <h1>{ product.title }</h1>

            <ProductForm product={ product } />
        </div>
    )
}


