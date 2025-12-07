// src/pages/Dashboard/Dashboard.jsx
import React from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
  const userRole = "user"; // example, from Firebase / DB

  return (
    <div className="min-h-[80vh] p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <ul className="space-y-3">
            <li>
              <a href="/dashboard/profile" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600">
                My Profile
              </a>
            </li>
            {userRole === "user" && (
              <>
                <li>
                  <a href="/dashboard/orders" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600">
                    My Orders
                  </a>
                </li>
                <li>
                  <a href="/dashboard/wishlist" className="block text-gray-700 dark:text-gray-200 hover:text-blue-600">
                    My Wishlist
                  </a>
                </li>
              </>
            )}
          </ul>
        </aside>

        <main className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
