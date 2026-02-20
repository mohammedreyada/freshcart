"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { category } from "@/types/category.type";
import { Category } from "@/types/products.types";

export default function CategoriesSweipper({ categories }:{categories :category[]} ) {
  return (
    <div className="container mx-auto my-10 px-4">
      <Swiper
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 7 },
        }}
      >
        {Array.isArray(categories) &&
          categories.map((categ :Category) => (
            <SwiperSlide key={categ._id}>
              <div className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 cursor-pointer">
                
                {/* Image */}
                <div className="w-full h-[120px] flex items-center justify-center overflow-hidden">
                  <img
                    src={categ.image}
                    alt={categ.name}
                    className="w-24 h-24 object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Name */}
                <p className="mt-4 text-center text-sm font-semibold text-gray-700 group-hover:text-green-600 transition-colors duration-300">
                  {categ.name}
                </p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
