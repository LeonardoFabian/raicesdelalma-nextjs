import { H1 } from "../title/H1";
import Image from "next/image";
import logo from "@/public/logo.svg"
import "./BannerHero.css"


interface Props {
    title: string;
    subtitle?: string;
    cta?: JSX.Element;
}

export const BannerHero = ({ title, subtitle, cta }: Props ) => {
    return (
        <div id="banner-hero default-carousel" className="banner-hero relative w-full" data-carousel="slide" >
            <div className="relative h-screen  max-w-5xl mx-auto p-4 lg:p-24  overflow-hidden rounded-lg lg:h-screen">
                <div className="flex flex-col items-center justify-center gap-4 h-full text-center" data-carousel-item>
                    <Image className="p-4 w-full h-64 rounded-t-lg object-contain" src={ logo } alt="hero" width={ 250 } height={ 150 } priority={false} />
                    <H1>{ title }</H1>
                    <h2 className="text-sm md:text-xl">{ subtitle }</h2>
                    { cta }
                </div>       
            </div>
        </div>
    )
}