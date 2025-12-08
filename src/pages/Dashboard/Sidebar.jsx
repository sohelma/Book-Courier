import React from "react";
// If you prefer react-router NavLink, you can replace <a> with NavLink
// import { NavLink } from "react-router-dom";

const Sidebar = ({ collapsed = false, onToggle }) => {
  const baseItem = "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-700 transition";

  return (
    <div className="h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
      <div className={`flex items-center justify-between mb-6 ${collapsed ? "flex-col" : ""}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-indigo-500 flex items-center justify-center text-white font-bold">
            BC
          </div>
          {!collapsed && <div className="text-lg font-semibold text-indigo-600">BookCourier</div>}
        </div>

        <button
          onClick={onToggle}
          className="p-2 rounded-md bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "»" : "‹"}
        </button>
      </div>

      <nav className="space-y-1">
        <a href="/dashboard" className={baseItem + " text-indigo-600"}>
          <span className="w-6 text-center">🏠</span>
          {!collapsed && <span>Overview</span>}
        </a>

        <a href="/dashboard/my-orders" className={baseItem}>
          <span className="w-6 text-center">🧾</span>
          {!collapsed && <span>My Orders</span>}
        </a>

        <a href="/dashboard/add-book" className={baseItem}>
          <span className="w-6 text-center">➕</span>
          {!collapsed && <span>Add Book</span>}
        </a>

        <a href="/dashboard/my-books" className={baseItem}>
          <span className="w-6 text-center">📚</span>
          {!collapsed && <span>My Books</span>}
        </a>

        <a href="/dashboard/profile" className={baseItem}>
          <span className="w-6 text-center">👤</span>
          {!collapsed && <span>My Profile</span>}
        </a>

        <a href="/dashboard/orders" className={baseItem}>
          <span className="w-6 text-center">🚚</span>
          {!collapsed && <span>Orders (Librarian)</span>}
        </a>

        <a href="/dashboard/users" className={baseItem}>
          <span className="w-6 text-center">🛠️</span>
          {!collapsed && <span>All Users (Admin)</span>}
        </a>
      </nav>

      {!collapsed && (
        <div className="mt-6 text-xs text-gray-500">
          <div>Role: <span className="text-indigo-600 font-semibold">User</span></div>
          <div className="mt-2">You can manage orders and profile here.</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
