// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";
import { PageTitle } from "@/components";
import { AddNewProductButton } from "./products/ui/AddNewProductButton";
import { getOrders, getPaginatedProductsWithImages } from "@/actions";
import {
  MdOutlineDiscount,
  MdOutlineShoppingBag,
  MdOutlineStore,
} from "react-icons/md";
import { TbCashRegister } from "react-icons/tb";
import { PiResize } from "react-icons/pi";
import { LiaUsersCogSolid } from "react-icons/lia";
import { FaDolly, FaRegChartBar } from "react-icons/fa";
import { TbReceiptTax } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import Link from "next/link";

export default async function AdminPage() {
  // const session = await getServerSession(authOptions);
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "admin") {
    redirect("/shop");
  }

  const { count: totalProducts } = await getPaginatedProductsWithImages({
    take: 100,
    page: 1,
  });

  const { count: totalOrders } = await getOrders({ take: 100, page: 1 });

  return (
    <div className="flex flex-col gap-4 w-full px-0 md:px-6">
      <PageTitle
        title="Dashboard"
        subtitle="Manage key e-commerce operations, including product inventory, categories, orders, and store policies."
      >
        {/* <AddNewProductButton /> */}
        {/* <DeleteInactiveProducts /> */}
      </PageTitle>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1 w-full bg-primary text-white p-4 rounded-lg">
          <p>Welcome back!</p>
          <p className="text-3xl font-heading text-gold-pastel">
            {session.user?.name}
          </p>
        </div>

        {/* Grid with some stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 flex flex-col gap-4">
            {/* card */}
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <MdOutlineStore className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">Manage Products</p>
                <p className="text-text-secondary">
                  Create, update, and organize your product listings to keep
                  your inventory fresh and appealing.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin/product/new"
                    className="bg-primary text-white flex items-center gap-1 px-2 py-1 rounded-lg"
                  >
                    Add New
                  </Link>
                  <Link
                    href="/admin/products"
                    className="bg-white text-primary flex items-center gap-1 px-2 py-1 rounded-lg"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>

            {/* card */}
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <TbCashRegister className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">
                  Manage Purchases
                </p>
                <p className="text-text-secondary">
                  Record and track purchases of accessories or materials for
                  make-to-order products.
                </p>
                <div className="flex items-center gap-3">
                  <Link
                    href="/admin/product/new"
                    className="bg-primary text-white flex items-center gap-1 px-2 py-1 rounded-lg"
                  >
                    Record New
                  </Link>
                  <Link
                    href="/admin/products"
                    className="bg-white text-primary flex items-center gap-1 px-2 py-1 rounded-lg"
                  >
                    Manage Inventory
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-2">
            {/* card */}
            <div className="flex flex-col gap-3 bg-white p-3 rounded-lg shadow">
              <div className="flex items-start gap-3">
                <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                  <MdOutlineShoppingBag className="w-8 h-8 text-primary" />
                </span>
                <div className="flex flex-col gap-3 text-sm font-body">
                  <p className="text-text-primary font-medium">Recent Orders</p>
                  <p className="text-text-secondary">
                    Overview of the most recent orders placed in your store.
                  </p>
                </div>
              </div>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left table-auto">
                  <thead>
                    <tr className="text-sm text-text-secondary border-b border-gray-200">
                      <th className="py-2 px-3">Order ID</th>
                      <th className="py-2 px-3">Name</th>
                      <th className="py-2 px-3">Date</th>
                      <th className="py-2 px-3">Status</th>
                      <th className="py-2 px-3">Options</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-sm text-text-secondary border-b border-gray-200">
                      <td className="py-2 px-3">123456789</td>
                      <td className="py-2 px-3">John Doe</td>
                      <td className="py-2 px-3">2022-01-01</td>
                      <td className="py-2 px-3">Pending</td>
                      <td className="py-2 px-3">View Order</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/admin/orders"
                  className="bg-white text-primary flex items-center gap-1 px-2 py-1 rounded-lg"
                >
                  View All Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End of stats grid */}

        <h3 className="text-text-primary font-medium">Other Quick Actions</h3>

        {/* Recent orders table */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* card */}
          <Link href="/admin/settings">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <SlSettings className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">
                  Manage Store Settings
                </p>
                <p className="text-text-secondary">
                  Configure store settings, payment methods, and shipping
                  options.
                </p>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link href="#">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <MdOutlineDiscount className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">
                  Manage Categories
                </p>
                <p className="text-text-secondary">
                  Create, update, and organize your product categories.
                </p>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link href="#">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <PiResize className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">Manage Sizes</p>
                <p className="text-text-secondary">
                  Create, update, and organize your product sizes.
                </p>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link href="/admin/users">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <LiaUsersCogSolid className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">
                  Manage Users and Roles
                </p>
                <p className="text-text-secondary">
                  List and manage users, assign roles, and set permissions.
                </p>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link href="#">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <FaDolly className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">
                  Manage Suppliers
                </p>
                <p className="text-text-secondary">
                  Create and manage suppliers for your products.
                </p>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link href="#">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <TbReceiptTax className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">Manage Taxes</p>
                <p className="text-text-secondary">
                  List and generate tax reports for your store.
                </p>
              </div>
            </div>
          </Link>

          {/* card */}
          <Link href="#">
            <div className="flex items-start gap-3 bg-white p-3 rounded-lg shadow cursor-pointer hover:shadow-lg transition-shadow">
              <span className="h-12 w-12 min-w-12 flex items-center justify-center bg-primary/10 rounded-lg">
                <FaRegChartBar className="w-8 h-8 text-primary" />
              </span>
              <div className="flex flex-col gap-3 text-sm font-body">
                <p className="text-text-primary font-medium">Manage Reports</p>
                <p className="text-text-secondary">
                  View sales, inventory, and customer reports to track store
                  performance.
                </p>
              </div>
            </div>
          </Link>
        </div>
        {/* End of recent orders table */}
      </div>
    </div>
  );
}
