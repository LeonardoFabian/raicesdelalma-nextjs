"use client";

import Image from "next/image";
import banner from "../../../../public/images/hero.png";
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
      className="banner-hero relative bg-blue-pastel text-text-primary font-body rounded-lg h-screen w-full"
      data-carousel="slide"
    >
      <Image
        className="w-full h-full object-cover relative"
        src={banner}
        alt="hero"
        width={1920}
        height={1080}
        priority={false}
      />
      <div className="absolute top-0 left-0 right-0 w-screen h-full max-w-5xl mx-auto bg-white opacity-30 z-10" />

      <div className="fade-in absolute top-0 left-0 right-0 h-full max-w-5xl mx-auto z-20 backdrop-filter backdrop-blur-sm" />

      <div className="absolute top-0 left-0 right-0 z-30 h-full max-w-5xl mx-auto p-4 lg:p-24  overflow-hidden rounded-lg">
        <div
          className="flex flex-col items-center justify-start pt-32 md:pt-12 gap-4 h-full text-center"
          data-carousel-item
        >
          {/* <Image className="p-4 w-full h-40 rounded-t-lg object-contain" src={ logo } alt="hero" width={ 250 } height={ 150 } priority={false} /> */}
          <H1>{title}</H1>
          <h2 className="text-text-secondary text-md md:text-2xl">
            {subtitle}
          </h2>
          {ctaPath && (
            <div className="flex justify-center gap-4 mt-4">
              <Link href={ctaPath ?? "#"} className="btn btn-primary">
                {ctaText ?? "Get Started"}
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
