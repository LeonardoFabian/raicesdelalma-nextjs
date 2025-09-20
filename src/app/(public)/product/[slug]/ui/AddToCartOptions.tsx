"use client";

import { useEffect, useState } from "react";
import { QuantitySelector, AddToWishlist, ShareMenu } from "@/components";
import { SizeSelector } from "@/components/product/size-selector/SizeSelector";
import { Product } from "@/interfaces";
import type { ISize } from "@/interfaces";
import { fontBody } from "@/config/fonts";
import { MdOutlineShoppingBag } from "react-icons/md";
import clsx from "clsx";
import { useCartStore } from "@/store";
import { calcDiscountCents, currencyFormat, toCents } from "@/utils";
import { IoCloseOutline } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { IProductSize } from "@/interfaces/size.interface";
import { PRODUCT_BASE_URL } from "@/constants/urls";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  settings: any;
}

type Option = {
  id: string;
  name: string;
  extraPrice: number;
};

export const AddToCartOptions = ({ product, settings }: Props) => {
  const { data: session } = useSession();
  const addItemToCart = useCartStore((state) => state.addItemToCart);

  const productShareUrl = `${PRODUCT_BASE_URL}/${product.slug}`;

  const [unitPrice, setUnitPrice] = useState(product.price);
  const [size, setSize] = useState<IProductSize>();
  // const [size, setSize] = useState<ISize>();
  const [availableSizes, setAvailableSizes] = useState<ISize[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  //   const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [selectedOptionsByGroup, setSelectedOptionsByGroup] = useState<{
    [groupId: string]: Option[];
  }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // console.log({ product });

  const discountCents = calcDiscountCents(
    product.price,
    product?.discountPercentage
  );
  const productPriceWithDiscountCents = toCents(product.price) - discountCents;

  useEffect(() => {
    // setAvailableSizes(product.productSizes);

    useCartStore.setState({
      tax: {
        rate: settings.salesTaxRate,
        taxesApplyToShipping: settings.salesTaxesApplyToShipping,
      },
      shipping: {
        flatCents: settings.shippingFlatCents,
        freeOverCents: settings.shippingFreeOverCents,
      },
    });
  }, [settings]);

  useEffect(() => {
    const value = calculateProductUnitPrice();
    setUnitPrice(value);
  }, [size, selectedOptions]);

  const calculateProductUnitPrice = () => {
    // console.log({ product, selectedOptions, size });

    const productBasePriceCents = toCents(product.price);
    const sizeExtraPriceCents = size?.extraPrice ? toCents(size.extraPrice) : 0;
    const optionsExtraPriceCents = (selectedOptions ?? []).reduce(
      (total, option) => total + toCents(option.extraPrice),
      0
    );
    const discount = discountCents ?? 0;

    console.log({
      productBasePriceCents,
      sizeExtraPriceCents,
      discount,
      optionsExtraPriceCents,
    });

    const unit =
      productBasePriceCents +
      sizeExtraPriceCents +
      optionsExtraPriceCents -
      discount;
    return Math.max(unit, 0);
  };

  // handle option select
  // const handleOptionChange = (optionId: string, checked: boolean) => {
  //   setSelectedOptions((prev) =>
  //     checked ? [...prev, optionId] : prev.filter((id) => id !== optionId)
  //   );
  // };

  const handleOptionChange = (
    groupId: string,
    item: { id: string; name: string; extraPrice: number },
    checked: boolean,
    maxSelect: number
  ) => {
    // setSelectedOptions((prev) =>
    //   checked ? [...prev, item] : prev.filter((opt) => opt.id !== item.id)
    // );
    setSelectedOptionsByGroup((prev) => {
      const current = prev[groupId] || [];
      let updated;
      if (checked) {
        if (current.length < maxSelect) {
          updated = [...current, item];
        } else {
          updated = current; // dont add more if == maxSelect
        }
      } else {
        updated = current.filter((opt) => opt.id !== item.id);
      }
      return { ...prev, [groupId]: updated };
    });
  };

  const canAddToCart = (product.optionGroups || []).every((group) => {
    if (group.isRequired && group.minSelect > 0) {
      return (selectedOptionsByGroup[group.id]?.length || 0) >= group.minSelect;
    }
    return true;
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onAddToCart = () => {
    if (!session?.user) {
      redirect("/auth/login?returnTo=/product/" + product.slug);
    }

    setIsSubmitting(true);

    if (!size) {
      toast.error("Please select a product size");
      setIsSubmitting(false);
      return;
    }

    const discountCents = calcDiscountCents(
      product.price,
      product?.discountPercentage
    );

    const lineId = {
      productId: product.id,
      title: product.title,
      slug: product.slug,
      basePriceCents: toCents(product.price),
      discountCents: discountCents,
      quantity,
      image: product.images[0],
      // size: size.label,
      selectedSize: {
        id: size.sizeId,
        label: size?.size?.label,
        extraPriceCents: size.extraPrice ? toCents(size.extraPrice) : undefined,
        sku: size.sku ? size.sku : undefined,
        stock: size.stock || 0,
      },
      // options: [{ name: "Mocha", extraPriceCents: toCents("2.00") }],
      // options: product.optionGroups?.flatMap((group) =>
      //   group.items
      //     .filter((item) => selectedOptionsG.some((opt) => opt.id === item.id))
      //     .map((i) => ({
      //       id: i.id,
      //       name: i.name,
      //       extraPriceCents: toCents(Number(i.extraPrice)) || 0,
      //     }))
      // ),
      options: Object.values(selectedOptionsByGroup)
        .flat()
        .map((opt) => ({
          id: opt.id,
          name: opt.name,
          extraPriceCents: toCents(opt.extraPrice) || 0,
        })),
      weightGrams: product?.weightGrams ?? undefined,
    };

    addItemToCart(lineId);

    toast.success("Added to cart");

    // console.log({ lineId });

    setIsSubmitting(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          {product.discountPercentage && (
            <span className="text-2xl font-regular text-body text-primary">
              -{product.discountPercentage}%
            </span>
          )}
          {/* <span className="text-2xl font-bold text-body">
            {currencyFormat(productPriceWithDiscountCents)}
          </span> */}
          <span className="text-2xl font-bold text-body">
            {currencyFormat(unitPrice)}
          </span>
        </div>
        {product.discountPercentage && (
          <span className="text-sm text-text-secondary font-regular text-body ">
            Base price:{" "}
            <span className="line-through">
              {currencyFormat(toCents(product.price))}
            </span>
          </span>
        )}
      </div>

      {isSubmitting && !size && (
        <span className="bg-red-100 text-red-600 p-2 rounded fade-in">
          The product size is required
        </span>
      )}

      <SizeSelector
        selectedSize={size}
        availableSizes={product.productSizes}
        onSelectSize={setSize}
      />

      <div className="product-actions flex flex-col items-start gap-2">
        <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
        <div className="text-sm">
          {size ? (
            (size.stock ?? 0) > 0 ? (
              <p>
                In Stock: <strong>{size.stock}</strong>
              </p>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-start gap-3">
        {/* <AddToCart product={product} quantity={quantity} disabled={false} /> */}
        {product.isConfigurable &&
          product?.optionGroups &&
          product.optionGroups.length > 0 && (
            <button
              type="button"
              onClick={openModal}
              disabled={!size}
              className={clsx({
                "btn-secondary": size,
                "btn-disabled": !size,
              })}
            >
              Customize
            </button>
          )}
        <button
          type="button"
          onClick={onAddToCart}
          disabled={!size || !canAddToCart}
          className={clsx(
            "btn-primary whitespace-nowrap !flex items-center flex-nowrap gap-2",
            {
              "opacity-40 cursor-not-allowed": !size,
            }
          )}
        >
          <span className="inline-flex">
            <MdOutlineShoppingBag
              size={24}
              className="flex items-center justify-center"
            />
          </span>
          <span className={`${fontBody.className} inline-block`}>
            Add to Cart
          </span>
        </button>
      </div>

      <div className="flex items-center justify-start gap-3 mt-2">
        <ShareMenu title={product.title} url={productShareUrl} />
        <AddToWishlist productId={product.id} />
      </div>

      {isModalOpen && (
        <div className="fixed right-0 top-0 bottom-0 h-screen overflow-y-auto bg-white p-4 md:p-12 z-50 shadow-lg">
          <button
            onClick={closeModal}
            className="mb-4 cursor-pointer text-right"
          >
            <IoCloseOutline size={30} />
          </button>
          {product.isConfigurable &&
            product?.optionGroups &&
            product.optionGroups?.length > 0 && (
              <div className="flex flex-col gap-4 mb-4">
                <h4 className="font-bold">Customize your order:</h4>
                {product.optionGroups.map((group) => (
                  <div key={group.id} className="mb-2">
                    <span className="flex items-center gap-1">
                      <span className="font-bold text-primary">
                        {group.title}
                      </span>
                      {group.isRequired && (
                        <span className="text-red-600">*</span>
                      )}
                    </span>
                    <p className="text-text-secondary">{group.description}</p>
                    <div className="flex flex-col mt-1">
                      {group.items.map((item) => {
                        const selected = selectedOptionsByGroup[group.id] || [];
                        const isChecked = selected.some(
                          (opt) => opt.id === item.id
                        );
                        const isDisabled =
                          !isChecked && selected.length >= group.maxSelect;
                        return (
                          <label
                            key={item.id}
                            className="flex items-center border-t border-gray-300 gap-2 py-2"
                          >
                            <input
                              type="checkbox"
                              value={item.id}
                              checked={isChecked}
                              disabled={isDisabled}
                              // checked={selectedOptions.includes(item.id)}
                              onChange={
                                (e) =>
                                  handleOptionChange(
                                    group.id,
                                    {
                                      id: item.id,
                                      name: item.name,
                                      extraPrice: Number(item.extraPrice) || 0,
                                    },
                                    e.target.checked,
                                    group.maxSelect
                                  )
                                // handleOptionChange(item.id, e.target.checked)
                              }
                            />
                            <span className="flex flex-1 items-center justify-between gap-2">
                              {item.name}
                              {item.extraPrice && (
                                <span className="text-sm text-text-secondary ml-1">
                                  (+${Number(item.extraPrice)})
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                    {group.isRequired &&
                      group.minSelect > 0 &&
                      (selectedOptionsByGroup[group.id]?.length || 0) <
                        group.minSelect && (
                        <span className="fade-in text-red-600 text-xs">
                          You must select at least {group.minSelect} option(s).
                        </span>
                      )}
                  </div>
                ))}
              </div>
            )}
        </div>
      )}
    </>
  );
};
