// src/pages/Dashboard/MyPayment.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast"; // optional, nicer than alert

const MyPayment = () => {
  const { id } = useParams(); // অর্ডার আইডি
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirmPayment = async () => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:3000/orders/pay/${id}`);
      toast.success("Payment successful!"); // nicer feedback
      navigate("/dashboard/orders"); // অর্ডার পেজে ফিরে যাবে
    } catch (err) {
      console.error(err);
      toast.error("Payment failed"); // nicer feedback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-md transition-colors">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
        Payment Page
      </h2>

      <p className="text-gray-800 dark:text-gray-200">
        Order ID: <strong>{id}</strong>
      </p>

      <button
        onClick={handleConfirmPayment}
        disabled={loading}
        className="mt-6 w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 transition"
      >
        {loading ? "Processing..." : "Confirm Payment"}
      </button>
    </div>
  );
};

export default MyPayment;
