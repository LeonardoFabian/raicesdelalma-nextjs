import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/logo-header-dark.svg"
import { MdOutlineDashboard, MdOutlineStore, MdOutlineShoppingBag, MdOutlineSettings, MdInsertChartOutlined } from "react-icons/md"
import { SidebarMenuItem } from "./SidebarMenuItem"

interface Props {
    path: string;
    label: string;
    description?: string;
    icon: JSX.Element;
}

const menuItems: Props[] = [
    {
        path: "/dashboard",
        label: "Dashboard",
        description: "View your dashboard",
        icon: <MdOutlineDashboard className="w-6 h-6" />
    },
    {
        path: "/dashboard/products",
        label: "Products",
        description: "View your products",
        icon: <MdOutlineStore className="w-6 h-6" />
    },
    {
        path: "/dashboard/orders",
        label: "Orders",
        description: "View your orders",
        icon: <MdOutlineShoppingBag className="w-6 h-6" />
    },
    {
        path: "/dashboard/reports",
        label: "Reports",
        description: "View your reports",
        icon: <MdInsertChartOutlined className="w-6 h-6" />
    },
    {
        path: "/dashboard/settings",
        label: "Settings",
        description: "View your settings",
        icon: <MdOutlineSettings className="w-6 h-6" />
    }
]

export const Sidebar = () => {
    return (
         <div id="menu" style={{  width: '350px' }} className="bg-gray-900 min-h-screen z-10 text-slate-300 w-64 left-0 h-screen overflow-y-scroll">
            <div id="logo" className="my-4 px-6">
                <Link href="/">
                    <Image src={Logo} alt="Logo" height={44} />
                </Link>
            </div>
            <div id="profile" className="px-6 py-10">
                <p className="text-slate-500">Welcome back,</p>
                <a href="#" className="inline-flex space-x-2 items-center">
                    <span>
                        <Image className="rounded-full w-8 h-8" src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib" alt="Purple Butterfly Logo" width={50} height={50} />
                    </span>
                    <span className="text-sm md:text-base font-bold">
                        Alma Puello
                    </span>
                </a>
            </div>
            <div id="nav" className="w-full px-6">

                {menuItems.map((menuItem) => (
                    <SidebarMenuItem key={menuItem.path} {...menuItem} />
                ))}
            

                <a href="#" className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                        </svg>                      
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg text-slate-300 font-bold leading-5">Counter</span>
                        <span className="text-sm text-slate-500 hidden md:block">Database Manager</span>
                    </div>
                </a>           
                        
                
            </div>
        </div>
    )
}

