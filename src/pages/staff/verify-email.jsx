import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import StaffAPI from "../../services/staffApi";

export default function VarifyMail() {
  const { token: routeToken } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState(
    "Please wait while we verify your email address..."
  );

  useEffect(() => {
    const verifyEmail = async () => {
      const token = routeToken || searchParams.get("token");

      // ----------------------------------------------------
      // TOKEN MISSING
      // ----------------------------------------------------
      if (!token) {
        setStatus("error");
        setMessage(
          "Verification token is missing. Please use the verification link sent to your email."
        );
        return;
      }

      try {
        // --------------------------------------------------
        // BACKEND EMAIL VERIFICATION
        // --------------------------------------------------
        const response = await StaffAPI.get(
          `/staff/verify-email?token=${encodeURIComponent(token)}`
        );

        setStatus("success");

        setMessage(
          response.data?.message ||
            "Your email has been verified successfully."
        );

        // --------------------------------------------------
        // REDIRECT TO LOGIN AFTER 2 SECONDS
        // --------------------------------------------------
        setTimeout(() => {
          navigate("/staff/login", { replace: true });
        }, 2500);
      } catch (error) {
        console.error(
          "❌ Staff email verification error:",
          error
        );

        setStatus("error");

        setMessage(
          error.response?.data?.message ||
            "Email verification failed. The verification link may be invalid or expired."
        );
      }
    };

    verifyEmail();
  }, [routeToken, searchParams, navigate]);

  // ======================================================
  // LOADING / VERIFYING
  // ======================================================
  if (status === "verifying") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

          {/* Spinner */}
          <div className="mx-auto mb-6 flex items-center justify-center">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200 border-t-emerald-600 animate-spin" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900">
            Verifying Your Email
          </h1>

          <p className="mt-3 text-gray-600 leading-relaxed">
            {message}
          </p>

          <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3">
            <p className="text-sm text-emerald-700">
              Please don't close this page.
            </p>
          </div>

        </div>

      </div>
    );
  }

  // ======================================================
  // SUCCESS
  // ======================================================
  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 px-4">

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

          {/* Success Icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-10 w-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Email Verified!
          </h1>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {message}
          </p>

          <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-4">
            <p className="text-sm text-green-700">
              Your staff applicant email has been successfully verified.
            </p>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Redirecting you to staff login...
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/staff/login", { replace: true })
            }
            className="mt-5 w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Continue to Login
          </button>

        </div>

      </div>
    );
  }

  // ======================================================
  // ERROR
  // ======================================================
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">

        {/* Error Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100">

          <svg
            className="h-10 w-10 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>

        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Verification Failed
        </h1>

        <p className="mt-4 text-gray-600 leading-relaxed">
          {message}
        </p>

        <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-4 text-left">
          <p className="text-sm font-semibold text-red-800">
            Possible reasons:
          </p>

          <ul className="mt-2 list-disc pl-5 text-sm text-red-700 space-y-1">
            <li>The verification link has expired.</li>
            <li>The verification token is invalid.</li>
            <li>The email has already been verified.</li>
            <li>The verification link is incomplete.</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/staff/login", { replace: true })
          }
          className="mt-6 w-full rounded-xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Go to Staff Login
        </button>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-3 w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Try Again
        </button>

      </div>

    </div>
  );
}