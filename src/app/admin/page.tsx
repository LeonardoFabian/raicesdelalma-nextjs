// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { auth } from "@/auth.config";

export default async function AdminPage() {
  // const session = await getServerSession(authOptions);
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "admin") {
    redirect("/shop");
  }

  return (
    <div className="flex flex-col gap-4 px-0 md:px-6">
      {/* <div className="flex items-center justify-between space-x-4">
        <h1 className="font-semibold text-2xl">Admin</h1>
      </div> */}

      {/* <ProductGrid products={ products } /> */}

      <div className="flex flex-col gap-1 w-full bg-primary text-white p-4 rounded-lg">
        <p>Welcome back!</p>
        <p className="text-3xl font-heading text-gold-pastel">
          {session.user?.name}
        </p>
      </div>
    </div>
  );
}
