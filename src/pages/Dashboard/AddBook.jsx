import React, { useState } from "react";
import { toast } from "react-hot-toast";

const AddBook = ({ user }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("draft");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookData = {
        title,
        description,
        imageUrl,
        price,
        status,
        addedBy: user.email,
        createdAt: new Date(),
        isActive: status === "published",
      };

      const res = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        toast.success("Book added successfully!");
        setTitle("");
        setDescription("");
        setImageUrl("");
        setPrice("");
        setStatus("draft");
      } else {
        toast.error("Failed to add book");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to add book");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button className="px-6 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
