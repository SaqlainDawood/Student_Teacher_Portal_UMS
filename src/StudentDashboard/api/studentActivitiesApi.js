import axios from 'axios';

const StudentActivitiesAPI = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api/student`,
    withCredentials: true,
});

// Request Interceptor - Add token
StudentActivitiesAPI.interceptors.request.use((config) => {
    const token = localStorage.getItem('studentToken');
    
    // 🆕 DEBUG LOGS
    console.log('📤 API Request:', config.method?.toUpperCase(), config.url);
    console.log('🔑 Token from localStorage:', token ? token.substring(0, 30) + '...' : 'MISSING');
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('✅ Authorization header set');
    } else {
        console.error('❌ No token found in localStorage!');
    }
    
    return config;
}, (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
});

// Response Interceptor - Handle 401
StudentActivitiesAPI.interceptors.response.use(
    (response) => {
        console.log('✅ API Response:', response.status, response.config.url);
        return response;
    },
    (error) => {
        console.error('❌ API Error:', {
            status: error.response?.status,
            url: error.config?.url,
            message: error.response?.data?.message || error.message
        });
        
        if (error.response?.status === 401) {
            console.log('🔄 401 Unauthorized - Redirecting to login');
            localStorage.removeItem('studentToken');
            localStorage.removeItem('studentData');
            localStorage.removeItem('studentId');
            window.location.href = '/student/login';
        }
        return Promise.reject(error);
    }
);

export default StudentActivitiesAPI;