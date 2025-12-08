// src/pages/Dashboard/DashboardLayout.jsx
import React from "react";
import Navbar from "../shared/Navbar"; // use same Navbar
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar with theme toggle */}
      <Navbar />

      <div className="flex flex-col md:flex-row gap-6 p-6">
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          {/* Sidebar links */}
        </aside>

        <main className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
