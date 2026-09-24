// src/student_apply/StudentApplyLayout.jsx
import React, { useEffect, useState } from "react";
import { Outlet, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useStudentAuth } from "../context/StudentAuthContext";
import API from "../services/api";

/* ============================================================
   PUBLIC ROUTE — redirect to profile if logged in
   ============================================================ */
export function PublicRoute({ children }) {
  const { isAuthenticated } = useStudentAuth();
  if (isAuthenticated) {
    return <Navigate to="/student/apply/profile" replace />;
  }
  return children;
}

/* ============================================================
   PROTECTED ROUTE — redirect to login if not logged in
   ============================================================ */
export function ProtectedRoute({ children }) {
  const { isAuthenticated } = useStudentAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/student/apply/login"
        state={{ from: location.pathname }}
        replace
      />
    );
  }
  return children;
}

/* ============================================================
   SMART INDEX — /student/apply
   ============================================================ */
export function StudentApplyIndex() {
  const { isAuthenticated } = useStudentAuth();
  const [checking, setChecking] = useState(true);
  const [target, setTarget] = useState("/student/apply/login");
  const navigate = useNavigate();

  useEffect(() => {
    const decide = async () => {
      if (!isAuthenticated) {
        setTarget("/student/apply/login");
        setChecking(false);
        return;
      }

      try {
        const res = await API.get("/students/profile");
        if (res.data?.success && res.data.student) {
          const lastStep = res.data.student.lastStepCompleted || 0;
          if (lastStep >= 4) {
            setTarget("/student/apply/profile");
          } else {
            setTarget("/student/apply/steps");
          }
        } else {
          setTarget("/student/apply/steps");
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
          setTarget("/student/apply/login");
        } else {
          setTarget("/student/apply/steps");
        }
      } finally {
        setChecking(false);
      }
    };

    decide();
  }, [isAuthenticated]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="w-14 h-14 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return <Navigate to={target} replace />;
}

/* ============================================================
   LAYOUT — just renders <Outlet />
   ============================================================ */
export default function StudentApplyLayout() {
  return <Outlet />;
}