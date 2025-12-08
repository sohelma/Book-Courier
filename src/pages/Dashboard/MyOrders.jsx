import React from "react";

const MyOrders = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-600">My Orders</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">You will see your orders here.</p>

      <div className="mt-4">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left">
              <th>Book</th><th>Date</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td>The Hobbit</td><td>2025-12-01</td><td>Pending</td>
              <td><button className="btn btn-sm btn-outline">Cancel</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrders;
