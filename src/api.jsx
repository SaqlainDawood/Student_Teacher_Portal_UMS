import axios from 'axios';

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api/students`,
   withCredentials: true,
  // headers for json requests will be set per-request
});
API.interceptors.request.use((config)=>{
  const token = localStorage.getItem('studentToken');
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config;
})
// Handle authentication errors
API.interceptors.response.use(
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

export default API;