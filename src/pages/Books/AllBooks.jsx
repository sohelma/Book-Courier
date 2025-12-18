  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import { FaSearch } from "react-icons/fa";

  const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // "asc" বা "desc"

    useEffect(() => {
      const fetchBooks = async () => {
        try {
          setLoading(true);
          const res = await axios.get("https://book-courier-server-six.vercel.app/books");
          console.log("Books from server:", res.data); // Debug line
          setBooks(res.data);
        } catch (err) {
          console.error(err);
          setBooks([]);
        } finally {
          setLoading(false);
        }
      };
      fetchBooks();
    }, []);

    // Filter + Sort
    const filteredBooks = books
      .filter(
        (book) =>
          book?.title?.toLowerCase().includes(search.toLowerCase()) ||
          (book?.price && book.price.toString().includes(search))
      )
      .sort((a, b) => {
        if (sortOrder === "asc") return a.price - b.price;
        if (sortOrder === "desc") return b.price - a.price;
        return 0;
      });

    // Limit 8 books after filter & sort
    const limitedBooks = filteredBooks.slice(0, 8);

    return (
      <div className="p-6 min-h-screen dark:bg-gray-900 transition-colors">
        <h1 className="text-3xl font-bold mb-6 text-center dark:text-indigo-400">
          All Books
        </h1>

        {/* Search & Sort */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
          <div className="relative w-full md:w-1/3">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-300" />
            <input
              type="text"
              placeholder="Search by title ..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border 
                border-gray-300 dark:border-gray-600 
                rounded-lg focus:outline-none focus:ring 
                focus:ring-indigo-300 
                bg-white dark:bg-gray-800 
                text-gray-900 dark:text-gray-200 
                placeholder-gray-400 dark:placeholder-gray-400"
            />
          </div>

          <select
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 
              rounded-lg w-full md:w-1/4 
              focus:outline-none focus:ring focus:ring-indigo-300 
              bg-white dark:bg-gray-800 
              text-gray-900 dark:text-gray-200"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" value="">
              Sort by price
            </option>
            <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" value="asc">
              Price: Low to High
            </option>
            <option className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200" value="desc">
              Price: High to Low
            </option>
          </select>
        </div>

        {/* Loader */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent border-r-transparent rounded-full animate-spin"></div>
          </div>
        ) : limitedBooks.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            No books found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {limitedBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <img
                    src={book?.imageUrl || "/images/placeholder.png"}
                    alt={book?.title || "Book Image"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
                  {book?.title || "Untitled"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1 line-clamp-2">
                  {book?.description || "No description available."}
                </p>
                <p className="text-gray-700 dark:text-gray-200 font-semibold mt-2">
                  Price: ${book?.price ?? "N/A"}
                </p>

                <Link
                  to={`/books/${book?._id}`}
                  className="mt-3 inline-block px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm transition w-full text-center"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default AllBooks;
