'use client'

import { MdOutlineFavoriteBorder, MdOutlineShoppingCart, MdMenu, MdOutlineClose } from "react-icons/md"
import { ActiveLink, ActiveLinkProps } from "../active-link/ActiveLink"
import { FavoritesCounterBadgeWidget } from "../widgets/FavoritesCounterBadge"
import { CartCounterBadgeWidget } from "../widgets/CartCounterBadge"
import Link from "next/link"
import Image from "next/image"
import Logo from "@/public/logo.svg";
import { HomeIcon } from "@primer/octicons-react"
import { useState } from "react"


const navItems: ActiveLinkProps[] = [
    {
        path: "/about",
        label: "About Us"
    },
    {
        path: "/shop",
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

    const [open, setOpen] = useState(false);


    const handleClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <nav className="absolute w-full top-0 left-0 right-0 z-50 grid md:grid-cols-3 bg-transparent text-text-secondary font-heading py-2 px-6">          

                <span className="hidden md:flex items-start">
                    <ul className="flex items-center mt-4 space-x-6">
                        {navItems.map(( navItem ) => (
                            <ActiveLink key={navItem.path} {...navItem} />
                        ))}    
                    </ul>  
                </span>

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

                <span className="hidden md:flex items-start justify-end">
                    <ul className="flex items-center mt-3 space-x-6">
                        {accountLinks.map(( accountLink ) => (
                            <ActiveLink key={accountLink.path} {...accountLink} />
                        ))}    

                        <Link href="/login" className="flex items-center py-2 px-4 transition-all bg-primary hover:bg-accent text-white font-heading font-semibold rounded-lg">
                            Log In
                        </Link>
                    </ul>      
                </span> 

                <button className="md:hidden text-text-primary absolute top-2 right-2 transition-all duration-300" onClick={handleClick}>
                    {!open ? (
                        <MdMenu className="w-8 h-8" />
                    ) : (
                        <MdOutlineClose className="w-8 h-8" />
                    )}
                </button>           

            </nav>
            {open && (
                <div className="menu-mobile bg-primary absolute top-0 bottom-0 left-0 z-50 w-72 transition-all translate-x-0 ease-in-out duration-500">
                    <ul className="flex flex-col items-center justify-center space-y-6 h-full text-white">
                        {navItems.map(( navItem ) => (
                            <ActiveLink key={navItem.path} {...navItem} />
                        ))}    
                        <Link href="/login" className="flex items-center py-2 px-4 transition-all bg-gold-pastel text-primary font-heading font-semibold rounded-lg">
                            Log In
                        </Link>
                    </ul>
                </div>
            )}
        </>
    )
}