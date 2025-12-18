import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const EditBook = () => {
  const { id: bookId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("published");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const userEmail = localStorage.getItem("userEmail") || "";

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(`https://book-courier-server-six.vercel.app/books/${bookId}`);
        const book = res.data;
        setTitle(book.title || "");
        setDescription(book.description || "");
        setPrice(book.price || "");
        setStatus(book.status || "unpublished");
        setImageUrl(book.imageUrl || "");
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch book");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  const handleSave = async () => {
    if (!title || !description || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.patch(`https://book-courier-server-six.vercel.app/books/${bookId}`, {
        title: title || "",
        description: description || "",
        price: price || "",
        imageUrl: imageUrl || "",
        status,
        isActive: status === "published",
        addedBy: userEmail, // auto set
      });

      console.log("Updated book id:", bookId);
      toast.success("Book updated successfully!");
      navigate("/dashboard/my-books");
    } catch (err) {
      console.error("Failed to update book:", err);
      toast.error("Failed to update book");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading book data...</p>;

  return (
    <div className="min-h-[80vh] p-6 sm:p-10 bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-indigo-500 mb-8 text-center">
        Edit Book
      </h2>

      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 flex flex-col gap-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Book Title"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Description
          </label>
          <textarea
            value={description || ""}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Book Description"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Price
          </label>
          <input
            type="number"
            value={price || ""}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Price"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-gray-700 dark:text-gray-200 font-medium mb-1">
            Image URL
          </label>
          <input
            type="text"
            value={imageUrl || ""}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Image URL"
          />
        </div>

        {/* Preview */}
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title}
            className="w-32 h-32 object-cover rounded mt-2 mx-auto"
          />
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium mt-4 transition"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default EditBook;
