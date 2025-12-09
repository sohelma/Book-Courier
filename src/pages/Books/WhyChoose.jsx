import React from "react";
import { motion } from "framer-motion";
import { FaShippingFast, FaBookOpen, FaStar } from "react-icons/fa";

const WhyChoose = () => {
  const features = [
    {
      icon: <FaShippingFast size={30} className="text-primary" />,
      title: "Fast Delivery",
      description: "Get your favorite books delivered to your doorstep in no time."
    },
    {
      icon: <FaBookOpen size={30} className="text-primary" />,
      title: "Wide Collection",
      description: "Thousands of books from various genres and authors available online."
    },
    {
      icon: <FaStar size={30} className="text-primary" />,
      title: "Quality & Trust",
      description: "Curated selection with authentic books and reliable service."
    },
  ];

  return (
    <section className="py-16 bg-base-100 dark:bg-base-200 text-base-content dark:text-white">
      <div className="w-[90%] mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-4 dark:text-white">
          Why Choose Book Courier at Home
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Discover why BookCourier is the preferred choice for book lovers everywhere.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-base-100 dark:bg-gray-100 rounded-xl shadow-md p-6 hover:shadow-lg transition border border-base-300 dark:border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-base-content dark:text-white">
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
