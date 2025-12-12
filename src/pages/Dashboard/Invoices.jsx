// src/pages/Dashboard/Invoices.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Invoices = () => {
  const { user } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.email) return;
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:3000/payments?email=${user.email}`);
        setPayments(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch payments");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [user?.email]);

  return (
    <div className="min-h-[80vh] p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Toaster position="top-right" />
      <h2 className="text-3xl font-bold text-indigo-600 mb-6">Invoices</h2>

      {loading ? (
        <p>Loading...</p>
      ) : payments.length === 0 ? (
        <p>No payments found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <thead className="bg-indigo-500 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Payment ID</th>
                <th className="py-3 px-4 text-left">Book</th>
                <th className="py-3 px-4 text-left">Amount</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="border-b last:border-none hover:bg-gradient-to-r hover:from-indigo-100 hover:to-indigo-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-colors"
                >
                  <td className="py-2 px-4 font-mono text-sm">{p._id}</td>
                  <td className="py-2 px-4">{p.bookTitle || "-"}</td>
                  <td className="py-2 px-4">${p.price || "-"}</td>
                  <td className="py-2 px-4">{new Date(p.paidAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Invoices;
