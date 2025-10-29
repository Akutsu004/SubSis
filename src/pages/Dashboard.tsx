import {
  FaCalendarAlt,
  FaClock,
  FaExclamationTriangle,
  FaUserMd,
  FaSmile,
  FaChartLine,
  FaTachometerAlt,
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

  // ✅ Chart Options
  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
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

  const chartSeries = [
    {
      name: "Patients Seen",
      data: [10, 14, 12, 18, 22, 15, 19],
    },
  ];

  return (
    <div className="container mx-auto space-y-10">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-2xl shadow-md p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <FaTachometerAlt className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">
              Welcome back,{" "}
              <span className="text-blue-600 font-bold">{dentistName}</span> 👋
            </h2>
            <p className="text-gray-600 mt-2 text-sm">
              Here’s your clinic overview for today.
            </p>
          </div>
        </div>

        <div className="mt-6 md:mt-0 text-right">
          <p className="text-sm text-gray-500">Today</p>
          <p className="text-lg font-medium text-gray-700">{today}</p>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-600" />
          Quick Statistics
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Appointments */}
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Appointments Today
                </h3>
                <p className="text-4xl font-bold text-blue-600 mt-2">6</p>
              </div>
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                <FaCalendarAlt size={22} />
              </div>
            </div>
          </div>

          {/* Follow-ups */}
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl border border-yellow-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Pending Follow-ups
                </h3>
                <p className="text-4xl font-bold text-yellow-500 mt-2">2</p>
              </div>
              <div className="p-3 bg-yellow-100 text-yellow-600 rounded-xl">
                <FaClock size={22} />
              </div>
            </div>
          </div>

          {/* Stock Alerts */}
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Stock Alerts
                </h3>
                <p className="text-4xl font-bold text-red-500 mt-2">3</p>
              </div>
              <div className="p-3 bg-red-100 text-red-600 rounded-xl">
                <FaExclamationTriangle size={22} />
              </div>
            </div>
          </div>

          {/* Patients Seen */}
          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Patients Seen
                </h3>
                <p className="text-4xl font-bold text-green-500 mt-2">15</p>
              </div>
              <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                <FaSmile size={22} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Performance */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaChartLine className="text-blue-600" />
          Weekly Performance
        </h3>

        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={250}
        />

        <p className="text-gray-500 text-sm mt-3">
          Track your weekly patient visits and performance trends here.
        </p>
      </div>

      {/* Overview */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <FaUserMd className="text-blue-600" />
          Today’s Overview
        </h3>
        <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
          <li>🦷 You have <b>6 appointments</b> scheduled today.</li>
          <li>💬 <b>2 patients</b> require follow-ups this week.</li>
          <li>📦 <b>3 inventory items</b> are running low.</li>
          <li>📊 You’ve attended <b>15 patients</b> this week so far.</li>
        </ul>
      </div>
    </div>
  );
}
