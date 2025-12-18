import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import OrderModal from "../../components/OrderModal";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    axios
      .get(`https://book-courier-server-six.vercel.app/books/${id}`)
      .then(res => {
        setBook(res.data);
        setReviews(res.data.review || []);
      })
      .catch(() => toast.error("Failed to load book details"));
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!user) return toast.error("Login required");

    try {
      await axios.post("https://book-courier-server-six.vercel.app/wishlist", {
        bookId: book._id,
        bookTitle: book.title,
        email: user.email,
      });
      toast.success("Added to Wishlist!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Server Error");
    }
  };

  const handleSubmitReview = async () => {
    if (!user) return toast.error("Login required");
    if (!comment) return toast.error("Comment is required");

    try {
      const res = await axios.post(`https://book-courier-server-six.vercel.app/books/review/${book._id}`, {
        email: user.email,
        name: user.displayName || "Anonymous",
        rating,
        comment,
      });
      setReviews([...reviews, res.data.review]);
      setComment("");
      setRating(5);
      toast.success("Review added!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Server Error");
    }
  };

  if (!book) return <p className="p-6 text-center">Loading book details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <Toaster
        position="top-right"
        toastOptions={{
        duration: 500, // 0.5 second
      }}
/>


      <div className="w-full">
        <img
          src={book.imageUrl || "https://via.placeholder.com/300"}
          alt={book.title}
          className="w-full h-64 object-cover rounded-lg shadow"
        />
      </div>

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

        <button
          onClick={handleAddToWishlist}
          className="mt-2 px-5 py-2 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
        >
          Add to Wishlist
        </button>
      </div>

      <OrderModal visible={isModalOpen} onClose={() => setIsModalOpen(false)} book={book} />

      {/* Reviews */}
      <div className="md:col-span-2 mt-6">
        <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <label className="text-gray-700 dark:text-gray-300">Rating:</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="px-2 py-1 rounded border dark:bg-gray-700 dark:text-gray-200"
            >
              {[5,4,3,2,1].map((r) => (
                <option key={r} value={r}>{r} Star{r > 1 ? "s" : ""}</option>
              ))}
            </select>
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review..."
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-gray-200"
          />

          <button
            onClick={handleSubmitReview}
            className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Submit Review
          </button>
        </div>

        {reviews.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No reviews yet.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {reviews.map((r) => (
              <div key={r._id || r.comment} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex justify-between items-center mb-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">{r.name}</p>
                  <p className="text-yellow-500">{r.rating} ⭐</p>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{r.comment}</p>
                <p className="text-gray-500 text-sm">{new Date(r.createdAt || Date.now()).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;
