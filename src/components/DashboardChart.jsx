// src/components/DashboardChart.jsx
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export const OrdersBarChart = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders?email=${user.email}`);
        setOrders(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (user?.email) fetchOrders();
  }, [user]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const ordersCount = new Array(12).fill(0);
  const paymentsCount = new Array(12).fill(0);

  orders.forEach(order => {
    const month = new Date(order.createdAt).getMonth();
    ordersCount[month]++;
    if(order.paymentStatus === "paid") paymentsCount[month]++;
  });

  const data = {
    labels: months,
    datasets: [
      { label: "Orders", data: ordersCount, backgroundColor: "rgba(59,130,246,0.7)" },
      { label: "Payments", data: paymentsCount, backgroundColor: "rgba(16,185,129,0.7)" },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, title: { display: true, text: "Orders & Payments" } },
  };

  return <Bar data={data} options={options} />;
};

export const OrdersLineChart = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders?email=${user.email}`);
        setOrders(res.data);
      } catch (err) { console.error(err); }
    };
    if (user?.email) fetchOrders();
  }, [user]);

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthlyOrders = new Array(12).fill(0);
  orders.forEach(order => monthlyOrders[new Date(order.createdAt).getMonth()]++);

  const data = {
    labels: months,
    datasets: [
      {
        label: "Orders",
        data: monthlyOrders,
        fill: true,
        backgroundColor: "rgba(59,130,246,0.3)",
        borderColor: "rgba(59,130,246,1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, title: { display: true, text: "Monthly Orders Trend" } },
  };

  return <Line data={data} options={options} />;
};

export const OrderStatusPieChart = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/orders?email=${user.email}`);
        setOrders(res.data);
      } catch (err) { console.error(err); }
    };
    if (user?.email) fetchOrders();
  }, [user]);

  const statusCount = { pending:0, paid:0, cancelled:0 };
  orders.forEach(order => {
    if(order.status === "cancelled") statusCount.cancelled++;
    else if(order.paymentStatus === "paid") statusCount.paid++;
    else statusCount.pending++;
  });

  const data = {
    labels: ["Pending","Paid","Cancelled"],
    datasets: [{
      data: [statusCount.pending, statusCount.paid, statusCount.cancelled],
      backgroundColor: ["rgba(249,115,22,0.7)", "rgba(16,185,129,0.7)", "rgba(239,68,68,0.7)"],
      borderWidth: 1,
    }],
  };

  const options = {
    responsive:true,
    maintainAspectRatio:false,
    plugins:{ legend:{ position:"bottom" }, title:{ display:true, text:"Order Status Distribution" } }
  };

  return <Pie data={data} options={options} />;
};
