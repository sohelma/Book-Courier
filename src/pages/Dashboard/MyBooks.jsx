import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const MyBooks = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      if (!user?.email) return;
      try {
        const res = await axios.get(`https://book-courier-server-six.vercel.app/books?addedBy=${user.email}`);
        setBooks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, [user]);

  if (!books.length) return <p className="text-center py-10">No books added yet.</p>;

  return (
    <div className="p-6 sm:p-10 bg-gray-50 dark:bg-gray-900 min-h-[80vh]">
      <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
        My Books
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div key={book._id} className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 flex flex-col gap-2">
            <img
              src={book.imageUrl || "https://via.placeholder.com/150"}
              alt={book.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">{book.title}</h3>
            <p className="text-gray-700 dark:text-gray-300">{book.description}</p>
            <p className="text-gray-700 dark:text-gray-300">Price: ${book.price}</p>
            <div className="mt-2 flex justify-between">
              <Link
                to={`/dashboard/edit-book/${book._id}`}
                className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
              >
                Edit
              </Link>
              <span className={`px-3 py-1 rounded ${book.isActive ? "bg-green-500" : "bg-gray-400"} text-white`}>
                {book.isActive ? "Published" : "Unpublished"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBooks;
