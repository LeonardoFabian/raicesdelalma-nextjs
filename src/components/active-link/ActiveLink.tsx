'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './ActiveLink.module.css';
import { NotificationBadge } from "../badges/NotificationBadge";

export interface ActiveLinkProps {
    path: string;
    label: string;
    icon?: JSX.Element;
    badge?: JSX.Element;
}

export const ActiveLink = ( { path, label, icon, badge }: ActiveLinkProps ) => {

    const pathName = usePathname();

    return (
        <Link 
            href={ path } 
            className={ `relative font-heading font-semibold ${ styles.link } ${ (pathName === path) && styles['active-link'] } ${ pathName !== "/" ? 'hover:text-gold-pastel' : 'hover:text-primary'}` }
            title={ label }
        >
            { badge ?? '' }
            { icon ?? label }
        </Link>
    )
}