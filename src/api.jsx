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
   console.log('Request URL:', config.baseURL + config.url);
  return config;
})
// Handle authentication errors
API.interceptors.response.use(
  (response) =>{
        console.log('Response Status:', response.status);
 return response;
  },
  (error) => {
      console.error('Response Error:', error.response?.status, error.response?.data);
   if (error.response?.status === 401) {
      localStorage.removeItem('studentToken');
      localStorage.removeItem('studentData');
      localStorage.removeItem('studentId');
      window.location.href = '/student/login';
    }
    return Promise.reject(error);
  }
);

export default API;