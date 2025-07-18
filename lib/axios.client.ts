import axios from "axios";
import { store } from ".";
import { clearUser } from "@/store/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const pathname = window.location.pathname;
    if (pathname === "/login") {
      return Promise.reject(error);
    }
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/auth/refresh", null, {
          withCredentials: true,
        });
        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(clearUser());
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
