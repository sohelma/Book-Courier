// src/pages/Dashboard/MyWishlist.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaTrash, FaHeart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const MyWishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:3000/wishlist?email=${user.email}`)
      .then((res) => setWishlist(res.data))
      .catch(() => toast.error("Failed to load wishlist"));
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/wishlist/${id}`);
      setWishlist(wishlist.filter((item) => item._id !== id));
      toast.success("Removed from Wishlist");
    } catch (error) {
      toast.error("Failed to remove");
    }
  };

  if (!user) return <p className="p-6 text-center">Please login to view wishlist</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6 flex items-center gap-2">
        <FaHeart className="text-rose-500" /> My Wishlist
      </h2>

      {wishlist.length === 0 ? (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          Wishlist is empty 
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((book) => (
            <div
              key={book._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md hover:shadow-xl transition hover:-translate-y-1"
            >
              {/* Book Image */}
              <div className="w-full h-52 rounded-lg overflow-hidden">
                <img
                  src={book.imageUrl}
                  alt={book.bookTitle || "Book"}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book Info */}
              <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
                {book.bookTitle || "No Title"}
              </h3>

              <div className="mt-4 flex justify-between items-center">
                <Link
                  to={`/books/${book.bookId}`}
                  className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm"
                >
                  View
                </Link>

                <button
                  onClick={() => handleRemove(book._id)}
                  className="text-red-500 hover:text-red-600 text-xl"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyWishlist;
