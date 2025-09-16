"use client";

import { useState } from "react";
import { MdAdd, MdOutlineRemove } from "react-icons/md";
// import { useAppDispatch, useAppSelector } from "@/store/index-old";
// import {
//   decrementCartItem,
//   incrementCartItem,
//   initializeCart,
// } from "@/store/counter/counterSlice";
// import { getCount } from "../../shopping-cart/services/cart-service";
// import { Product } from "@prisma/client";
import { Product as ProductUI } from "@/interfaces";
// import { addToShoppingCartCookie } from "../../shopping-cart/actions/actions";
import { AddToCart } from "./AddToCart";
import { AddToWishlist } from "./AddToWishlist";

interface Props {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChanged }: Props) => {
  // const [count, setCount] = useState(quantity);

  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };

  // const onIncrement = () => {
  //   setCount(count + 1);
  // };

  // const onDecrement = () => {
  //   if (count > 1) setCount(count - 1);
  // };

  // const count = useAppSelector( state => state.counter.count );
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //     dispatch( initializeCart(value) );
  // }, [dispatch, value]);

  // useEffect(() => {
  //     getCount()
  //         .then( ({ count }) => dispatch( initializeCart( count ) ) );
  // }, [dispatch]);

  return (
    <div className="flex flex-col w-full md:flex-row md:items-center gap-6 md:gap-3">
      <span className="flex items-center">
        <button
          type="button"
          className="btn-decrement px-2 h-10 flex items-center border border-gray-500 transition-all duration-300 ease-in hover:bg-gold-pastel hover:cursor-pointer"
          onClick={() => onValueChanged(-1)}
          // onClick={() => dispatch( decrementCartItem() )}
        >
          <MdOutlineRemove size={24} />
        </button>
        <span className="product-quantity py-2 w-12 text-center bg-gray-200 border border-gray-200">
          {quantity}
        </span>
        <button
          type="button"
          className="btn-increment px-2 h-10 flex items-center border border-gray-500 transition-all duration-300 ease-in hover:bg-gold-pastel hover:cursor-pointer"
          onClick={() => onValueChanged(1)}
          // onClick={() => dispatch( incrementCartItem() )}
        >
          <MdAdd size={24} />
        </button>
      </span>
    </div>
  );
};
