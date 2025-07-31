'use client'

import Link from "next/link"
import Logo from "@/public/logo-header-dark.svg";
import Image from "next/image";
import { HomeIcon } from "@primer/octicons-react";
import { ActiveLink, type ActiveLinkProps } from "../active-link/ActiveLink";
import { MdMenu, MdOutlineClose, MdOutlineFavoriteBorder, MdOutlineShoppingCart } from "react-icons/md";
import { FavoritesCounterBadgeWidget } from "../widgets/FavoritesCounterBadge";
import { CartCounterBadgeWidget } from "../widgets/CartCounterBadge";
import { useState } from "react";


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


export const Navbar = () => {

    const [open, setOpen] = useState(false);

    const handleMenuButtonClick = () => {
        setOpen(!open);
    }

    return (
        <>
            <nav className="flex items-center bg-primary text-white font-heading py-2 px-4">
                <Link href="/" className="flex items-center justify-start">
                    {Image ? (
                        <Image src={Logo} className="!h-8 !md:h-12" alt="Logo" height={32} />
                    ) : (
                        <>
                            <HomeIcon />
                            Home
                        </>
                    )}
                </Link>

                <div className="hidden: md:flex flex-1"></div>

                <ul className="hidden md:flex space-x-6 mr-5">
                    {navItems.map(( navItem ) => (
                        <ActiveLink key={navItem.path} {...navItem} />
                    ))}    

                    {accountLinks.map(( accountLink ) => (
                        <ActiveLink key={accountLink.path} {...accountLink} />
                    ))}    

                    <Link href="/login" className="flex items-center py-2 px-4 transition-all bg-gold-pastel hover:bg-accent text-primary hover:text-white font-heading font-semibold rounded-lg">
                        Log In
                    </Link>
                </ul>  

                <span className="md:hidden flex items-center justify-end">
                    <ul className="flex items-center space-x-4">
                        {accountLinks.map(( accountLink ) => (
                            <ActiveLink key={accountLink.path} {...accountLink} />
                        ))}    

                        <button className="md:hidden text-white transition-all duration-300" onClick={handleMenuButtonClick}>
                            {!open ? (
                                <MdMenu className="w-8 h-8" />
                            ) : (
                                <MdOutlineClose className="w-8 h-8" />
                            )}
                        </button> 
                    </ul>      
                </span>               

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