import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import bannerimg1 from '../../../assets/banner/banner10.jpg'
import bannerimg2 from '../../../assets/banner/banner11.jpg'
import bannerimg3 from '../../../assets/banner/banner12.jpg'
import bannerimg4 from '../../../assets/banner/banner13.jpg'

const Banner = () => {
    return (
        <Carousel infiniteLoop={true} autoPlay ={true} showThumbs={false} className="pb-16">  
                <div>
                    <img src={bannerimg1}className='banner-img' />
                    {/* <p className="legend">s courier service</p> */}
                </div>
                <div>
                    <img src={bannerimg2}className="banner-img"  />
                    {/* <p className="legend">s courier service</p> */}
                </div>
                <div>
                    <img src={bannerimg3}className="banner-img" />
                    {/* <p className="legend">s courier service</p> */}
                </div>
                <div>
                    <img src={bannerimg4}className="banner-img"  />
                    {/* <p className="legend">s courier service</p> */}
                </div>
            </Carousel>
    );
};

export default Banner;