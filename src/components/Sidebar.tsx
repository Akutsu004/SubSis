import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Availability", path: "/availability" },
    { name: "Treatment", path: "/treatment" },
    { name: "Follow-Up", path: "/followup" },
    { name: "Billing", path: "/billing" },
    { name: "Inventory", path: "/inventory" },
    { name: "Patient Sync", path: "/patient-dashboard" },
  ];

  return (
    <div className="bg-blue-900 text-white w-64 min-h-screen p-6 fixed left-0 top-0">
      <h1 className="text-2xl font-bold mb-8">🦷 Dentist</h1>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`block py-2 px-4 rounded-lg transition ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-blue-700"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
