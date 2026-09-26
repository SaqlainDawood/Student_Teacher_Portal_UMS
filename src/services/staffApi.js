// src/services/staffApi.js
import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_BASE = API_ROOT.endsWith("/api") ? API_ROOT : `${API_ROOT}/api`;

const StaffAPI = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// ============================================================
// REQUEST INTERCEPTOR — Attach Staff Token (sessionStorage)
// ============================================================
StaffAPI.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("staffToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ============================================================
// RESPONSE INTERCEPTOR — Handle 401
// ============================================================
StaffAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("staffToken");
      sessionStorage.removeItem("staffData");
    }
    return Promise.reject(error);
  }
);

export default StaffAPI;
export { API_BASE, API_ROOT };