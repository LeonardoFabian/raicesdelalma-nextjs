import { H1 } from "../title/H1";
import Image from "next/image";


interface Props {
    title: string;
    subtitle?: string;
    cta?: JSX.Element;
}

export const BannerHero = ({ title, subtitle, cta }: Props ) => {
    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide" >
            <div className="relative h-screen md:h-56 max-w-5xl mx-auto p-4 md:p-24  overflow-hidden rounded-lg lg:h-96">
                <div className="flex flex-col items-center justify-center gap-4 h-full text-center" data-carousel-item>
                    <H1>{ title }</H1>
                    <h2 className="text-sm md:text-xl">{ subtitle }</h2>
                    { cta }
                </div>       
            </div>
        </div>
    )
}