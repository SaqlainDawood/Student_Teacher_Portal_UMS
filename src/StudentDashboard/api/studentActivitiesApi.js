import axios from 'axios';

const StudentActivitiesAPI = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/student`,
    withCredentials: true,
});

// Request Interceptor - Add token
StudentActivitiesAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('studentToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor - Handle 401
StudentActivitiesAPI.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('studentToken');
            localStorage.removeItem('studentData');
            window.location.href = '/student/login';
        }
        return Promise.reject(error);
    }
);

export default StudentActivitiesAPI;