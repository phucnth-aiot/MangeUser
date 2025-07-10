import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!baseURL) {
  console.error("NEXT_PUBLIC_BACKEND_URL trong .env.local!");
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
  (error) => {
    if (error.response?.status === 401) {
      console.log("Unauthorized → need to check authentication and authorization");
    }
    return Promise.reject(error);
  }
);

export default instance;
