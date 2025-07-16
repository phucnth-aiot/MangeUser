"use client";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import api from "@/lib/axios.client";
import { setUser } from "@/store/authSlice";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Validate phone number (Vietnam format)
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
  };

  // Validate password
  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Validate input fields
    if (!phone.trim()) {
      setError("Vui lòng nhập số điện thoại");
      return;
    }

    if (!validatePhone(phone)) {
      setError("Số điện thoại không hợp lệ");
      return;
    }

    if (!password.trim()) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    if (!validatePassword(password)) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      const res = await api.post("/auth/login", { 
        phone: phone.trim(), 
        password: password.trim() 
      });

      // Check if response has expected structure
      if (!res.data?.data?.user) {
        throw new Error("Phản hồi từ server không hợp lệ");
      }

      const user = res.data.data.user;
      const userId = user.userid;

      // Validate userId exists
      if (!userId) {
        throw new Error("Không thể lấy thông tin người dùng");
      }

      dispatch(setUser(user));
      router.push(`/users/${userId}`);

    } catch  {
      console.error("Login error:", error);
      // catch (error: any)

      // Handle different types of errors
      // if (error.response?.status === 400) {
      //   setError("Số điện thoại hoặc mật khẩu không chính xác");
      // } else if (error.response?.status === 401) {
      //   setError("Thông tin đăng nhập không chính xác");
      // } else if (error.response?.status === 429) {
      //   setError("Quá nhiều lần thử. Vui lòng thử lại sau");
      // } else if (error.response?.status >= 500) {
      //   setError("Lỗi server. Vui lòng thử lại sau");
      // } else if (error.code === 'NETWORK_ERROR') {
      //   setError("Lỗi kết nối. Vui lòng kiểm tra internet");
      // } else {
      //   setError(error.message || "Đăng nhập thất bại. Vui lòng thử lại");
      // }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Đăng nhập
          </h2>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập số điện thoại"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Nhập mật khẩu"
              disabled={isLoading}
            />
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
