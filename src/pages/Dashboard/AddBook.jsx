// src/pages/Dashboard/AddBook.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const AddBook = () => {
  const { user } = useAuth(); // logged-in user
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("published");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddBook = async () => {
    if (!title || !price) {
      toast.error("Title and Price required!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:3000/books", {
        title,
        description,
        price: Number(price),
        status,
        imageUrl,
        addedBy: user.email, // ✅ logged-in user email
        createdAt: new Date(),
      });
      toast.success("Book added successfully!");
      setTitle(""); setDescription(""); setPrice(""); setImageUrl(""); setStatus("published");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Book Title" />
      <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
      <input value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="Image URL" />
      <select value={status} onChange={e => setStatus(e.target.value)}>
        <option value="published">Published</option>
        <option value="unpublished">Unpublished</option>
      </select>
      <button onClick={handleAddBook} disabled={loading}>
        {loading ? "Adding..." : "Add Book"}
      </button>
    </div>
  );
};

export default AddBook;
