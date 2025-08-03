import React from 'react'
import { Product } from '../interfaces/product';
import { ProductCard } from './ProductCard';

interface Props {
    products: Product[];
}

export const ProductGrid = ({ products }: Props ) => {
    return (
        <div className="flex gap-2 flex-wrap items-start justify-start">
            {products.map((product) => (          
                <ProductCard key={product.id} product={product} />       
            ))}
        </div>
    )
}


