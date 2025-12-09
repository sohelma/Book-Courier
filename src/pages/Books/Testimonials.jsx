// src/Home/Testimonials.jsx
import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    name: "Ali Hasan",
    text: "Book Courier makes it so easy to get books delivered straight to my home!",
  },
  {
    name: "Fatima Rahman",
    text: "I love their wide collection. I can find any book I want.",
  },
  {
    name: "Jamal Uddin",
    text: "Fast delivery and excellent customer service. Highly recommended!",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-indigo-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="w-[90%] mx-auto text-center">
        
        <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          What Our Users Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="
                bg-white dark:bg-gray-800 
                p-6 rounded-xl shadow 
                border border-gray-200 dark:border-gray-700
                transition-colors duration-300
              "
            >
              <FaQuoteLeft className="text-indigo-500 text-2xl mb-4" />

              <p className="text-gray-700 dark:text-gray-300 mb-4 transition-colors duration-300">
                {review.text}
              </p>

              <h4 className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                {review.name}
              </h4>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
