import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MasterLayout from "./components/MasterLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Availability from "./pages/Availability";
import Treatment from "./pages/Treatment";
import Followup from "./pages/Followup";
import Billing from "./pages/Billing";
import Inventory from "./pages/Inventory";
import PatientDashboardSync from "./pages/PatientDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login route */}
        <Route path="/login" element={<Login />} />

        {/* All pages inside MasterLayout */}
        <Route element={<MasterLayout />}>
          {/* Use replace to avoid the trivial history warning */}
          <Route path="/" element={<Navigate to="/Login" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/availability" element={<Availability />} />
          <Route path="/treatment" element={<Treatment />} />
          <Route path="/followup" element={<FollowUp />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/patient-dashboard" element={<PatientDashboardSync />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
