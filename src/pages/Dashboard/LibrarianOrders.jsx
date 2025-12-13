// src/pages/Dashboard/LibrarianOrders.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const LibrarianOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/librarian-orders?email=${user.email}`);
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  // Update order status
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/orders/status/${orderId}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
      toast.success("Order status updated");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  // Cancel order
  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`http://localhost:3000/orders/cancel/${orderId}`);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o))
      );
      toast.success("Order cancelled");
    } catch (err) {
      console.error(err);
      toast.error("Failed to cancel order");
    }
  };

  if (loading) return <p className="text-center py-10">Loading orders...</p>;
  if (!orders.length) return <p className="text-center py-10">No orders found</p>;

  return (
    <div className="p-4">
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />
      <h2 className="text-2xl font-bold mb-6 text-indigo-500">Librarian Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-lg">
          <thead className="bg-indigo-500 text-white">
            <tr>
              <th className="p-2 text-left">Book</th>
              <th className="p-2 text-left">Customer</th>
              <th className="p-2 text-center">Status</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-t">
                <td className="p-2">{order.bookTitle}</td>
                <td className="p-2">{order.name} ({order.email})</td>
                <td className="p-2 text-center capitalize">{order.status}</td>
                <td className="p-2 text-center flex justify-center gap-2">
                  {order.status !== "cancelled" && (
                    <>
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
                        className="px-3 py-1 bg-green-500 text-white rounded"
                      >
                        {order.status === "pending"
                          ? "Mark Shipped"
                          : order.status === "shipped"
                          ? "Mark Delivered"
                          : "-"}
                      </button>
                      <button
                        onClick={() => handleCancel(order._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded"
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

export default LibrarianOrders;
