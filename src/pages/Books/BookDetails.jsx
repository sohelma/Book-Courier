// src/pages/Books/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import toast, { Toaster } from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/books/${id}`)
      .then((res) => setBook(res.data))
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load book details");
      });
  }, [id]);

  // ⭐ ADD WISHLIST FUNCTION
  const handleAddToWishlist = async () => {
    try {
      await axios.post("http://localhost:3000/wishlist", {
        bookId: book._id,
      });
      toast.success("Added to Wishlist!");
    } catch (error) {
      console.error(error);
      toast.error("Already in Wishlist or Server Error");
    }
  };

  if (!book) return <p className="p-6 text-center">Loading book details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <Toaster position="top-right" />

      {/* Left Side - Image */}
      <div className="w-full">
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-64 object-cover rounded-lg shadow"
        />
      </div>

      {/* Right Side - Text */}
      <div className="w-full flex flex-col gap-4">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
        <p className="text-gray-600">Price: ${book.price}</p>
        <p className="text-gray-500 text-sm">
          Created: {new Date(book.createdAt).toLocaleDateString()}
        </p>

        <button
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Order Now
        </button>

        {/* ⭐ ADD WISHLIST BUTTON */}
        <button
          onClick={handleAddToWishlist}
          className="mt-2 px-5 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition"
        >
          Add to Wishlist
        </button>
      </div>

      {/* Order Modal */}
      <OrderModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        book={book}
      />
    </div>
  );
};

export default BookDetails;
