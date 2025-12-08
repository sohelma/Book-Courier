import React from "react";

const Overview = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-medium text-indigo-600">Total Orders</div>
          <div className="text-2xl font-bold mt-2">24</div>
        </div>

        <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-medium text-indigo-600">Completed</div>
          <div className="text-2xl font-bold mt-2">18</div>
        </div>

        <div className="p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg border border-indigo-100 dark:border-indigo-800">
          <div className="text-sm font-medium text-indigo-600">Pending</div>
          <div className="text-2xl font-bold mt-2">6</div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Recent Orders</h3>
        <div className="space-y-3">
          <div className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">The Great Gatsby</div>
                <div className="text-sm text-gray-500">Ordered on 2025-12-01</div>
              </div>
              <div className="text-indigo-600 font-semibold">Pending</div>
            </div>
          </div>

          {/* add more */}
        </div>
      </div>
    </div>
  );
};

export default Overview;
