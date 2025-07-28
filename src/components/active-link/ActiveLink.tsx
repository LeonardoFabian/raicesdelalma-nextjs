'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './ActiveLink.module.css';

interface Props {
    path: string;
    label: string;
    icon?: JSX.Element;
}

export const ActiveLink = ( { path, label, icon }: Props ) => {

    const pathName = usePathname();

    return (
        <Link 
            href={ path } 
            className={ `${ styles.link } ${ (pathName === path) && styles['active-link'] }` }
        >
            { icon ?? label }
        </Link>
    )
}