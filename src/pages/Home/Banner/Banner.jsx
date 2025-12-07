import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
    return (
        <Carousel infiniteLoop autoPlay showThumbs={false} className="pb-16">
            <div>
                <img src="/images/banner/banner10.jpg" className="banner-img" alt="Banner 1" />
            </div>
            <div>
                <img src="/images/banner/banner11.jpg" className="banner-img" alt="Banner 2" />
            </div>
            <div>
                <img src="/images/banner/banner12.jpg" className="banner-img" alt="Banner 3" />
            </div>
            <div>
                <img src="/images/banner/banner13.jpg" className="banner-img" alt="Banner 4" />
            </div>
        </Carousel>
    );
};

export default Banner;
