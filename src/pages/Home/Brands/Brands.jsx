import React from 'react';
// import './styles.css';
 import 'swiper/css';
 import { Swiper, SwiperSlide } from 'swiper/react';
 import amazone from '../../../assets/brands/amazon.png';
 
 import casio from '../../../assets/brands/casio.png';
 import moonstar from '../../../assets/brands/moonstar.png';
 import randstad from '../../../assets/brands/randstad.png';
 import star from '../../../assets/brands/star.png';
 import start_people from '../../../assets/brands/start_people.png';
 import deliveryman from '../../../assets/brands/deliveryman.png';
 import { Autoplay } from 'swiper/modules';

const brandLogos=[amazone,casio,moonstar,randstad,star,start_people,deliveryman];
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

       {brandLogos.map((logo,index)=><SwiperSlide key={index}>
    <img src={logo}alt=""/> </SwiperSlide>
    )}
    </Swiper>
    );
};


export default Brands;