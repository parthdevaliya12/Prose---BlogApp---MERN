import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, MessageCircle, BarChart3, Activity } from "lucide-react";
import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalComments: 0,
    monthlyPosts: [],
  });

  const getAnalytics = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "/api/dashboard/dashboard-stats",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalytics();
  }, []);

  const generateLast6Months = () => {
    const labels = [];
    const values = [];
    const currentMonth = new Date().getMonth();

    for (let i = 5; i >= 0; i--) {
      const targetMonthIndex = (currentMonth - i + 12) % 12;
      const mongoMonthId = targetMonthIndex + 1;

      labels.push(MONTH_NAMES[targetMonthIndex]);

      const foundMonth = stats.monthlyPosts.find(
        (item) => item._id === mongoMonthId,
      );
      values.push(foundMonth ? foundMonth.total : 0);
    }

    return { labels, values };
  };

  const { labels, values } = generateLast6Months();

  const backgroundColors = labels.map((_, index) =>
    index % 2 === 0 ? "#1e293b" : "#64748b" // slate-900 and slate-500
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Posts Created",
        data: values,
        backgroundColor: backgroundColors,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="w-full space-y-8 font-sans">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
          Dashboard Analytics
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Overview of your blog performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Posts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
            <FileText size={24} />
          </div>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
            Total Posts
          </p>
          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            {stats.totalPosts}
          </h3>
        </div>

        {/* Total Comments */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700 mb-4">
            <MessageCircle size={24} />
          </div>
          <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">
            Total Comments
          </p>
          <h3 className="text-4xl font-bold text-slate-900 mt-2">
            {stats.totalComments}
          </h3>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
          <BarChart3 size={20} className="text-slate-500" />
          <h3 className="font-semibold text-slate-900">
            Monthly Growth
          </h3>
        </div>

        <div className="w-full h-[300px]">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    boxWidth: 12,
                    boxHeight: 12,
                    font: { family: "sans-serif", weight: "500", size: 12 },
                    color: "#64748b",
                  },
                },
                tooltip: {
                  padding: 12,
                  backgroundColor: "#0f172a",
                  titleFont: { weight: "600" },
                  borderRadius: 8,
                },
              },
              scales: {
                x: {
                  grid: { display: false },
                  ticks: { color: "#64748b", font: { weight: "500" } },
                },
                y: {
                  grid: { color: "#f1f5f9" },
                  ticks: {
                    color: "#64748b",
                    font: { weight: "500" },
                    precision: 0,
                  },
                },
              },
            }}
          />
        </div>
      </div>

      {/* Engagement */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Activity size={20} className="text-slate-500" />
          <h3 className="font-semibold text-slate-900">
            Engagement Metric
          </h3>
        </div>

        <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden mb-3">
          <div className="w-[75%] h-full rounded-full bg-slate-800" />
        </div>

        <p className="text-sm text-slate-600">
          Audience engagement index is stable at{" "}
          <span className="text-slate-900 font-bold">75%</span>
        </p>
      </div>
    </div>
  );
}
