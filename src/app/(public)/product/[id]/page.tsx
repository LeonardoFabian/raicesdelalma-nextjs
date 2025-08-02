
import { AddToWishlist, Product, ProductResponse } from "@/src/products";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MdAddShoppingCart, MdOutlineFavorite, MdOutlineFavoriteBorder, } from "react-icons/md";
import { H1 } from "@/src/components";
import { CartCounter } from "@/src/shopping-cart/components/CartCounter";
import { getProduct } from "@/src/products";


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

const PublicProductPage = async ({ params }: Props  ): Promise<JSX.Element> => {

    // console.log( params.id );

    const product = await getProduct( params.id );

    return (
        <div className="product-pageflex flex-col gap-12 py-12 px-6 md:px-24">
            <div className="grid md:grid-cols-2 gap-12">
                <div className="product-images flex flex-col items-center gap-4">
                    <Image src={product.thumbnail} alt={product.title} width={ 500 } height={ 450 } priority={false} />
                </div>
                <div className="product-info flex flex-col gap-4">
                    <H1>{product.title}</H1>
                    <small className="product-category text-text-secondary uppercase">{product.category}</small>
                    <p className="product-price text-2xl text-text-primary"><strong>${product.price}</strong></p>
                    <div className="product-actions flex items-center justify-between md:justify-start space-x-4 py-8">
                        <CartCounter value={0} />
                        <button type="button" className="btn-add-to-cart flex items-center whitespace-nowrap gap-2 py-2 px-4 font-heading font-semibold border bg-primary border-primary text-white rounded-md" title="Add to Cart">
                            <MdAddShoppingCart size={24} /> Add to Cart
                        </button>
                        <AddToWishlist product={ product } />
                    </div>
                    <h5 className="text-lg"><strong>Description</strong></h5>
                    <p className="product-description">{product.description}</p>
                </div>
            </div>
        </div>
    )
}


export default PublicProductPage;