// src/pages/Dashboard/MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const MyOrders = () => {
  const user = {
    email: "john@example.com",
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/orders?email=${user.email}`
        );
        setOrders(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: "cancelled" } : o))
      );
      toast.success("Order cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  const handlePay = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/pay/${id}`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, paymentStatus: "paid" } : o
        )
      );
      toast.success("Payment Successful!");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
    }
  };

  if (loading)
    return (
      <p className="text-gray-600 dark:text-gray-300">Loading orders...</p>
    );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-[80vh] text-gray-900 dark:text-gray-200">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        My Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 dark:border-gray-700 rounded-lg">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Book</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
              >
                <td className="p-3">{order.bookTitle}</td>
                <td className="p-3">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 capitalize">
                  {order.status} / {order.paymentStatus}
                </td>
                <td className="p-3 flex gap-2 flex-wrap">
                  {order.status === "pending" &&
                    order.paymentStatus === "unpaid" && (
                      <button
                        onClick={() => handlePay(order._id)}
                        className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition text-sm"
                      >
                        Pay Now
                      </button>
                    )}

                  {order.status === "pending" && (
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition text-sm"
                    >
                      Cancel
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="p-4 text-center text-gray-600 dark:text-gray-400"
                >
                  You have no orders yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
