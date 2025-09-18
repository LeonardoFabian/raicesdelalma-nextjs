"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product as ProductUI } from "@/interfaces";
// import { Product } from "@prisma/client";
import { AddToWishlist } from "./AddToWishlist";
// import { MdOutlineShoppingBag, MdIosShare } from "react-icons/md";
import { ShareMenu } from "../layout/menus/ShareMenu";
import { AddToCart } from "./AddToCart";
// import { addToShoppingCartCookie } from "@/shopping-cart/actions/actions";
import { Rating } from "./Rating";
import { ProductImage } from "./product-image/ProductImage";
import { PRODUCT_BASE_URL } from "@/constants/urls";
// import { useRouter } from "next/navigation";

interface Props {
  product: ProductUI;
}

export const ProductCard = ({ product }: Props) => {
  // console.log({ product });

  const [displayImage, setDisplayImage] = useState(product.images[0]?.url);

  const { id, title, images, price, rating, slug } = product;

  // const router = useRouter();

  // const onAddToCart = () => {
  //   addToShoppingCartCookie(id);
  //   router.refresh();
  // };

  const productShareUrl = `${PRODUCT_BASE_URL}/${product.slug}`;

  return (
    <div className="mx-auto right-0 mt-2 w-full  bg-white flex flex-col justify-between rounded-lg shadow-sm fade-in">
      <div className="block relative h-40 w-full overflow-hidden bg-gray-100">
        <Link
          href={`/product/${product.slug}` || "#"}
          className="flex items-center justify-center h-40 bg-gray-100"
        >
          <ProductImage
            className="rounded object-cover transition-all duration-300 w-full h-full"
            // src={product.image}
            src={displayImage}
            alt={product.title}
            width={350}
            height={250}
            onMouseEnter={() => setDisplayImage(product.images[1].url)}
            onMouseLeave={() => setDisplayImage(product.images[0].url)}
          />
        </Link>
        <span className="absolute bottom-1 right-2">
          <AddToWishlist product={product} size={20} />
        </span>
      </div>
      <div className="flex flex-col gap-3 justify-between pt-2 pb-3 px-2.5 h-40">
        <div className="min-h-18">
          <Link href={`/product/${product.slug}` || "#"}>
            <h5
              className="text-md font-semibold text-left tracking-tight text-text-primary dark:text-white"
              style={{ lineHeight: "1.2" }}
            >
              {product.title}
            </h5>
          </Link>
          {product.rating && <Rating rating={+product.rating} />}
          <p className="text-lg text-left font-bold text-text-primary dark:text-white mt-2">{`$${product.price}`}</p>
        </div>
        <div className="flex-1"></div>
        <div className="mt-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ShareMenu title={product.title} url={productShareUrl} />
            </div>
            {/* <AddToCart product={product} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
