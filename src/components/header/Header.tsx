import { MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md"
import { ActiveLink, ActiveLinkProps } from "../active-link/ActiveLink"
import { FavoritesCounterBadgeWidget } from "../widgets/FavoritesCounterBadge"
import { CartCounterBadgeWidget } from "../widgets/CartCounterBadge"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/logo.svg";
import { HomeIcon } from "@primer/octicons-react"


const navItems: ActiveLinkProps[] = [
    {
        path: "/about",
        label: "About Us"
    },
    {
        path: "/products",
        label: "Shop"
    },
    {
        path: "/contact",
        label: "Contact Us"
    }
]

const accountLinks: ActiveLinkProps[] = [
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

export const Header = () => {
    return (
        <nav className="absolute w-full top-0 left-0 right-0 z-50 grid grid-cols-3 bg-transparent text-text-secondary font-heading py-2 px-4">          

            <ul className="hidden md:flex items-center space-x-6">
                {navItems.map(( navItem ) => (
                    <ActiveLink key={navItem.path} {...navItem} />
                ))}    
            </ul>  

             <Link href="/" className="flex items-center justify-center">
                {Image ? (
                    <Image src={Logo} className="w-24 h-24" alt="Logo" height={54} />
                ) : (
                    <>
                        <HomeIcon />
                        Home
                    </>
                )}
            </Link>

            <ul className="hidden md:flex items-center justify-end space-x-6">
                {accountLinks.map(( accountLink ) => (
                    <ActiveLink key={accountLink.path} {...accountLink} />
                ))}    

                <Link href="/login" className="flex items-center py-2 px-4 transition-all bg-primary hover:bg-accent text-white font-heading font-semibold rounded-lg">
                    Log In
                </Link>
            </ul>              

        </nav>
    )
}