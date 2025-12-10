//pages/Books/BookDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderModal from "../../components/OrderModal"; // <-- Create this file

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Left Side - 50% Image */}
  <div className="w-full">
    <img
      src={book.imageUrl}
      alt={book.title}
      className="w-full h-80 object-cover rounded-lg shadow"
    />
  </div>

  {/* Right Side - 50% Text */}
  <div className="w-full">
    <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
    <p className="text-lg mb-4">{book.description}</p>
    
    <p className="mb-2">Created : {book.createdAt}</p>
    <p className="mb-2">Order : {book.order}</p>
    <p className="mb-6">Price : {book.price}</p>

    <button
      onClick={() => setIsModalOpen(true)}
      className="px-5 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
    >
      Order Now
    </button>
  </div>

  {/* Modal */}
  <OrderModal
    visible={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    book={book}
  />
</div>

  );
};

export default BookDetails;
