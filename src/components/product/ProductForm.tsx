"use client";

import { ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
// import { Product } from "@prisma/client";
import { Category, ISize, Product as ProductUI, Media } from "@/interfaces";
// import * as productHelpers from '@/products/helpers';
import { FormGroup } from "@/components/forms";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  createOrUpdateProduct,
  deleteProductImageFromCloudinary,
} from "@/actions";
import { toast } from "react-toastify";
import { ProductImage } from "./product-image/ProductImage";
import { BackButton } from "@/components";

interface Props {
  product: Partial<ProductUI> & { images?: Media[] };
  sizes: ISize[];
  categories: Category[];
}

// const FulfillmentModes = ["PREMADE", "MAKE_TO_ORDER"];

interface FormInputs {
  title: string;
  slug: string;
  description: string | null;
  categoryId: string;
  price: string;
  discountPercentage: number;
  // productSizes: number[];
  // productSizes: IProductSize[];
  productSizes: { sizeId: number; extraPrice: string }[];
  fulfillmentMode: string;
  isConfigurable: boolean;
  isActive: boolean;

  // TODO: images
  images?: FileList;
}

export const ProductForm = ({ product, sizes, categories }: Props) => {
  // console.log(product, sizes, categories);

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isValid },
    getValues,
    setValue,
    watch,
  } = useForm<FormInputs>({
    defaultValues: {
      ...product,
      productSizes: product.productSizes?.map((ps) => ({
        // productId: ps.productId,
        sizeId: ps.sizeId,
        extraPrice: ps.extraPrice?.toString(),
        // stock: ps.stock,
        // size: ps.size,
      })),
      price: product.price ? product.price.toString() : "0",
      images: undefined,
    },
  });

  watch("productSizes");
  const isConfigurable = watch("isConfigurable");
  // watch("fulfillmentMode");
  // watch("discountPercentage");

  useEffect(() => {
    const newMode = isConfigurable ? "MAKE_TO_ORDER" : "PREMADE";
    setValue("fulfillmentMode", newMode);
  }, [isConfigurable, setValue]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    // if (!"number") {
    //   onChange?.(e);
    //   return;
    // }

    // Normaliza coma a punto y elimina todo lo que no sea dígitos o punto
    let next = e.currentTarget.value.replace(/,/g, ".").replace(/[^0-9.]/g, "");

    // Permite solo un punto decimal
    const firstDot = next.indexOf(".");
    if (firstDot !== -1) {
      // quita puntos extra manteniendo el primero
      next =
        next.slice(0, firstDot + 1) +
        next.slice(firstDot + 1).replace(/\./g, "");
    }

    // Evita empezar con punto: ".5" -> "0.5"
    if (next.startsWith(".")) next = "0" + next;

    // Refleja el valor normalizado en el input
    if (next !== e.currentTarget.value) {
      e.currentTarget.value = next;
    }

    // onChange?.(e);
  };

  // const onSizeChanged = (sizeId: number) => {
  //   const sizes = new Set(getValues("productSizes"));
  //   // console.log(sizes, sizeId);
  //   sizes.has(sizeId) ? sizes.delete(sizeId) : sizes.add(sizeId);

  //   setValue("productSizes", Array.from(sizes));
  // };

  const toggleSize = (size: ISize) => {
    const currentSizes = getValues("productSizes") || [];
    const selected = currentSizes?.some((ps) => ps.sizeId === size.id);

    if (selected) {
      // remove
      setValue(
        "productSizes",
        currentSizes.filter((fps) => fps.sizeId !== size.id)
      );
    } else {
      // add
      setValue("productSizes", [
        ...currentSizes,
        {
          sizeId: size.id,
          extraPrice: "",
        },
      ]);
    }
  };

  const updateExtraPrice = (sizeId: number, value: string) => {
    const currentSizes = getValues("productSizes").map((ps) =>
      ps.sizeId === sizeId ? { ...ps, extraPrice: value } : ps
    );

    setValue("productSizes", currentSizes);
  };

  const onSubmit = async (data: FormInputs) => {
    // console.log({ data });

    const isConfigurable = data.isConfigurable ? true : false;
    const isActive = data.isActive ? true : false;

    // javaScript FormData object
    const formData = new FormData();

    const { images, ...restData } = data;

    if (product.id) {
      formData.append("id", product.id ?? "");
    }
    formData.append("title", restData.title);
    formData.append("slug", restData.slug);
    formData.append("description", restData.description || "");
    formData.append("categoryId", restData.categoryId);
    formData.append("price", restData.price);
    formData.append(
      "discountPercentage",
      restData.discountPercentage.toString()
    );
    formData.append("productSizes", JSON.stringify(restData.productSizes));
    // formData.append("productSizes", restData.productSizes.toString());
    formData.append("isConfigurable", String(isConfigurable));
    formData.append("fulfillmentMode", restData.fulfillmentMode);
    formData.append("isActive", String(isActive));

    // console.log(images);

    // File {
    //   lastModified: 1597853272316
    //   lastModifiedDate: Wed Aug 19 2020 12:07:52 GMT-0400 (hora de Bolivia) {}
    //   name: "domo-MT2020-azul.png"
    //   size: 106349
    //   type: "image/png"
    //   webkitRelativePath: ""
    // }

    if (images) {
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createOrUpdateProduct(
      formData
    );

    if (!ok) {
      toast.error("Error updating product");
      return;
    }
    // console.log({ ok });

    router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full mx-auto">
      <div className="block lg:flex items-start justify-between gap-8">
        {/* left */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* <Input
            type="text"
            name="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> */}
          <div className="flex flex-col mb-2">
            <span>Title</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("title", { required: true })}
            />
          </div>

          <div className="flex flex-col mb-2">
            <span>Slug</span>
            <input
              type="text"
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("slug", { required: true })}
            />
          </div>

          {/* <Input
            type="text"
            name="slug"
            label="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
          /> */}
          {/* <TextArea
            name="description"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          /> */}

          <div className="flex flex-col mb-2">
            <span>Description</span>
            <textarea
              rows={5}
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              {...register("description", { required: true })}
            ></textarea>
          </div>

          <div className="relative z-0 w-full mb-5 group flex flex-col gap-1">
            <div className="flex flex-col mb-2">
              <span>Category</span>
              <select
                className="p-2 border border-gray-300 rounded-md bg-gray-100"
                {...register("categoryId", { required: true })}
              >
                <option value="">[ Select ]</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <FormGroup>
            {/* <Input
              name="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              label="Price"
            /> */}
            <div className="flex flex-col mb-2">
              <span>Price</span>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md bg-gray-100"
                onInput={handleInput}
                inputMode="decimal"
                pattern="^\d*(\.\d{0,2})?$"
                {...register("price", {
                  required: true,
                  validate: (value) =>
                    !isNaN(parseFloat(value)) && parseFloat(value) >= 0,
                })}
                // value={price}
                // onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            {/* <Input
              name="discountPercentage"
              type="number"
              value={discountPercentage}
              onChange={(e) => setDiscountPercentage(Number(e.target.value))}
              label="Discount Percentage (%)"
            /> */}
            <div className="flex flex-col mb-2">
              <span>Discount Percentage (%)</span>
              <input
                type="number"
                className="p-2 border border-gray-300 rounded-md bg-gray-100"
                {...register("discountPercentage", { required: false, min: 0 })}
              />
            </div>
          </FormGroup>

          <div className="flex flex-col mb-2">
            <label>
              <input
                type="checkbox"
                className="mr-2"
                {...register("isConfigurable")}
              />
              Is configurable
            </label>
            <span className="text-xs text-text-secondary">
              If checked, users can customize this product when ordering (MAKE
              TO ORDER)
            </span>
          </div>

          <div className="flex flex-col mb-2">
            <label>
              <input
                type="checkbox"
                className="mr-2"
                {...register("isActive")}
              />
              Is Active
            </label>
            <span className="text-xs text-text-secondary">
              If checked, the product will be available for sale.
            </span>
          </div>
        </div>

        {/* right */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div>
            <span>Size Options</span>
            <div className="flex flex-col mt-3">
              {sizes.map((size) => {
                const selected = getValues("productSizes")?.some(
                  (ps) => ps.sizeId === size.id
                );

                return (
                  <div
                    key={size.id}
                    className="flex items-center border-b border-gray-200 py-1"
                  >
                    <div
                      onClick={() => toggleSize(size)}
                      className={clsx(
                        "flex items-center justify-center w-10 h-10 mr-2 border rounded-md cursor-pointer",
                        {
                          "bg-primary text-white border-primary": selected,
                        }
                      )}
                    >
                      {size.label}
                    </div>

                    {selected && (
                      <input
                        type="text"
                        className="mt-1 p-1 border border-gray-300 rounded bg-gray-100"
                        placeholder="Extra Price"
                        onInput={handleInput}
                        inputMode="decimal"
                        pattern="^\d*(\.\d{0,2})?$"
                        value={
                          getValues("productSizes").find(
                            (ps) => ps.sizeId === size.id
                          )?.extraPrice ?? ""
                        }
                        onChange={(e) =>
                          updateExtraPrice(size.id, e.target.value)
                        }
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col mb-2">
            <span>Images</span>
            <input
              type="file"
              {...register("images", { required: false })}
              multiple
              className="p-2 border border-gray-300 rounded-md bg-gray-100"
              accept="image/png, image/jpeg, image/avif, image/webp, image/jfif"
            />
          </div>

          {/* images preview */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {product.images &&
              product.images.map((image) => (
                <div
                  key={image.id}
                  className="relative h-48 rounded bg-gray-200 overflow-hidden"
                >
                  <ProductImage
                    src={image.url}
                    alt="Product"
                    width={200}
                    height={192}
                    className="rounded shadow w-full"
                  />

                  <button
                    type="button"
                    className="btn-danger absolute bottom-0 right-0 left-0"
                    onClick={() =>
                      deleteProductImageFromCloudinary(image.id, image.url)
                    }
                    // onClick={() => console.log(image.id, image.url)}
                  >
                    Delete
                  </button>
                </div>
              ))}
          </div>
        </div>
        {/* end right */}
      </div>

      <div className="flex items-center justify-start gap-2 mt-4">
        {/* <BackButton /> */}
        <button type="submit" className="btn-primary ">
          Save
        </button>
      </div>

      {/* <UpdateProduct
        productId={product.id}
        product={updatedProduct}
        handleUpdateProduct={updateProduct}
      /> */}
    </form>
  );
};
