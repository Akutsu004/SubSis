import { BrowserRouter, Routes, Route } from "react-router-dom";
import MasterLayout from "./components/MasterLayout";

// 🦷 Pages
import Dashboard from "./pages/Dashboard";
import Availability from "./pages/Availability";
import Treatment from "./pages/Treatment";
import FollowUp from "./pages/Followup";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import PatientDashboard from "./pages/PatientDashboard";
import DentalChart from "./pages/DentalChart"; // ✅ NEW
import EMR from "./pages/EMR";

// 🧩 Optional: Non-layout pages like Login/Register
import Login from "./pages/Login"; // only if you have one

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Layout route — all pages inside share sidebar + header */}
        <Route element={<MasterLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/followup" element={<FollowUp />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/dental-chart" element={<DentalChart />} /> {/* 🦷 NEW PAGE */}
          <Route path="/emr" element={<EMR />} />
        </Route>

        {/* 🔐 Non-layout routes (no sidebar) */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
