// src/pages/Dashboard/PaymentList.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

const PaymentList = () => {
  const { user, loading } = useAuth();
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loading) return; // wait until auth ready
    if (!user?.email) {
      toast.error("Login first to see your payments!");
      setIsLoading(false);
      return;
    }

    const fetchPayments = async () => {
      try {
        const res = await fetch(`http://localhost:3000/payments?email=${user.email}`);
        const data = await res.json();
        setPayments(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load payments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPayments();
  }, [user, loading]);

  if (isLoading) return <p className="text-center py-10">Loading payments...</p>;

  return (
    <div className="p-4 sm:p-6 min-h-[80vh] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Toaster position="top-right" />

      <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Invoices</h2>

      {payments.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">No payments found.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border rounded-lg overflow-hidden">
              <thead className="bg-indigo-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <tr>
                  <th className="p-3 text-left">Payment ID</th>
                  <th className="p-3 text-left">Book Title</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Paid Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p._id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="p-3">{p._id}</td>
                    <td className="p-3">{p.bookTitle}</td>
                    <td className="p-3">${p.price || "N/A"}</td>
                    <td className="p-3">{p.paidAt ? new Date(p.paidAt).toLocaleString() : "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden flex flex-col gap-4">
            {payments.map((p) => (
              <div key={p._id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                <p className="text-sm font-semibold break-all">
                  <span className="text-gray-500 dark:text-gray-400">Payment ID:</span> {p._id}
                </p>
                <p className="text-sm font-medium">
                  <span className="text-gray-500 dark:text-gray-400">Book:</span> {p.bookTitle}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Amount:</span> ${p.price || "N/A"}
                </p>
                <p className="text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Paid At:</span> {p.paidAt ? new Date(p.paidAt).toLocaleString() : "N/A"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PaymentList;
