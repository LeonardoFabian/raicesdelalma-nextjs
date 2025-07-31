import { Product, ProductForm, ProductResponse } from "@/src/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MdAdd, MdOutlineRemove, MdAddShoppingCart, MdOutlineFavoriteBorder } from "react-icons/md";
import { H1 } from "@/src/components";


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
        <div className="product-pageflex flex-col gap-12 py-12 px-24">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="product-images flex flex-col items-center gap-4">
                    <Image src={product.thumbnail} alt={product.title} width={ 500 } height={ 500 } priority={false} />
                </div>
                <div className="product-info flex flex-col gap-4">
                    <H1>{product.title}</H1>
                    <small className="product-category text-text-secondary uppercase">{product.category}</small>
                    <p className="product-description">{product.description}</p>
                    <p className="product-price text-2xl text-text-primary"><strong>${product.price}</strong></p>
                    <div className="product-actions flex items-center space-x-6 mt-12">
                        <span className="flex items-center">
                            <button type="button" className="btn-decrement p-2 border border-gray-500"><MdOutlineRemove size={24} /></button>
                                <span className="product-quantity py-2 px-6 bg-gray-50">1</span>
                            <button type="button" className="btn-increment p-2 border border-gray-500"><MdAdd size={24} /></button>
                        </span>
                        <button type="button" className="btn-add-to-cart flex items-center gap-2 py-2 px-4 font-heading font-semibold border bg-primary border-primary text-white rounded-md" title="Add to Cart">
                            <MdAddShoppingCart size={24} /> Add to Cart
                        </button>
                        <button type="button" className="bg-white border border-gray-500 text-text-primary p-2 rounded-full" title="Add to Wishlist">
                            <MdOutlineFavoriteBorder size={24} />
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}


