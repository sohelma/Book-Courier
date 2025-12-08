import React from "react";

const MyProfile = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">My Profile</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg">
          <div className="font-semibold">sohel mamun</div>
          <div className="text-sm text-gray-500">sohel@example.com</div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 border rounded-lg">
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
