// src/components/OrderModal.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const OrderModal = ({ visible, onClose, book }) => {
  const { user } = useAuth(); // logged-in user
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  if (!visible) return null;

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user?.email) {
      toast.error("Please login first!");
      return;
    }

    if (!phone || !address) {
      toast.error("Please fill phone and address");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        email: user.email,       // context থেকে login email
        bookId: book._id,
        bookTitle: book.title,
        price: book.price,
        status: "pending",
        paymentStatus: "pending",
        createdAt: new Date(),
        phone,
        address,
      };

      const res = await axios.post("https://book-courier-server-six.vercel.app/orders", orderData);

      if (res.status === 200) {
        toast.success("Order placed successfully!");
        setPhone("");
        setAddress("");
        onClose(); // modal বন্ধ
      } else {
        toast.error("Failed to place order");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Toaster position="top-right" />

      <Toaster
  position="top-right"
  toastOptions={{
    duration: 1500, // 1.5 second
  }}
/>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Place Order for: {book.title}
        </h2>

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Phone</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-200 mb-1">Address</label>
            <textarea
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-100 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition flex items-center justify-center"
            >
              {loading && (
                <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              )}
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;
