
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/books/${id}`)
      .then(res => setBook(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!book) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto flex gap-6">
      <div>
        <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-64 object-cover mb-4 rounded-lg"
      />
      </div>
      <div >
        <h1 className="text-3xl font-bold mb-6">{book.title}</h1>
        <h1 className="text-xl mb-4">{book.description}</h1>
        <p className="mb-2">Created : {book.createdAt}</p>
        <p className=" mb-8">Order : {book.order}</p>
        <p className="text-indigo-500 font-semibold">{book.buttonText}</p>
      </div>
     
    </div>
  );
};

export default BookDetails;
