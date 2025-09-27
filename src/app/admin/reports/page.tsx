import Image from "next/image";
import { Avatar } from "@/components/admin";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { PageTitle } from "@/components";
import { auth } from "@/auth.config";
import { getOrders } from "@/actions";
import Head from "next/head";

export default async function ReportsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "admin") {
    redirect("/shop");
  }

  const { count: totalOrders } = await getOrders({ take: 100, page: 1 });

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="rda-admin-reports-page flex flex-col gap-4 w-full px-4 md:px-6 bg-gray-100">
        <PageTitle title="Reports" subtitle="Manage your business reports">
          {/* <AddNewProductButton /> */}
          {/* <DeleteInactiveProducts /> */}
        </PageTitle>

        <div className="flex flex-col gap-4">
          {/* Grid with some stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Sales</p>
              <p className="text-3xl font-body font-medium text-primary">
                $12,345
              </p>
            </div>

            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-body font-medium text-primary">
                {totalOrders}
              </p>
            </div>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-3xl font-body font-medium text-primary">12</p>
            </div>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-3xl font-body font-medium text-primary">
                $12,345
              </p>
            </div>
          </div>
          {/* End of stats grid */}

          {/* Recent orders table */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-body text-primary">Recent Orders</h2>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-3xl font-body text-primary">12</p>
            </div>
          </div>
          {/* End of recent orders table */}

          {/* Recent customers table */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-body text-primary">Recent Customers</h2>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Customers</p>
              <p className="text-3xl font-body text-primary">12</p>
            </div>
          </div>
          {/* End of recent customers table */}

          {/* Recent products table */}
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-body text-primary">Recent Products</h2>
            <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-3xl font-body text-primary">12</p>
            </div>
          </div>
          {/* End of recent products table */}
        </div>
      </div>
    </>
  );
}
