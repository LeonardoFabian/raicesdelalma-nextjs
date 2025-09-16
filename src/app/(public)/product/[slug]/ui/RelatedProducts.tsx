import { ProductCard } from "@/components";
import { Product } from "@/interfaces";

interface Props {
  products: Product[];
}

export const RelatedProducts = ({ products }: Props) => {
  console.log({ products });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
