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

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!orders.length) return <p className="text-center py-10">No orders found</p>;

  return (
    <div className="p-4">
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />

      <h2 className="text-2xl font-bold mb-6 text-indigo-500">
        My Orders
      </h2>

      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border rounded-lg table-auto">
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
              <tr key={order._id} className="border-t hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="p-2 flex items-center gap-2 max-w-[200px] truncate">
                  {order.bookImage && (
                    <img
                      src={order.bookImage}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <span className="truncate">{order.bookTitle}</span>
                </td>
                <td className="p-2 text-center">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="p-2 text-center">${order.price || "N/A"}</td>
                <td className="p-2 text-center capitalize">
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

      {/* MOBILE CARD */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-3 mb-2">
              {order.bookImage && (
                <img
                  src={order.bookImage}
                  className="w-14 h-14 rounded object-cover flex-shrink-0"
                />
              )}
              <div className="truncate">
                <p className="font-semibold truncate">{order.bookTitle}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-sm">Price: ${order.price}</p>
            <p className="text-sm mb-3 capitalize">
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
