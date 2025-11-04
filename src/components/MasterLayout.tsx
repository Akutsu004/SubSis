import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCalendarAlt,
  FaTooth,
  FaNotesMedical,
  FaFileInvoiceDollar,
  FaBoxOpen,
  FaUserFriends,
  FaSignOutAlt,
  FaChartBar,
  
  
} from "react-icons/fa";

export default function MasterLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("dentistLoggedIn");
    navigate("/login", { replace: true });
  };

  const navLinks = [
    
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Availability", path: "/availability", icon: <FaCalendarAlt /> },
    { name: "Treatment", path: "/treatment", icon: <FaTooth /> },
   
    { name: "Follow-Up", path: "/followup", icon: <FaNotesMedical /> },
    { name: "Billing", path: "/billing", icon: <FaFileInvoiceDollar /> },
    { name: "Inventory", path: "/inventory", icon: <FaBoxOpen /> },
    { name: "Patients", path: "/patient-dashboard", icon: <FaUserFriends /> },
     { name: "Dental Chart", path: "/dental-chart", icon: <FaChartBar /> },
 

  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between shadow-sm">
        <div>
          {/* Logo */}
          <div className="p-6 text-xl font-bold flex items-center justify-center text-blue-600 border-b border-gray-100 select-none">
            🦷 <span className="ml-2">MEDICARE</span>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col mt-4 space-y-2 px-4">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 border text-sm no-underline focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none ${
                    active
                      ? "bg-blue-600 text-white border-blue-600 shadow-md"
                      : "bg-white text-gray-700 border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300"
                  }`}
                  style={{
                    textDecoration: "none",
                    WebkitTapHighlightColor: "transparent", // removes mobile tap highlight
                  }}
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2 py-2 rounded-lg text-red-500 border border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200 font-semibold focus:outline-none focus:ring-0 active:outline-none active:ring-0 select-none"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          <FaSignOutAlt className="text-lg" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm p-5 flex justify-between items-center border-b border-gray-200 sticky top-0 z-10">
          <h1 className="text-2xl font-semibold text-gray-700 capitalize tracking-wide">
            {location.pathname.replace("/", "") || "Dashboard"}
          </h1>

          <div className="flex items-center gap-4">
            <span className="text-gray-500 text-sm">
              Welcome,&nbsp;
              <span className="font-medium text-gray-700">
                {localStorage.getItem("dentistName") || "Dentist"}
              </span>
            </span>
            <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold shadow-sm">
              {localStorage.getItem("dentistName")?.[0]?.toUpperCase() || "D"}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 overflow-y-auto bg-gray-50 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
