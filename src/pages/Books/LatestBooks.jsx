import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function LatestBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3000/books/latest")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error fetching latest books:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center py-10 text-gray-500">Loading...</p>;

  if (books.length === 0)
    return <p className="text-center py-10 text-gray-500">No books found</p>;

  return (
    <div className="py-12 bg-gray-50 dark:bg-black dark:text-white">
      <div className="w-[90%] mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Latest Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4 hover:shadow-lg transition border border-gray-200 dark:border-gray-700"
            >
              <img
                src={book.imageUrl || "/default-book.png"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold mb-2 dark:text-white">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-3">
                {book.description}
              </p>

              <Link
                to={`/books/${book._id}`}
                className="inline-block w-full text-center px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
