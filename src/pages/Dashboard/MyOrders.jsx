// src/pages/Dashboard/MyOrders.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3000/orders?email=${user.email}`);
        const ordersData = res.data;

        // Book image fetch
        const ordersWithImage = await Promise.all(
          ordersData.map(async (order) => {
            try {
              const bookRes = await axios.get(`http://localhost:3000/books/${order.bookId}`);
              return { ...order, bookImage: bookRes.data.imageUrl };
            } catch {
              return { ...order, bookImage: "" };
            }
          })
        );

        setOrders(ordersWithImage);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${orderId}`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );
      toast.success("Order cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  const handlePay = (order) => {
    navigate(`/dashboard/payment/${order._id}`, { state: { order } });
  };

  if (loading) return <p className="text-center py-10">Loading...</p>;

  if (!orders.length) return <p className="text-center py-10">No orders found</p>;

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">My Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white dark:text-gray-100">
              <th className="p-2 text-left">Book</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Price</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
              >
                <td className="p-2 flex items-center gap-2">
                  {order.bookImage && (
                    <img
                      src={order.bookImage}
                      alt={order.bookTitle}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {order.bookTitle}
                  </span>
                </td>
                <td className="p-2 text-gray-700 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-gray-700 dark:text-gray-300">
                  ${order.price || "N/A"}
                </td>
                <td className="p-2 text-gray-700 dark:text-gray-300 capitalize">
                  {order.status === "cancelled"
                    ? "Cancelled"
                    : order.paymentStatus === "paid"
                    ? "Paid"
                    : "Pending"}
                </td>
                <td className="p-2 flex gap-2">
                  {order.status === "pending" && order.paymentStatus !== "paid" && (
                    <>
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePay(order)}
                        className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md text-sm"
                      >
                        Pay Now
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
