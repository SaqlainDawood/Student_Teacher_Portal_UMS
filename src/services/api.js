// src/services/api.js
import axios from "axios";

const API_ROOT = import.meta.env.VITE_API_URL || "http://localhost:8000";
const API_BASE = API_ROOT.endsWith("/api") ? API_ROOT : `${API_ROOT}/api`;

const API = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
  timeout: 30000,
});

// ============================================================
// REQUEST INTERCEPTOR — Attach Student Token (sessionStorage)
// ============================================================
API.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("studentToken");
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
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("studentToken");
      sessionStorage.removeItem("studentData");
      sessionStorage.removeItem("studentId");
    }
    return Promise.reject(error);
  }
);

export default API;
export { API_BASE, API_ROOT };