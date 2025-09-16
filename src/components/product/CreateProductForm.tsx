// "use client";

// import { FormEvent, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { Product } from "@prisma/client";
// import * as productHelpers from "@/products/helpers";
// import * as categoryHelpers from "@/categories/helpers";
// import { createProduct } from "@/products/actions/product-actions";
// import { FileInput, FormGroup, Input, TextArea } from "@/components/forms";
// import { getCategories } from "@/categories/actions/category-actions";

// interface Props {
//   product: Product;
// }

// const categories = [
//   { id: 1, title: "Valentine's Day" },
//   { id: 2, title: "Birthday" },
//   { id: 3, title: "Mother's Day" },
//   { id: 4, title: "Father's Day" },
//   { id: 5, title: "Spring" },
//   { id: 6, title: "Wellness" },
//   { id: 7, title: "Specialty" },
//   { id: 8, title: "Gifts" },
// ];

// export const CreateProductForm = () => {
//   const [title, setTitle] = useState("");
//   const [slug, setSlug] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState("");
//   const [price, setPrice] = useState("");
//   const [discountPercentage, setDiscountPercentage] = useState("");
//   const [image, setImage] = useState("/uploads/default.jfif");

//   const router = useRouter();

//   // TODO: get all the categories from the database
//   // const categories = await categoryHelpers.getCategories();

//   const onSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (title.trim().length === 0) return;

//     const priceToString = price.toString();
//     const discountPercentageToString = discountPercentage.toString();

//     const data: Product = {
//       title,
//       slug,
//       description,
//       categoryId,
//       image: image,
//       price: priceToString,
//       discountPercentage: discountPercentageToString,
//       rating: "0",
//       // createdAt: new Date().toISOString(),
//       // updatedAt: new Date().toISOString(),
//       isActive: false,
//     };

//     // RestFul API creation method

//     // const product = await productHelpers.createProduct({
//     //   title,
//     //   slug,
//     //   description,
//     //   categoryId: Number(categoryId),
//     //   image,
//     //   price: priceToString,
//     //   discountPercentage: discountPercentageToString,
//     // });

//     // console.log({ product });

//     // Server action creation method

//     const product = createProduct(data);

//     setTitle("");
//     setSlug("");
//     setDescription("");
//     setCategoryId("0");
//     setPrice("");
//     setDiscountPercentage("");

//     // console.log("Form submitted");

//     router.push("/admin/products");
//   };

//   return (
//     <form onSubmit={onSubmit} className="w-full mx-auto">
//       <div className="block lg:flex items-start justify-between gap-8">
//         {/* left */}
//         <div className="w-full lg:w-1/2 flex flex-col gap-4">
//           <Input
//             type="text"
//             name="title"
//             label="Title"
//             value={title}
//             onChange={(e) => {
//               setTitle(e.target.value);
//               setSlug(e.target.value.replace(/\s+/g, "-").toLowerCase());
//             }}
//             required
//           />
//           <Input type="hidden" name="slug" value={slug} />
//           <TextArea
//             name="description"
//             label="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           {categories && categories.length > 0 && (
//             <div className="relative z-0 w-full mb-5 group flex flex-col gap-1">
//               <select
//                 name="categoryId"
//                 className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-primary focus:outline-none focus:ring-0 focus:border-primary peer"
//               >
//                 <option value="0">Select a category</option>
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.title}
//                   </option>
//                 ))}
//               </select>
//               <label
//                 htmlFor="categoryId"
//                 className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary peer-focus:dark:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//               >
//                 Category
//               </label>
//             </div>
//           )}
//           <FormGroup>
//             <Input
//               name="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               label="Price"
//             />
//             <Input
//               name="discountPercentage"
//               type="number"
//               value={discountPercentage}
//               onChange={(e) => setDiscountPercentage(e.target.value)}
//               label="Discount Percentage (%)"
//             />
//           </FormGroup>
//         </div>

//         {/* right */}
//         <div className="w-full lg:w-1/2">
//           <FileInput
//             name="image"
//             value={image}
//             onChange={(e) => setImage(e.target.value)}
//             label="Image"
//           />
//         </div>
//         {/* end right */}
//       </div>

//       <button
//         type="submit"
//         className="text-white hover:cursor-pointer bg-primary hover:bg-gold-pastel hover:text-primary focus:ring-4 focus:outline-none focus:ring-gold-pastel font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-accent dark:hover:bg-gold-pastel dark:focus:ring-gold-pastel"
//       >
//         Submit
//       </button>
//     </form>
//   );
// };
