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
    <div className="p-6 min-h-[80vh] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold mb-6 text-black">Invoices</h2>

      {payments.length === 0 ? (
        <p className="text-gray-600">No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
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
      )}
    </div>
  );
};

export default PaymentList;
