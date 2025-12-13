import React from "react";
import { OrdersBarChart, OrdersLineChart, OrderStatusPieChart } from "../../components/DashboardChart";

const Overview = () => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-[80vh] space-y-6 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Overview</h2>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-80">
        <OrdersBarChart />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-80">
        <OrdersLineChart />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-80">
        <OrderStatusPieChart />
      </div>
    </div>
  );
};

export default Overview;
