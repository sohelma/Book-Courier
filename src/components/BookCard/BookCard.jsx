// BookCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-indigo-500 mb-2">{book.title}</h3>
        <p className="text-gray-900 dark:text-gray-200 mb-4 line-clamp-3">
          {book.description}
        </p>
        <Link
          to={`/books/${book._id}`}
          className="px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-lg"
        >
          View More
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
