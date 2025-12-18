import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ManageBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://book-courier-server-six.vercel.app/books");
        setBooks(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const handleStatusToggle = async (bookId, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";

    try {
      await axios.patch(`https://book-courier-server-six.vercel.app/books/${bookId}`, {
        status: newStatus,
      });
      setBooks(prev =>
        prev.map(b =>
          b._id === bookId ? { ...b, status: newStatus } : b
        )
      );
      toast.success(`Book ${newStatus}!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async bookId => {
    if (
      !window.confirm(
        "Are you sure you want to delete this book? This will also delete related orders."
      )
    )
      return;

    try {
      await axios.patch(`https://book-courier-server-six.vercel.app/books/${bookId}`, {
        isActive: false,
      });
      setBooks(prev => prev.filter(b => b._id !== bookId));
      toast.success("Book deleted!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete book");
    }
  };

  if (loading) {
    return (
      <p className="text-center py-10 text-gray-700 dark:text-gray-300">
        Loading books...
      </p>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Manage Books
      </h2>

      {books.length === 0 ? (
        <p className="text-center text-gray-700 dark:text-gray-300">
          No books found
        </p>
      ) : (
        <>
          {/* ===== DESKTOP TABLE ===== */}
          <div className="hidden md:block">
            <table className="w-full border border-gray-300 dark:border-gray-600 table-fixed">
              <thead className="bg-indigo-500 text-white">
                <tr>
                  <th className="p-2 text-left w-[30%]">Title</th>
                  <th className="p-2 text-left w-[25%]">Added By</th>
                  <th className="p-2 text-left w-[10%]">Price</th>
                  <th className="p-2 text-center w-[15%]">Status</th>
                  <th className="p-2 text-center w-[20%]">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300 dark:divide-gray-600">
                {books.map(b => (
                  <tr key={b._id} className="bg-white dark:bg-gray-800">
                    <td className="p-2 break-words text-gray-900 dark:text-gray-100">
                      {b.title}
                    </td>
                    <td className="p-2 break-words text-gray-700 dark:text-gray-300">
                      {b.addedBy}
                    </td>
                    <td className="p-2 text-gray-800 dark:text-gray-200">
                      ${b.price}
                    </td>
                    <td className="p-2 text-center capitalize text-gray-800 dark:text-gray-200">
                      {b.status}
                    </td>
                    <td className="p-2">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleStatusToggle(b._id, b.status)
                          }
                          className="px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded"
                        >
                          {b.status === "published"
                            ? "Unpublish"
                            : "Publish"}
                        </button>
                        <button
                          onClick={() => handleDelete(b._id)}
                          className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ===== MOBILE CARD VIEW ===== */}
          <div className="grid gap-4 md:hidden">
            {books.map(b => (
              <div
                key={b._id}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                  {b.title}
                </h3>
                <p className="text-sm text-gray-500 mb-1">
                  Added by: {b.addedBy}
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-1">
                  Price: ${b.price}
                </p>
                <p className="capitalize text-gray-700 dark:text-gray-300 mb-3">
                  Status: {b.status}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(b._id, b.status)}
                    className="flex-1 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded"
                  >
                    {b.status === "published"
                      ? "Unpublish"
                      : "Publish"}
                  </button>
                  <button
                    onClick={() => handleDelete(b._id)}
                    className="flex-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageBooks;
