import React, { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";

const MyBooks = ({ user }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:3000/books?addedBy=${user.email}`);
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [user.email]);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-6 text-center">My Books</h1>
      {books.length === 0 ? (
        <p className="text-center text-gray-500">You have not added any books yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
