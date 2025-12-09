// src/Home/Categories.jsx
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const categories = [
  { title: "Programming Learning Books", imageUrl: "https://i.ibb.co/Tq11VHgM/programming.jpg" },
  { title: "Yoga Learning", imageUrl: "https://i.ibb.co/wZ7f4yW7/yoga.jpg" },
  { title: "Travel History", imageUrl: "https://i.ibb.co/7tZSGd1x/travel.jpg" },
  { title: "Medical Science", imageUrl: "https://i.ibb.co/k6cBJSvC/med.jpg" },
  { title: "Computer Science & Engineering", imageUrl: "https://i.ibb.co/8R54KZy/1.jpg" },
  { title: "Kids Zone", imageUrl: "https://i.ibb.co/WWVq95mH/kids.webp" },
  { title: "World History", imageUrl: "https://i.ibb.co/SYvVdrZ/history.webp" },
  { title: "Hacking Books", imageUrl: "https://i.ibb.co/WpdNMxvg/hacking.jpg" },
  { title: "Music Practice", imageUrl: "https://i.ibb.co/vxc4dyp5/Music.webp" },
  { title: "World Geography", imageUrl: "https://i.ibb.co/XYZ/worldgeography.jpg" },
];

const Categories = () => {
  const [search, setSearch] = useState("");

  const filteredCategories = categories.filter(cat =>
    cat.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 dark:text-white">
      <div className="w-[90%] mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Explore Our Categories</h2>

        {/* Search Box */}
        <div className="relative mb-10 max-w-sm mx-auto">
          <div className="absolute top-0 left-0 h-full flex items-center pl-3 pointer-events-none">
            <FaSearch className="text-gray-500 dark:text-gray-300" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredCategories.map((cat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer border-2 border-transparent hover:border-indigo-400 transition-all duration-300"
            >
              {/* Image */}
              <img
                src={cat.imageUrl}
                alt={cat.title}
                className="w-full h-56 object-cover brightness-90 dark:brightness-75"
              />
              {/* Title Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 dark:bg-black/50">
                <h3 className="text-white text-xl font-semibold text-center px-3">
                  {cat.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
