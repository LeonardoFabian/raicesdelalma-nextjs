import { Category, Product } from "@/interfaces";
import clsx from "clsx";
import Link from "next/link";
import { ProductImage } from "../product/product-image/ProductImage";

interface Props {
  category?: Category;
  products: Product[];
}

export const ProductsGridCard = ({ category, products }: Props) => {
  if (products.length === 0) {
    return null;
  }

  const isSingle = products.length === 1;

  return (
    <div className="w-full bg-white p-4 flex flex-col items-start justify-between gap-4 rounded-md hover:shadow">
      {category && <h5 className="text-lg font-semibold">{category.title}</h5>}
      <div
        className={clsx(
          "w-full h-64 grid gap-4",
          isSingle ? "grid-cols-1" : "grid-cols-2"
        )}
      >
        {products.map((product) => (
          <div key={product.id} className="w-full h-full">
            <Link
              href={`/product/${product.slug}`}
              className="block w-full h-full"
            >
              <ProductImage
                alt={product.title}
                src={product.images[0]?.url}
                width={isSingle ? 250 : 100}
                height={isSingle ? 192 : 50}
                className={clsx(
                  "w-full object-cover rounded-md",
                  isSingle ? "h-64" : "h-32"
                )}
              />
            </Link>
          </div>
        ))}
      </div>
      {category && (
        <Link href={`/category/${category.slug}`} className="btn-link w-full">
          Ver más
        </Link>
      )}
    </div>
  );
};
