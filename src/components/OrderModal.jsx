// src/components/OrderModal.jsx
import React, { useState } from "react";
import axios from "axios"; // <-- add this

const OrderModal = ({ visible, onClose, book }) => {
  if (!visible) return null;

  const user = {
    name: "John Doe",
    email: "john@example.com",
  };

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleOrder = async () => {
    const orderData = {
      bookId: book._id,
      bookTitle: book.title,
      name: user.name,
      email: user.email,
      phone,
      address,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
    };

    try {
      await axios.post("http://localhost:3000/orders", orderData);
      alert("Order placed successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-xl shadow-2xl w-96 max-h-[85vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-4">Place Order</h2>

        <label className="block mb-1 font-medium">Name</label>
        <input value={user.name} readOnly className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700" />

        <label className="block mb-1 font-medium">Email</label>
        <input value={user.email} readOnly className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700" />

        <label className="block mb-1 font-medium">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-2 mb-3 border rounded bg-gray-100 dark:bg-gray-700"
        />

        <label className="block mb-1 font-medium">Address</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full p-2 mb-4 border rounded bg-gray-100 dark:bg-gray-700"
        />

        <button
          onClick={handleOrder}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Place Order
        </button>

        <div className="mt-auto pt-4 border-t border-gray-300 dark:border-gray-700 flex justify-between text-sm">
          <p className="text-gray-500 dark:text-gray-400">Need help?</p>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
