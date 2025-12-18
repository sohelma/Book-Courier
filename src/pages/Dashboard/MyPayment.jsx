// src/pages/Dashboard/PaymentPage.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const PaymentPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const order = location.state?.order;

  if (!order) {
    return (
      <p className="text-center py-10 text-red-500">
        Order not found.
      </p>
    );
  }

  const handlePayment = async () => {
    setLoading(true);
    try {
      await axios.patch(`https://book-courier-server-six.vercel.app/orders/pay/${order._id}`, {
        phone: order.phone || "",
        address: order.address || "",
      });

      toast.success("Payment successful!");
      navigate("/dashboard/orders"); // back to MyOrders
    } catch (err) {
      console.error(err);
      toast.error("Payment failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-[80vh] bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center transition-colors duration-300">
      <Toaster position="top-right" />
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-indigo-600 text-center">
          Payment
        </h2>
        <h3 className="text-lg font-semibold mb-2">{order.bookTitle}</h3>
        <p className="mb-2">Price: ${order.price}</p>
        <p className="mb-4">Email: {user.email}</p>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition flex justify-center items-center"
        >
          {loading && (
            <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
          )}
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
