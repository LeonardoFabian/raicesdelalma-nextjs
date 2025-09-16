"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";
import { ProductImage } from "../product-image/ProductImage";

// import required modules

interface Props {
  images: { id: number; url: string }[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  // console.log(images);

  return (
    <div className={`${className} relative `}>
      <Swiper
        style={
          {
            width: "100vw",
            height: "500px",
          } as React.CSSProperties
        }
        spaceBetween={10}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        modules={[FreeMode, Autoplay, Pagination]}
        className="mySwiperMobile2"
      >
        {images.map((img, index) => (
          <SwiperSlide key={img.id}>
            <div className="relative w-full h-[80vh] bg-gray-200">
              <ProductImage
                src={img.url}
                alt={title}
                // width={768}
                // height={768}
                fill
                sizes="(max-width: 768px) 100vw,
                       (max-width: 1024px) 60vw,
                       50vw"
                className="object-contain overflow-hidden"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
