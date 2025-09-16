import { redirect } from "next/navigation";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { AdminNavbar, Sidebar, SideMenu } from "@/components";
import { auth } from "@/auth.config";
import { Footer } from "@/components/admin/layout/Footer";
import { getSettings } from "@/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  if (session?.user?.role !== "admin") {
    redirect("/shop");
  }

  const settings = await getSettings();

  if (!settings) return null;

  const user = session.user;

  return (
    <>
      <div className="bg-white overflow-y-scroll w-screen max-w-screen h-screen antialiased text-slate-300 selection:bg-blue-600 selection:text-white">
        <div className="flex">
          <Sidebar user={user} />

          <div className="text-slate-900 min-h-screen flex flex-col w-full overflow-x-auto transform transition-all duration-300 ease-in-out">
            {/* <TopMenu
              name={session.user?.name}
              email={session.user?.email}
              image={session.user?.image}
            />  */}
            <AdminNavbar user={user} />
            <div className="container px-6">
              {/* {JSON.stringify(session.user)} */}
              {children}
            </div>
            {settings && <Footer settings={settings} />}
          </div>
        </div>
      </div>
      <SideMenu />
    </>
  );
}
