// src/pages/Dashboard/MyOrders.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyOrders = () => {
  const user = { email: "john@example.com" }; // Firebase auth later
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders?email=${user.email}`);
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

  // Cancel order
  const handleCancel = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
      setOrders(prev => prev.map(o => (o._id === id ? { ...o, status: "cancelled" } : o)));
      toast.success("Order cancelled successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  if (loading) return <p className="text-gray-700 dark:text-gray-300">Loading orders...</p>;

  return (
    <div className="p-6 transition-colors duration-300 min-h-[80vh] bg-gray-50 dark:bg-gray-900">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        My Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
            <tr>
              <th className="p-3 text-left">Book</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-900 dark:text-gray-200">
            {orders.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500 dark:text-gray-400">
                  You have no orders yet.
                </td>
              </tr>
            )}

            {orders.map((order, index) => (
              <tr
                key={order._id}
                className={`border-t border-gray-200 dark:border-gray-700 transition-colors
                  ${index % 2 === 0 
                    ? "bg-gray-50 dark:bg-gray-800" 
                    : "bg-white dark:bg-gray-900"
                  } 
                  hover:bg-gray-100 dark:hover:bg-gray-700`}
              >
                <td className="p-3">{order.bookTitle}</td>
                <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-3 capitalize">{order.status} / {order.paymentStatus}</td>
                <td className="p-3 flex gap-2 flex-wrap">
                  {order.status === "pending" && order.paymentStatus === "unpaid" && (
                    <>
                      <Link
                        to={`/dashboard/payment/${order._id}`}
                        className="px-4 py-1 bg-cyan-500 text-white rounded hover:bg-cyan-600 transition text-sm"
                      >
                        Pay Now
                      </Link>
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-4 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition text-sm"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
