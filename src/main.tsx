import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login"; 
import MasterLayout from "./components/MasterLayout";
import type { JSX } from "react/jsx-runtime";

const pages = import.meta.glob("./pages/*.tsx", { eager: true });

const pageRoutes: { path: string; element: React.ReactNode }[] = Object.entries(pages).map(
  ([path, module]) => {
    const component = (module as any).default;

    // Convert file path to route path
    
    const fileName = path.split("/").pop()!.replace(".tsx", "");
    const routePath = "/" + fileName
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase();

    return { path: routePath, element: React.createElement(component) };
  }
);

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const loggedIn = localStorage.getItem("dentistLoggedIn") === "true";
  return loggedIn ? children : <Navigate to="/login" replace />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Public login route */}
        <Route path="/login" element={<Login />} />

        {/* Protected routes wrapped in layout */}
        <Route
          element={
            <ProtectedRoute>
              <MasterLayout />
            </ProtectedRoute>
          }
        >
          {pageRoutes.map((r) => (
            <Route key={r.path} path={r.path} element={r.element} />
          ))}
        </Route>

        {/* Redirect unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
