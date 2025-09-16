"use client";

// import { Product } from "@prisma/client";
import { Product } from "@/interfaces/product.interface";

interface Props {
  productId: string;
  product: Product;
  handleUpdateProduct: (
    id: string,
    product: Product
  ) => Promise<Product | void>;
}

export const UpdateProduct = ({
  productId,
  product,
  handleUpdateProduct,
}: Props) => {
  return (
    <button
      type="submit"
      className="text-white bg-primary hover:bg-gold-pastel hover:text-primary focus:ring-4 focus:outline-none focus:ring-gold-pastel font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-accent dark:hover:bg-gold-pastel dark:focus:ring-gold-pastel"
      onClick={() => handleUpdateProduct(productId, product)}
    >
      Submit
    </button>
  );
};
