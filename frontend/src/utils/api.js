import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
const baseURL = rawBaseUrl.replace(/\/api\/?$/, "").replace(/\/$/, "");

const api = axios.create({
  baseURL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
