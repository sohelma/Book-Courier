// src/Home/Banner/Banner.jsx
import React from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const slides = [
  {
    image: "/images/banner/banner10.jpg",
    title: "Borrow Your Favorite Books",
    desc: "Get books delivered from nearby libraries directly to your home.",
    link: "/books",
    textPosition: "left",
  },
  {
    image: "/images/banner/banner11.jpg",
    title: "Explore a World of Knowledge",
    desc: "Find books from various genres and authors easily.",
    link: "/books",
    textPosition: "right",
  },
  {
    image: "/images/banner/banner12.jpg",
    title: "Easy Library Access",
    desc: "Request pickup or delivery without visiting the library.",
    link: "/books",
    textPosition: "left",
  },
];

const Banner = () => {
  return (
    <div className="flex justify-center py-12 bg-gray-50 dark:bg-gray-900">
      <div className="w-full md:w-[80%]">
        <Carousel
          infiniteLoop
          autoPlay
          showThumbs={false}
          showStatus={false}
          interval={5000}
          className="rounded-lg shadow-lg"
        >
          {slides.map((slide, idx) => (
            <div key={idx} className="relative">
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="object-cover w-full h-[300px] md:h-[400px] rounded-lg"
              />

              {/* Dark overlay for text visibility */}
              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg"></div>

              {/* Text content */}
              <div
                className={`absolute top-1/2 transform -translate-y-1/2 p-6 md:w-1/2 ${
                  slide.textPosition === "left"
                    ? "left-0 md:left-6 text-left"
                    : "right-0 md:right-6 text-right"
                } z-10`}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-indigo-500 mb-4">
                  {slide.title}
                </h2>
                <p className="text-white text-lg md:text-xl mb-4">{slide.desc}</p>
                <Link
                  to={slide.link}
                  className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
                >
                  View All Books
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Banner;
