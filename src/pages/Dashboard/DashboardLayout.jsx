import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import Navbar from "../shared/Navbar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="flex flex-col md:flex-row gap-6 p-6">
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
          <Sidebar />
        </aside>
        <main className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <React.Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </React.Suspense>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
