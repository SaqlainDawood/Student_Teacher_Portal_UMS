// src/pages/student/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../../services/api";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setMessage("Verification token is missing.");
        return;
      }

      try {
        const res = await API.post(`/students/auth/verify-email/${token}`);
        if (res.data?.success) {
          setStatus("success");
          setMessage(res.data.message || "Email verified successfully!");
          setTimeout(() => navigate("/student/login"), 3000);
        } else {
          setStatus("error");
          setMessage(res.data?.message || "Verification failed.");
        }
      } catch (err) {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Invalid or expired verification link."
        );
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 max-w-md w-full text-center">
        {status === "loading" && (
          <>
            <FaSpinner className="text-5xl text-indigo-600 animate-spin mx-auto" />
            <h2 className="text-xl font-bold text-gray-800 mt-6">
              Verifying your email...
            </h2>
            <p className="text-gray-500 mt-2">Please wait a moment.</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
              <FaCheckCircle className="text-green-600 text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Email Verified!
            </h2>
            <p className="text-gray-500 mt-2">{message}</p>
            <p className="text-sm text-gray-400 mt-4">
              Redirecting to login...
            </p>
            <Link
              to="/student/login"
              className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Go to Login
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
              <FaTimesCircle className="text-red-600 text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              Verification Failed
            </h2>
            <p className="text-gray-500 mt-2">{message}</p>
            <Link
              to="/student/login"
              className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Back to Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}