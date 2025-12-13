// src/pages/Books/AllBooks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc"

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Filter & Sort
  const filteredBooks = books
    .filter(
      (book) =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        (book.price && book.price.toString().includes(search))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
        All Books
      </h1>

      {/* Search & Sort */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search by title ..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-400"
        />

        </div>

        <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg w-full md:w-1/4 focus:outline-none focus:ring focus:ring-indigo-300 dark:bg-gray-800 dark:text-gray-200"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
      </select>

      </div>

      {/* Book Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-xl transition hover:-translate-y-1"
          >
            <div className="w-full h-48 rounded-lg overflow-hidden">
              <img
                src={book.imageUrl || "https://via.placeholder.com/300"}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
              {book.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
              {book.description}
            </p>
            <p className="text-gray-700 dark:text-gray-200 font-semibold mt-2">
              Price: ${book.price}
            </p>

            <Link
              to={`/books/${book._id}`}
              className="mt-3 inline-block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
