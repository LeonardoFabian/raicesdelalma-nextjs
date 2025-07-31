import { Galada } from "next/font/google"

const galada = Galada({ weight: '400', subsets: ['latin'] });

interface Props {
    children: React.ReactNode
}

export const H1 = ({ children } : Props ) => {
    return <h1 className={`${galada.className} font-heading text-2xl md:text-4xl text-text-primary`}>{ children }</h1>
}