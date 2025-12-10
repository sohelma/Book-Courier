import React from "react";

const MyProfile = () => {
  return (
    <div className="text-gray-900 dark:text-gray-200">
      <h2 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
        My Profile
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
          <div className="font-semibold">sohel mamun</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            sohel@example.com
          </div>
        </div>

        <div className="p-4 bg-gray-100 dark:bg-gray-800 border dark:border-gray-700 rounded-lg">
          <button className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
