// src/pages/Dashboard/Dashboard.jsx
import React, { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  const [isDark, setIsDark] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const userRole = "user";

  return (
    <div className={isDark ? "dark" : ""}>
      {/* Fixed white background problem solved here */}
      <div
        className={`min-h-screen flex transition-colors duration-300 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        {/* Sidebar */}
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          userRole={userRole}
        />

        {/* Main content */}
        <main className="flex-1 p-6 transition-colors duration-300">
         
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
