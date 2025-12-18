import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

// Loader Component
const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-100/70 dark:bg-gray-900/70 z-50">
    <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/orders?email=${user.email}`
        );

        const ordersWithImage = await Promise.all(
          res.data.map(async (order) => {
            try {
              const bookRes = await axios.get(
                `http://localhost:3000/books/${order.bookId}`
              );
              return { ...order, bookImage: bookRes.data.imageUrl };
            } catch {
              return { ...order, bookImage: "" };
            }
          })
        );

        setOrders(ordersWithImage);
      } catch {
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleCancel = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${id}`);
      setOrders((prev) =>
        prev.map((o) =>
          o._id === id ? { ...o, status: "cancelled" } : o
        )
      );
      toast.success("Order cancelled", { duration: 1200 });
    } catch {
      toast.error("Cancel failed", { duration: 1200 });
    }
  };

  const handlePay = (order) => {
    navigate(`/dashboard/payment/${order._id}`, { state: { order } });
  };

  if (loading) return <Loader />;

  if (!orders.length)
    return (
      <p className="text-center py-10 text-gray-700 dark:text-gray-300">
        No orders found
      </p>
    );

  return (
    <div className="p-4 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />

      <h2 className="text-2xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
        My Orders
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border border-gray-300 dark:border-gray-600 table-auto">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-2 text-left">Book</th>
              <th className="p-2 text-center">Date</th>
              <th className="p-2 text-center">Price</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order._id}
                className="border-t hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="p-2 flex items-center gap-2 max-w-[200px] truncate">
                  {order.bookImage && (
                    <img
                      src={order.bookImage}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <span className="truncate text-gray-900 dark:text-gray-100">
                    {order.bookTitle}
                  </span>
                </td>
                <td className="p-2 text-center text-gray-800 dark:text-gray-200">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-center text-gray-800 dark:text-gray-200">
                  ${order.price || "N/A"}
                </td>
                <td className="p-2 text-center text-gray-800 dark:text-gray-200 capitalize">
                  {order.status === "cancelled"
                    ? "Cancelled"
                    : order.paymentStatus === "paid"
                    ? "Paid"
                    : "Pending"}
                </td>
                <td className="p-2 text-center">
                  {order.status === "pending" && order.paymentStatus !== "paid" && (
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 bg-sky-500 text-white rounded w-full sm:w-auto"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePay(order)}
                        className="px-3 py-1 bg-indigo-500 text-white rounded w-full sm:w-auto"
                      >
                        Pay Now
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile/Table Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-3 mb-2">
              {order.bookImage && (
                <img
                  src={order.bookImage}
                  className="w-14 h-14 rounded object-cover flex-shrink-0"
                />
              )}
              <div className="truncate">
                <p className="font-semibold truncate text-gray-900 dark:text-gray-100">
                  {order.bookTitle}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-800 dark:text-gray-200">
              Price: ${order.price}
            </p>
            <p className="text-sm mb-3 text-gray-800 dark:text-gray-200 capitalize">
              Status:{" "}
              {order.status === "cancelled"
                ? "Cancelled"
                : order.paymentStatus === "paid"
                ? "Paid"
                : "Pending"}
            </p>

            {order.status === "pending" && order.paymentStatus !== "paid" && (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleCancel(order._id)}
                  className="w-full py-2 bg-sky-500 text-white rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handlePay(order)}
                  className="w-full py-2 bg-indigo-500 text-white rounded"
                >
                  Pay Now
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
