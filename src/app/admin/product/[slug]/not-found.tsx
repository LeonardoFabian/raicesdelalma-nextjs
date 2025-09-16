import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Product Not Found",
  description: "The product you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center bg-purple-600">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        404
      </h1>
      <div className="bg-[#d3fad6] px-2 text-md rounded rotate-12 absolute text-purple-600 font-bold">
        Product Not Found
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-white group active:text-white focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#d3fad6] group-hover:translate-y-0 group-hover:translate-x-0 rounded-lg"></span>

          <span className="relative block px-8 py-3 bg-purple-600 border border-white text-white font-bold rounded-lg">
            <Link href="/admin/products">Return to Products</Link>
          </span>
        </div>
      </button>
    </main>
  );
}
