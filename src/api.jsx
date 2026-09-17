import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/students`,
  withCredentials: true,
});

// ==========================================
// Request Interceptor
// ==========================================
API.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("studentToken");

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    console.log(
      "Request URL:",
      `${config.baseURL}${config.url}`
    );

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ==========================================
// Response Interceptor
// ==========================================
API.interceptors.response.use(
  (response) => {
    console.log(
      "Response Status:",
      response.status
    );

    return response;
  },

  (error) => {
    console.error(
      "Response Error:",
      error.response?.status,
      error.response?.data
    );

    // --------------------------------------
    // Unauthorized
    // --------------------------------------
    if (error.response?.status === 401) {
      localStorage.removeItem(
        "studentToken"
      );

      localStorage.removeItem(
        "studentData"
      );

      // Student ID ko immediately remove
      // nahi kar rahe because draft registration
      // us par depend kar sakti hai.
      // localStorage.removeItem("studentId");

      window.location.href =
        "/student/login";
    }

    return Promise.reject(error);
  }
);

export default API;