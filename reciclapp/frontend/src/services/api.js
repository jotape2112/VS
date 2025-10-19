import axios from "axios";

const api = axios.create({
  baseURL: "https://reciclapp-backend.onrender.com" // apunta al backend
});

// Interceptor para añadir el token si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
