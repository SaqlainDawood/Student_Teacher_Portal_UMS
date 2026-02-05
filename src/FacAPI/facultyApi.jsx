import axios from 'axios'

const FacultyAPI = axios.create({
    baseURL:`${import.meta.env.VITE_API_URL}/api/faculty/portal`,
    withCredentials:true,
})
FacultyAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('facultyToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
FacultyAPI.interceptors.response.use(
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
export default FacultyAPI;