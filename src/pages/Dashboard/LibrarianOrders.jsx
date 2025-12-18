// src/pages/Dashboard/LibrarianOrders.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const SkeletonRow = () => (
  <tr className="border-t animate-pulse bg-gray-200 dark:bg-gray-700">
    <td className="p-2 h-8"></td>
    <td className="p-2 h-8"></td>
    <td className="p-2 h-8"></td>
    <td className="p-2 h-8"></td>
  </tr>
);

const LibrarianOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://book-courier-server-six.vercel.app/librarian-orders?email=${user.email}`
        );
        setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `https://book-courier-server-six.vercel.app/orders/status/${orderId}`,
        { status: newStatus }
      );
      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status: newStatus } : o
        )
      );
      toast.success("Order status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  const handleCancel = async orderId => {
    try {
      await axios.patch(
        `https://book-courier-server-six.vercel.app/orders/cancel/${orderId}`
      );
      setOrders(prev =>
        prev.map(o =>
          o._id === orderId ? { ...o, status: "cancelled" } : o
        )
      );
      toast.success("Order cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  return (
    <div className="p-4 min-h-screen bg-gray-100 dark:bg-gray-900">
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />

      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Librarian Orders
      </h2>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block rounded-lg shadow overflow-hidden">
        <table className="w-full border border-gray-300 dark:border-gray-600 table-fixed">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-2 text-left w-[30%]">Book</th>
              <th className="p-2 text-left w-[30%]">Customer</th>
              <th className="p-2 text-center w-[15%]">Status</th>
              <th className="p-2 text-center w-[25%]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array(4)
                .fill(0)
                .map((_, i) => <SkeletonRow key={i} />)
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center p-4 text-gray-700 dark:text-gray-300"
                >
                  No orders found
                </td>
              </tr>
            ) : (
              orders.map(order => (
                <tr
                  key={order._id}
                  className="border-t border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                >
                  <td className="p-2 break-words text-gray-900 dark:text-gray-100">
                    {order.bookTitle}
                  </td>
                  <td className="p-2 break-words text-gray-700 dark:text-gray-300">
                    {order.name} ({order.email})
                  </td>
                  <td className="p-2 text-center capitalize text-gray-800 dark:text-gray-200">
                    {order.status}
                  </td>
                  <td className="p-2">
                    {order.status !== "cancelled" && (
                      <div className="flex justify-center gap-2 flex-wrap">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              order._id,
                              order.status === "pending"
                                ? "shipped"
                                : order.status === "shipped"
                                ? "delivered"
                                : order.status
                            )
                          }
                          className={`px-3 py-1 rounded text-white ${
                            order.status === "pending"
                              ? "bg-sky-500 hover:bg-sky-600"
                              : order.status === "shipped"
                              ? "bg-blue-500 hover:bg-blue-600"
                              : "bg-gray-400 cursor-not-allowed"
                          }`}
                        >
                          {order.status === "pending"
                            ? "Mark Shipped"
                            : order.status === "shipped"
                            ? "Mark Delivered"
                            : "-"}
                        </button>
                        <button
                          onClick={() => handleCancel(order._id)}
                          className="px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ===== MOBILE CARD VIEW ===== */}
      <div className="grid gap-4 md:hidden">
        {loading ? (
          <div className="p-4 rounded-lg bg-gray-200 dark:bg-gray-700 animate-pulse h-24" />
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300">
            No orders found
          </p>
        ) : (
          orders.map(order => (
            <div
              key={order._id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">
                {order.bookTitle}
              </h3>

              <p className="text-sm text-gray-500 break-words mb-1">
                {order.name} ({order.email})
              </p>

              <p className="capitalize text-gray-700 dark:text-gray-300 mb-3">
                Status: {order.status}
              </p>

              {order.status !== "cancelled" && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      handleStatusChange(
                        order._id,
                        order.status === "pending"
                          ? "shipped"
                          : order.status === "shipped"
                          ? "delivered"
                          : order.status
                      )
                    }
                    className="flex-1 px-3 py-1 bg-sky-500 hover:bg-sky-600 text-white rounded"
                  >
                    {order.status === "pending"
                      ? "Mark Shipped"
                      : "Mark Delivered"}
                  </button>
                  <button
                    onClick={() => handleCancel(order._id)}
                    className="flex-1 px-3 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LibrarianOrders;
