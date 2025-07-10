import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;


if (!baseURL) {
  console.error("NEXT_PUBLIC_API_BASE_URL trong .env.local!");
}

const instance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

instance.interceptors.request.use(
  (config) => {
    console.log("Axios is calling port:", baseURL);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Gọi route refresh token (route API)
        await axios.post("/auth/refresh", null, {
          withCredentials: true,
        });

        // Retry lại request trước đó
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token thất bại:", refreshError);
        // Có thể logout user tại đây nếu muốn
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
