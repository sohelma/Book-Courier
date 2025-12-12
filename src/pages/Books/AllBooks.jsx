// src/pages/Books/AllBooks.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching books:", err));
  }, []);

  const filteredBooks = books.filter((b) =>
    b.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 
                     text-indigo-600 dark:text-indigo-400">
        All Books
      </h1>

      {/* Search */}
      <div className="max-w-md mx-auto mb-6 relative">
        <FiSearch className="absolute left-3 top-3 text-gray-500 dark:text-gray-300" />
        <input
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-3 py-1.5 rounded-xl border border-gray-300 
                     dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 
                     focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-900 rounded-xl shadow-md 
                       overflow-hidden flex flex-col hover:shadow-lg 
                       transition duration-300 h-full"
          >
            {/* Image */}
            <div className="w-full h-40 overflow-hidden rounded-t-xl">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-3 flex flex-col justify-between flex-1">
              <div>
                <h3 className="text-lg font-bold text-indigo-600 dark:text-indigo-400 mb-1 line-clamp-2">
                  {book.title}
                </h3>

                <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3 mb-1">
                  {book.description}
                </p>

                <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm">
                  ${book.price}
                </p>
              </div>

              <Link
                to={`/books/${book._id}`}
                className="mt-2 text-center px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 
                           text-white rounded-lg text-sm transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}

        {filteredBooks.length === 0 && (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-300">
            No books found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
