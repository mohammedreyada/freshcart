"use client";

import React from "react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import banner1 from "../../../../public/images/grocery-banner-2.jpeg";
import banner2 from "../../../../public/images/slider-image-2.jpeg";
import banner3 from "../../../../public/images/grocery-banner-2.jpeg";

export default function MainSlider() {
  return (
    <div className="container mx-auto w-[80%] py-6">
      <div className="flex gap-4 flex-col lg:flex-row">

        {/* MAIN SLIDER */}
        <div className="lg:w-3/4 relative h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={1}
            spaceBetween={0}
            autoplay={{
              delay: 6000, // 6s بدل 600ms (بطيء شوية أفضل للUX)
              disableOnInteraction: false,
            }}
            loop
            className="w-full h-full"
          >
            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src={banner1}
                  alt="Banner 1"
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                  priority
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src={banner2}
                  alt="Banner 2"
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>

            <SwiperSlide>
              <div className="relative w-full h-full">
                <Image
                  src={banner3}
                  alt="Banner 3"
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="object-cover"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>

        {/* SIDE BANNERS */}
        <div className="lg:w-1/4 flex flex-col gap-4 mt-4 lg:mt-0">
          <div className="relative w-full h-[195px] rounded-2xl overflow-hidden">
            <Image
              src={banner2}
              alt="Side banner"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover"
              priority
            />
          </div>

          <div className="relative w-full h-[195px] rounded-2xl overflow-hidden">
            <Image
              src={banner3}
              alt="Side banner"
              fill
              sizes="(max-width: 1024px) 100vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
