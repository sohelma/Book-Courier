import React from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

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
    <Swiper  
      loop={true}
      slidesPerView={4}
      centeredSlides={true}
      spaceBetween={30}
      grabCursor={true} 
      modules={[Autoplay]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {brandLogos.map((logo, index) => (
        <SwiperSlide key={index}>
          <img src={logo} alt={`Brand ${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Brands;
