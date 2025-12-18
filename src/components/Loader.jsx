// src/components/Loader.jsx
import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100/70 dark:bg-gray-900/70 z-50">
      <div className="w-15 h-15 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
