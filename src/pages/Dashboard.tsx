import {
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaUserMd,
  FaSmile,
  FaChartLine,
} from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function Dashboard() {
  const dentistName = localStorage.getItem("dentistName") || "Dr. Dentist";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // ✅ Apex Chart Options
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false }
    },
    stroke: {
      curve: "smooth",
      width: 3
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    colors: ["#2563EB"],
    markers: {
      size: 5,
      colors: ["#1E40AF"],
      strokeWidth: 2,
      strokeColors: "#fff",
    },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      labels: { style: { colors: "#6B7280" } },
    },
    yaxis: {
      labels: { style: { colors: "#6B7280" } },
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4,
    },
    tooltip: { theme: "light" },
  };

  // ✅ Separate Series
  const chartSeries = [
    {
      name: "Patients Seen",
      data: [10, 14, 12, 18, 22, 15, 19]
    }
  ];

  return (
    <div className="container mx-auto space-y-10">

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-semibold text-gray-800">
            Welcome back,{" "}
            <span className="text-blue-600 font-bold">{dentistName}</span> 👋
          </h2>
          <p className="text-gray-600 mt-2 text-sm">
            Here’s your clinic overview for today.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-medium text-gray-700">{today}</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-blue-500 rounded-full"></span>
          Quick Stats
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Appointments Today
                </h3>
                <p className="text-4xl font-bold text-blue-600 mt-2">6</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl shadow-sm">
                <FaCalendarAlt size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Pending Follow-ups
                </h3>
                <p className="text-4xl font-bold text-yellow-500 mt-2">2</p>
              </div>
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl shadow-sm">
                <FaClock size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Stock Alerts
                </h3>
                <p className="text-4xl font-bold text-red-500 mt-2">3</p>
              </div>
              <div className="p-3 bg-red-100 text-red-600 rounded-xl shadow-sm">
                <FaExclamationTriangle size={22} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Patients Seen
                </h3>
                <p className="text-4xl font-bold text-green-500 mt-2">15</p>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-xl shadow-sm">
                <FaSmile size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-600" /> Weekly Performance
        </h3>

        {/* ✅ Correct Chart Implementation */}
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={250}
        />

        <p className="text-gray-500 text-sm mt-3">
          Keep track of your weekly appointments and patient activities here.
        </p>
      </div>

      {/* Overview */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaUserMd className="text-blue-600" /> Today’s Quick Overview
        </h3>
        <ul className="space-y-3 text-gray-600 text-sm">
          <li>🦷 You have <b>6 appointments</b> scheduled today.</li>
          <li>💬 <b>2 patients</b> need follow-ups this week.</li>
          <li>📦 <b>3 items</b> in inventory are running low.</li>
          <li>📊 You’ve attended <b>15 patients</b> this week so far.</li>
        </ul>
      </div>
    </div>
  );
}
