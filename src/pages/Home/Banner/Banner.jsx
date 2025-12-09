import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";

const Banner = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/banners")
      .then((res) => {
        const activeSlides = res.data.filter((slide) => slide.isActive);
        setSlides(activeSlides);
      })
      .catch((err) => console.error("Error fetching Banners:", err));
  }, []);

  if (!slides.length) {
    return <div className="text-center py-12">Loading Banners...</div>;
  }

  return (
    <div className="flex justify-center py-12 bg-gray-50 dark:bg-black dark:text-white dark:text-white">
      <div className="w-full md:w-[80%]">
        <Carousel
          infiniteLoop
          autoPlay
          showThumbs={false}
          showStatus={false}
          interval={5000}
          className="rounded-xl shadow-xl"
        >
          {slides.map((slide) => (
            <div key={slide._id} className="flex w-full h-[330px] md:h-[420px] rounded-xl overflow-hidden bg-transparent dark:bg-black dark:text-white">

              {/* LEFT TEXT 40% */}
              <div className="w-2/5 flex flex-col justify-center p-8 space-y-6">

                {/* Modern Title */}
                <h2 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white tracking-tight drop-shadow-sm">
                  {slide.title}
                </h2>

                {/* Modern Description */}
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed opacity-90">
                  {slide.description}
                </p>

                {/* Center Button Always */}
                <div className="flex justify-center md:justify-center">
                  <Link
                    to={slide.link}
                    className="px-6 py-2 text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl transition shadow-lg tracking-wide transform hover:scale-105 duration-200"
                  >
                    {slide.buttonText || "View All Books"}
                  </Link>
                </div>
              </div>

              {/* RIGHT IMAGE 60% */}
              <div className="w-3/5 h-full">
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
