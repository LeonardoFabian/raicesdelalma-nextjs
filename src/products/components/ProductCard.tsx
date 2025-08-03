
import React from 'react'
import Image from 'next/image'
import { Product } from '../interfaces/product'
import Link from 'next/link';
import { AddToWishlist } from './AddToWishlist';

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props ) => {

    const { id, title, thumbnail, price, rating, link } = product;

    return (
        <div className="mx-auto right-0 mt-2 w-full md:w-60 bg-white flex flex-col justify-between rounded-lg shadow-sm">
            <a href="#" className='block relative h-40 w-full overflow-hidden'>
                <Image className="p-4 w-full h-40 rounded-t-lg object-contain" src={ product.thumbnail } alt={ product.title } width={ 150 } height={ 100 } priority={false} />
            </a>
            <div className="flex flex-col flex-1 gap-4 justify-between py-4 px-2.5 h-full">
                <div className="min-h-18">
                     <Link href={ product.link || "#" }>
                        <h5 className="text-md font-semibold text-left tracking-tight text-text-primary dark:text-white" style={{  lineHeight: '1.2' }}>{ product.title }</h5>
                    </Link>
                    <div className="flex items-center mt-2">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                            {Array.from({ length: 5 }).map((_, i) => {

                                return (
                                    <svg key={i} className={`w-3 h-3 ${ i < product.rating ? 'text-yellow-300' : 'text-gray-300'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                                    </svg>
                                )
                            })}
                            
                        </div>
                        <span className="bg-blue-100 text-purple-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-purple-800 ms-3"> 
                            { product.rating }
                        </span>
                    </div>
                    <p className="text-lg text-left font-bold text-text-primary dark:text-white mt-2">{ `$${ product.price }` }</p>
                </div>
                
                    <div className='flex-1 mt-auto'>
                        <div className="flex items-center justify-between mt-auto">
                            <AddToWishlist product={ product } size={30} />
                            <Link href={ product.link || "#" } className="text-white bg-primary hover:bg-accent focus:ring-4 focus:outline-none focus:ring-accent font-heading font-medium rounded-lg text-sm px-2 py-2 text-center dark:bg-primary dark:hover:bg-accent dark:focus:ring-accent">Add to cart</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

