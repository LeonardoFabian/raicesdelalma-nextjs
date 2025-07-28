'use client'

import { usePathname } from "next/navigation"
import Link from "next/link"

interface Props {
    path: string;
    label: string;
    description?: string;
    icon: JSX.Element;
}

export const SidebarMenuItem = ({ path, label, description, icon } : Props ) => {

    const currentPath = usePathname();

    return (
        <Link href={ path } className={`w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-2 ${ currentPath === path ? 'bg-purple-600' : '' } hover:bg-white/5 transition ease-linear duration-150`}>
            <div>
                { icon }                      
            </div>
            <div className="flex flex-col">
                <span className="text-md font-bold leading-5 text-white">{ label }</span>
                {description && <span className="text-sm text-white/50 hidden md:block">{ description }</span>}
            </div>
        </Link>
    )
}