
import axios from 'axios';

// Grading API - Base URL: /api/faculty/grading
const FacultyGradingAPI = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/faculty/grading`,
    withCredentials: true,
});

// Request Interceptor - Add token
FacultyGradingAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('facultyToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor - Handle 401
FacultyGradingAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('facultyToken');
            localStorage.removeItem('facultyData');
            window.location.href = '/faculty/login';
        }
        return Promise.reject(error);
    }
);

export default FacultyGradingAPI;