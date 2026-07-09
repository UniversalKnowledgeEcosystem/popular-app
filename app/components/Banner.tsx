"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function Banner() {
  return (
    <Swiper
      modules={[Autoplay]}
      autoplay={{ delay: 3500 }}
      loop
      className="rounded-3xl"
    >
      <SwiperSlide>
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-8">
          <p className="font-bold">🍔 COMBO DA SEMANA</p>

          <h2 className="text-4xl font-black mt-2">
            X-Burger + Batata + Refri
          </h2>

          <p className="mt-3">
            Apenas R$ 29,90
          </p>
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8">
          <p className="font-bold">🍦 SORVETES</p>

          <h2 className="text-4xl font-black mt-2">
            Casquinhas em Dobro
          </h2>

          <p className="mt-3">
            Hoje somente
          </p>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}