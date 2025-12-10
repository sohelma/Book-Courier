// src/pages/Dashboard/Sidebar.jsx
import React from "react";
import {
  FaHome,
  FaBook,
  FaPlus,
  FaUser,
  FaClipboardList,
  FaUsers,
} from "react-icons/fa";

const Sidebar = ({ collapsed = false, onToggle }) => {
  const baseItem =
    "flex items-center gap-3 px-3 py-2 rounded-lg " +
    "hover:bg-gray-200 dark:hover:bg-gray-700 " +
    "text-gray-700 dark:text-gray-200 transition";

  return (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } h-screen bg-gray-100 dark:bg-gray-900 
      border-r border-gray-300 dark:border-gray-700 
      p-4 flex flex-col justify-between transition-all duration-300 text-gray-900 dark:text-gray-200`}
    >
   

      {/* Navigation */}
      <nav className="space-y-1">
        <a href="/dashboard" className={baseItem + " bg-indigo-100 dark:bg-indigo-700/40"}>
          <FaHome className="w-5 h-5" />
          {!collapsed && <span>Overview</span>}
        </a>
        <a href="/dashboard/orders" className={baseItem}>
          <FaClipboardList className="w-5 h-5" />
          {!collapsed && <span>My Orders</span>}
        </a>
        <a href="/dashboard/add-book" className={baseItem}>
          <FaPlus className="w-5 h-5" />
          {!collapsed && <span>Add Book</span>}
        </a>
        <a href="/dashboard/my-books" className={baseItem}>
          <FaBook className="w-5 h-5" />
          {!collapsed && <span>My Books</span>}
        </a>
        <a href="/dashboard/profile" className={baseItem}>
          <FaUser className="w-5 h-5" />
          {!collapsed && <span>My Profile</span>}
        </a>
        <a href="/dashboard/users" className={baseItem}>
          <FaUsers className="w-5 h-5" />
          {!collapsed && <span>All Users</span>}
        </a>
      </nav>

      {!collapsed && (
        <div className="mt-6 text-xs text-gray-600 dark:text-gray-400">
          <div>
            Role:{" "}
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
              User
            </span>
          </div>
          <div className="mt-2">Manage orders, books & profile here.</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
