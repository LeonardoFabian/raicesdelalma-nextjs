import Link from "next/link"
import Logo from "@/public/logo-header-dark.svg";
import Image from "next/image";
import { HomeIcon } from "@primer/octicons-react";
import { ActiveLink } from "../active-link/ActiveLink";

interface Props {
    path: string;
    label: string;
}

const navItems: Props[] = [
    {
        path: "/about",
        label: "About Us"
    },
    {
        path: "/products",
        label: "Products"
    },
    {
        path: "/customize",
        label: "Customize"
    },
    {
        path: "/how-it-works",
        label: "How It Works"
    },
    {
        path: "/contact",
        label: "Contact Us"
    }
]


export const Navbar = () => {
    return (
        <nav className="flex items-center bg-purple-600 text-purple-400 py-2 px-4">
            <Link href="/">
                {Image ? (
                    <Image src={Logo} alt="Logo" height={44} />
                ) : (
                    <>
                        <HomeIcon />
                        Home
                    </>
                )}
            </Link>

            <div className="flex flex-1"></div>

            {navItems.map(( navItem ) => (
                <ActiveLink key={navItem.path} {...navItem} />
            ))}

            <Link href="/login" className="flex items-center py-2 px-4 transition-all bg-white hover:bg-purple-700 text-purple-600 hover:text-white font-semibold rounded-lg">
                Log In
            </Link>

        </nav>
    )
}