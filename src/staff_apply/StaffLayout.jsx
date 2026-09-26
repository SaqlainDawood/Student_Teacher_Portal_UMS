// src/staff_apply/StaffLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import StaffAPI from "../services/staffApi";
export const isStaffAuthenticated = () => !!sessionStorage.getItem("staffToken");
export function PublicRoute({ children }) {
  if (isStaffAuthenticated()) {
    return <Navigate to="/staff/dashboard" replace />;
  }
  return children;
}
export function ProtectedRoute({ children }) {
  const location = useLocation();

  if (!isStaffAuthenticated()) {
    return (
      <Navigate
        to="/staff/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }
  return children;
}
export function StaffIndex() {
  const [checking, setChecking] = useState(true);
  const [target, setTarget] = useState("/staff/login");

  useEffect(() => {
    const decide = async () => {
      if (!isStaffAuthenticated()) {
        setTarget("/staff/login");
        setChecking(false);
        return;
      }

      try {
        const res = await StaffAPI.get("/staff/application");
        const staff = res.data?.staff;

        if (staff?.isSubmitted) {
          setTarget("/staff/dashboard");
        } else if (!staff?.step6_applyFor?.jobPost) {
          setTarget("/staff/jobs");
        } else {
          setTarget("/staff/application");
        }
      } catch (err) {
        if (err.response?.status === 401) {
          setTarget("/staff/login");
        } else {
          setTarget("/staff/dashboard");
        }
      } finally {
        setChecking(false);
      }
    };

    decide();
  }, []);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950">
        <div className="w-14 h-14 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Navigate to={target} replace />;
}

export default function StaffLayout() {
  return <Outlet />;
}