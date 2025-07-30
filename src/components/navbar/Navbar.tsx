import Link from "next/link"
import Logo from "@/public/logo-header-dark.svg";
import Image from "next/image";
import { HomeIcon } from "@primer/octicons-react";
import { ActiveLink, type ActiveLinkProps } from "../active-link/ActiveLink";
import { MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { FavoritesCounterBadgeWidget } from "../widgets/FavoritesCounterBadge";
import { CartCounterBadgeWidget } from "../widgets/CartCounterBadge";


const navItems: ActiveLinkProps[] = [
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
    },
    {
        path: "/favorites",
        label: "Favorites",
        icon: <MdOutlineFavoriteBorder className="w-6 h-6" />,
        badge: <FavoritesCounterBadgeWidget />
    },
    {
        path: "/cart",
        label: "Shopping Cart",
        icon: <MdOutlineShoppingCart className="w-6 h-6" />,
        badge: <CartCounterBadgeWidget />
    }
]


export const Navbar = () => {
    return (
        <nav className="flex items-center bg-primary text-white font-heading py-2 px-4">
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

            <ul className="hidden md:flex space-x-6 mr-5">
                {navItems.map(( navItem ) => (
                    <ActiveLink key={navItem.path} {...navItem} />
                ))}    
            </ul>  

            <Link href="/login" className="flex items-center py-2 px-4 transition-all bg-gold-pastel hover:bg-accent text-primary hover:text-white font-heading font-semibold rounded-lg">
                Log In
            </Link>

        </nav>
    )
}