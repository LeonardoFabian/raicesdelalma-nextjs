"use client";

import Image from "next/image";
import bannerImage from "../../../../public/images/soaps.png";
import { H1 } from "../../title/H1";
import Link from "next/link";

interface Props {
  title: string;
  subtitle?: string;
  ctaPath?: string;
  ctaText?: string;
}

export const BannerHero = ({ title, subtitle, ctaPath, ctaText }: Props) => {
  return (
    <div
      id="banner-hero default-carousel"
      className="banner-hero relative bg-accent text-text-primary font-body rounded-lg h-screen w-full flex items-center justify-center"
      data-carousel="slide"
    >
      {/* <Image
        className="w-full h-full object-cover relative"
        src={banner}
        alt="hero"
        width={1920}
        height={1080}
        priority={false}
      /> */}
      {/* <div className="absolute top-0 left-0 right-0 w-screen h-full max-w-5xl mx-auto bg-white opacity-30 z-10" />

      <div className="fade-in absolute top-0 left-0 right-0 h-full max-w-5xl mx-auto z-20 backdrop-filter backdrop-blur-sm" /> */}

      <div className="container flex flex-col lg:flex-row items-center justify-center lg:justify-between w-full h-full gap-8">
        <div
          className="flex flex-col justify-center lg:justify-start items-center lg:items-start gap-4 text-center lg:text-left"
          data-carousel-item
        >
          {/* <Image className="p-4 w-full h-40 rounded-t-lg object-contain" src={ logo } alt="hero" width={ 250 } height={ 150 } priority={false} /> */}
          <H1>{title}</H1>
          <h2 className="text-text-primary text-md md:text-2xl break-words">
            {subtitle}
          </h2>
          {ctaPath && (
            <div className="flex justify-center lg:justify-start gap-4 mt-4">
              <Link href={ctaPath ?? "#"} className="btn btn-primary">
                {ctaText ?? "Get Started"}
              </Link>
            </div>
          )}
        </div>
        <div className="relative w-full h-auto lg:h-full flex justify-center">
          {/* Sombra detrás de la imagen */}
          {/* <div className="absolute top-4 left-4 w-full h-full rounded-xl bg-black/10 blur-xl z-0"></div> */}
          <Image
            className="relative w-full h-full object-contain z-10"
            src={bannerImage}
            alt="hero"
            width={450}
            height={650}
            priority={false}
          />
        </div>
      </div>
    </div>
  );
};
