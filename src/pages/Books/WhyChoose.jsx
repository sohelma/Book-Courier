import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaBookOpen, FaStar } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaShippingFast size={36} className="text-indigo-500" />,
      title: "Fast Delivery",
      description: "Get your favorite books delivered to your doorstep in no time."
    },
    {
      icon: <FaBookOpen size={36} className="text-indigo-500" />,
      title: "Wide Collection",
      description: "Thousands of books from various genres and authors available online."
    },
    {
      icon: <FaStar size={36} className="text-indigo-500" />,
      title: "Quality & Trust",
      description: "Curated selection with authentic books and reliable service."
    },
  ];

  return (
    <section className="py-16 bg-indigo-100 dark:bg-gray-900 transition-colors">
      <div className="w-[90%] max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-indigo-400">
          Why Choose Book Courier at Home
        </h2>
        <p className="text-sky-500 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover why BookCourier is the preferred choice for book lovers everywhere.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-sky-200 dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-2 transition-transform border border-gray-200 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
