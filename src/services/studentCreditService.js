import axios from "axios";

const studentCreditApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
});

studentCreditApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("studentToken");
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export const getStudentCreditSummary = async (studentId) => {
  const response = await studentCreditApi.get(`/api/cms/students/${studentId}/credit-summary`);
  return response?.data ?? null;
};

export default studentCreditApi;
