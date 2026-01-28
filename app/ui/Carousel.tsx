"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules"; // import modules
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Carousel() {
  return (
    <Swiper
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{ clickable: true }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {/* Slide 1 */}
      <SwiperSlide>
        <div className="relative w-screen h-[500px] md:h-[600px]">
          <Image
            src="/41.jpg"
            alt="Ncdc1"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                NCDC Learning Management System
              </h2>
              <p className="mb-6 text-lg md:text-xl">
                Browse thousands of courses from top instructors
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = "/home/courses";
                  }}
                  className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded font-semibold cursor-pointer"
                >
                  Explore Courses
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    window.location.href = "/auth/register";
                  }}
                  className="bg-white text-green-700 hover:bg-gray-100 px-6 py-2 rounded font-semibold cursor-pointer"
                >
                  Sign Up Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 2 */}
      <SwiperSlide>
        <div className="relative w-screen h-[500px] md:h-[600px]">
          <Image src="/42.jpg" alt="Ncdc2" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Prevension is Better Than Cure
              </h2>
              <p className="mb-6 text-lg md:text-xl">
                Discover best practices for disease prevention
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = "/home/courses";
                }}
                className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded font-semibold cursor-pointer"
              >
                View Courses
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>

      {/* Slide 3 */}
      <SwiperSlide>
        <div className="relative w-screen h-[500px] md:h-[600px]">
          <Image src="/43.jpg" alt="Ncdc3" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center text-white px-4">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Download courses and learn offline
              </h2>
              <p className="mb-6 text-lg md:text-xl">
                Take your learning on the go with our mobile app
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.location.href = "/auth/register";
                }}
                className="bg-green-700 hover:bg-green-800 px-6 py-2 rounded font-semibold cursor-pointer"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
