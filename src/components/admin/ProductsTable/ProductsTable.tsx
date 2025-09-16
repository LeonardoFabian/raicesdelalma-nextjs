import { Product } from "@/interfaces";
import { TableHeading } from "./TableHeading/TableHeading";
import { TableData } from "./TableData/TableData";
import Link from "next/link";
import { currencyFormat, toCents } from "@/utils";
import clsx from "clsx";
import { ProductImage, Rating } from "@/components";
import { getCategoryById } from "@/actions";

interface Props {
  headings: string[];
  products: Product[];
}
export const ProductsTable = ({ headings, products = [] }: Props) => {
  // console.log({ products });

  return (
    <div className="relative overflow-x-scroll shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-text-primary dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {headings.map((heading) => (
              <TableHeading key={heading} heading={heading} />
            ))}
          </tr>
        </thead>
        <tbody>
          {products.map(async (product) => {
            const category = await getCategoryById(product.categoryId);

            return (
              <tr key={product.id}>
                <TableData>
                  <div className="flex items-center justify-center h-24 w-24 rounded overflow-hidden p-2 bg-gray-100">
                    <Link href={`/product/${product.slug}`}>
                      <ProductImage
                        src={product.images[0]?.url}
                        alt={product.title}
                        width={80}
                        height={80}
                        className="h-20 w-20 object-contain rounded"
                      />
                    </Link>
                  </div>
                </TableData>
                <TableData>
                  <Link
                    href={`/product/${product.slug}`}
                    className="font-bold hover:underline text-text-primary"
                  >
                    {product.title}
                  </Link>
                </TableData>
                <TableData>{category?.title}</TableData>
                <TableData>
                  <strong>{`${currencyFormat(
                    toCents(Number(product.price))
                  )}`}</strong>
                </TableData>
                <TableData>{`${Number(
                  product.discountPercentage
                )}%`}</TableData>
                <TableData>
                  {product.productSizes?.map((ps) => ps.size?.label).join(", ")}
                </TableData>
                <TableData>
                  {product.productSizes?.map((ps) => (
                    <span
                      key={ps.sizeId}
                      className="flex flex-col items-start justify-start"
                    >
                      <span>
                        <strong>{ps.size?.label}: </strong>{" "}
                        {ps.stock ?? 0 < 5 ? (
                          <span className="text-red-600">{ps.stock}</span>
                        ) : (
                          <span className="text-green-600">{ps.stock}</span>
                        )}
                      </span>
                    </span>
                  ))}
                </TableData>
                <TableData>
                  {product.productSizes?.map((ps) => (
                    <span
                      key={ps.sizeId}
                      className="flex flex-col items-start justify-start"
                    >
                      <span>
                        <strong>{ps.size?.label}: </strong>{" "}
                        {currencyFormat(toCents(Number(ps.extraPrice)))}
                      </span>
                    </span>
                  ))}
                </TableData>
                <TableData>
                  {product.rating && <Rating rating={product.rating} />}
                </TableData>
                <TableData>
                  {product.isActive ? (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
                      Inactive
                    </span>
                  )}
                </TableData>
                <TableData>
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="font-semibold text-link  hover:underline"
                  >
                    Edit
                  </Link>
                </TableData>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
