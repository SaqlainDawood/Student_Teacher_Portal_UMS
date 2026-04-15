import axios from 'axios';

// Activities API - Base URL: /api/faculty/activities
const FacultyActivitiesAPI = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/faculty/activities`,
    withCredentials: true,
});
// Request Interceptor - Add token
FacultyActivitiesAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('facultyToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor - Handle 401
FacultyActivitiesAPI.interceptors.response.use(
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

export default FacultyActivitiesAPI;