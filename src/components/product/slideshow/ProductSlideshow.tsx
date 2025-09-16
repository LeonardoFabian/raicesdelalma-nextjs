"use client";

import React, { useRef, useState } from "react";
import { Swiper as SwiperObject } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image";
import { ProductImage } from "@/components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";

// import required modules

interface Props {
  images: { id: number; url: string }[];
  title: string;
  className?: string;
}

export const ProductSlideshow = ({ images, title, className }: Props) => {
  // console.log(images);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

  return (
    <div className={`${className} relative `}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={10}
        navigation={true}
        autoplay={{ delay: 3000 }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="relative w-full pt-[75%] bg-gray-200">
              <ProductImage
                src={img.url}
                alt={title}
                // width={768}
                // height={768}
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1024px) 60vw,
                       50vw"
                className="rounded-lg object-contain overflow-hidden"
              />
              {/* <Image
                src={`/uploads/${img}`}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1024px) 60vw,
                       50vw"
                className="rounded-lg object-contain overflow-hidden"
                priority={false}
              /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
        breakpoints={{
          768: { slidesPerView: 5, spaceBetween: 12 },
          1024: { slidesPerView: 6, spaceBetween: 12 },
        }}
      >
        {images.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="relative w-full pt-[100%] bg-gray-200">
              <ProductImage
                src={img.url}
                alt={title}
                // width={768}
                // height={150}
                fill
                sizes="(max-width: 768px) 20vw,
                       (max-width: 1200px) 12vw,
                       10vw"
                className="rounded-md object-cover cursor-pointer"
              />
              {/* <Image
                src={`/uploads/${img}`}
                alt={`${title} image`}
                fill
                className="rounded-md object-cover cursor-pointer"
                sizes="(max-width: 768px) 20vw,
                       (max-width: 1200px) 12vw,
                       10vw"
                priority={false}
              /> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
