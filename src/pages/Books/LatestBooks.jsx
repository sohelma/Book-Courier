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
    return <p className="text-center py-10 text-gray-500 dark:text-gray-400">Loading...</p>;

  if (books.length === 0)
    return <p className="text-center py-10 text-gray-500 dark:text-gray-400">No books found</p>;

  return (
    <div className="min-h-auto bg-base-100 dark:bg-base-200 py-6 px-2">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-base-content dark:text-white">
          Latest Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-base-100 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-base-300 dark:border-gray-700 hover:shadow-lg transition"
            >
              <img
                src={book.imageUrl || "/default-book.png"}
                alt={book.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />

              <h3 className="text-lg font-semibold mb-2 text-base-content dark:text-white">
                {book.title}
              </h3>

              <p className="text-sm text-base-content/70 dark:text-gray-400 mb-4 line-clamp-3">
                {book.description}
              </p>

              <Link
                to={`/books/${book._id}`}
                className="inline-block w-full text-center px-4 py-2 bg-primary dark:bg-indigo-700 hover:bg-primary-focus dark:hover:bg-indigo-600 text-white rounded-lg transition"
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
