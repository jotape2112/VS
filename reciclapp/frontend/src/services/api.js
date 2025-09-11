import axios from 'axios';


const api = axios.create({
baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});


export const register = (data) => api.post('/users/register', data);
export const login = (data) => api.post('/users/login', data);


export default api;