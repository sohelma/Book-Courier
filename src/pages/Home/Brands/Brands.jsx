import React from "react";
import 'swiper/css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

const brandLogos = [
  "/images/brands/amazon.png",
  "/images/brands/casio.png",
  "/images/brands/moonstar.png",
  "/images/brands/randstad.png",
  "/images/brands/star.png",
  "/images/brands/start_people.png"
];

const Brands = () => {
  return (
    <div className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
        Trusted By
      </h2>

      <Swiper
        loop={true}
        slidesPerView={2}        // Mobile default
        spaceBetween={20}
        grabCursor={true}
        centeredSlides={true}
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 3, spaceBetween: 25 },   // Tablet
          768: { slidesPerView: 4, spaceBetween: 30 },   // Small desktop
          1024: { slidesPerView: 5, spaceBetween: 40 },  // Large desktop
        }}
      >
        {brandLogos.map((logo, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <img 
              src={logo} 
              alt={`Brand ${index}`} 
              className="max-h-16 md:max-h-20 object-contain transition-transform hover:scale-110"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Brands;
