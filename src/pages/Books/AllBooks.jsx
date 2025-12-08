//pages/Books/allBook.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllBooks = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log("Fetching books from server...");
    axios.get("http://localhost:3000/books")
      .then(res => {
        console.log("Server response:", res.data);
        setBooks(res.data);
      })
      .catch(err => console.error("Error fetching books:", err));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-500">All Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            {/* Image Top */}
            <div className="w-full h-64 overflow-hidden rounded-t-2xl">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text Bottom */}
            <div className="p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-indigo-500 mb-2">
                  {book.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 mb-4 line-clamp-3">
                  {book.description}
                </p>
              </div>
              
             {/* // inside map */}
                <Link
                to={`/books/${book._id}`}
                className="self-start px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg transition"
                >
                View More
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBooks;
