import { Link, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTooth,
  FaNotesMedical,
  FaFileInvoiceDollar,
  FaBoxOpen,
  FaUserFriends,
  FaChartBar, // ✅ Replaced FaTeeth with FaChartBar
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Availability", path: "/availability", icon: <FaCalendarAlt /> },
    { name: "Treatment", path: "/treatment", icon: <FaTooth /> },
    { name: "Follow-Up", path: "/followup", icon: <FaNotesMedical /> },
    { name: "Billing", path: "/billing", icon: <FaFileInvoiceDollar /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxOpen /> },
    { name: "Patient Sync", path: "/patient-dashboard", icon: <FaUserFriends /> },
 
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm h-screen">
      <div>
        {/* Logo Section */}
        <div className="p-6 text-xl font-bold flex items-center justify-center text-blue-600 border-b border-gray-100 select-none">
          🦷 <span className="ml-2">MEDICARE</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col mt-4 space-y-2 px-4">
          {links.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 border text-sm no-underline select-none ${
                  active
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                }`}
                style={{
                  textDecoration: "none",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Info Section */}
      <div className="text-center py-4 border-t border-gray-100 text-xs text-gray-400">
        <p>© {new Date().getFullYear()} Medicare Dental</p>
      </div>
    </aside>
  );
}
