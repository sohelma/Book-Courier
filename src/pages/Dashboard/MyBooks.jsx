// src/pages/Dashboard/MyBooks.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyBooks = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (!user?.email) return;
    const fetchBooks = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/books?addedBy=${user.email}`);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load books");
      }
    };
    fetchBooks();
  }, [user]);

  const handleStatusToggle = async (bookId, currentStatus) => {
    const newStatus = currentStatus === "published" ? "unpublished" : "published";
    try {
      await axios.patch(`http://localhost:3000/books/${bookId}`, { status: newStatus });
      setBooks(prev => prev.map(b => b._id === bookId ? { ...b, status: newStatus } : b));
      toast.success(`Book ${newStatus}!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="p-4">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">My Books</h2>
      {books.length === 0 && <p>No books found</p>}
      <ul>
        {books.map(book => (
          <li key={book._id} className="flex justify-between gap-4 border p-2">
            <span>{book.title} (${book.price})</span>
            <div>
              <button onClick={() => navigate(`/dashboard/edit-book/${book._id}`)}>Edit</button>
              <button onClick={() => handleStatusToggle(book._id, book.status)}>
                {book.status === "published" ? "Unpublish" : "Publish"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBooks;
