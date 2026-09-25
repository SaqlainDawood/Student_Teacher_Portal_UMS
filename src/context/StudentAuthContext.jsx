// src/context/StudentAuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import API from "../services/api";

export const StudentAuthContext = createContext(null);

export const StudentAuthProvider = ({ children }) => {
  const [studentToken, setStudentToken] = useState(
    sessionStorage.getItem("studentToken") || null
  );

  const [student, setStudent] = useState(() => {
    try {
      const stored = sessionStorage.getItem("studentData");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // ============================================================
  // LOGIN
  // ============================================================
  const loginStudent = (token, studentData) => {
    sessionStorage.setItem("studentToken", token);
    sessionStorage.setItem("studentData", JSON.stringify(studentData));
    setStudentToken(token);
    setStudent(studentData);
  };

  // ============================================================
  // LOGOUT
  // ============================================================
  const logoutStudent = () => {
    sessionStorage.removeItem("studentToken");
    sessionStorage.removeItem("studentData");
    sessionStorage.removeItem("studentId");
    setStudentToken(null);
    setStudent(null);
  };

  // ============================================================
  // VERIFY TOKEN ON MOUNT
  // ============================================================
  useEffect(() => {
    const verifyToken = async () => {
      if (!studentToken) return;

      try {
        // API path updated: /students/auth/me
        const res = await API.get("/students/auth/me");
        if (res.data?.success) {
          setStudent(res.data.student);
          sessionStorage.setItem(
            "studentData",
            JSON.stringify(res.data.student)
          );
        }
      } catch (err) {
        if (err.response?.status === 401) {
          logoutStudent();
        }
      }
    };

    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StudentAuthContext.Provider
      value={{
        studentToken,
        student,
        loading,
        setLoading,
        loginStudent,
        logoutStudent,
        isAuthenticated: !!studentToken,
      }}
    >
      {children}
    </StudentAuthContext.Provider>
  );
};

export const useStudentAuth = () => {
  const context = useContext(StudentAuthContext);
  if (!context) {
    throw new Error("useStudentAuth must be used within StudentAuthProvider");
  }
  return context;
};