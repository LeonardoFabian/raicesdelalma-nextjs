// import React from "react";
import { Product as ProductUI } from "@/interfaces";
import { ProductCard } from "../../components/product/ProductCard";
// import { Product } from "@prisma/client";

interface Props {
  products: ProductUI[];
}

export const ProductGrid = ({ products }: Props) => {
  // console.log({ products });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
