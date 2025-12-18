import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail") || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState("published");
  const [saving, setSaving] = useState(false);

  const handleAddBook = async () => {

    console.log("Adding book by:", userEmail); 

    if (!title || !description || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    setSaving(true);
    try {
      const res = await axios.post("https://book-courier-server-six.vercel.app/books", {
        title: title || "",
        description: description || "",
        price: price || "",
        imageUrl: imageUrl || "",
        status,
        isActive: status === "published",
        addedBy: userEmail, // auto set
      });

      console.log("Inserted book id:", res.data.insertedId);
      toast.success("Book added successfully!");
      navigate("/dashboard/my-books");
    } catch (err) {
      console.error("Failed to add book:", err);
      toast.error("Failed to add book");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-[80vh] p-6 sm:p-10 bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-indigo-500 mb-8 text-center">
        Add New Book
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
          onClick={handleAddBook}
          disabled={saving}
          className="w-full py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium mt-4 transition"
        >
          {saving ? "Saving..." : "Add Book"}
        </button>
      </div>
    </div>
  );
};

export default AddBook;
