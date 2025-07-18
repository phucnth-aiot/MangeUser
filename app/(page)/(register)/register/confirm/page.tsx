'use client'
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib";
import { clearRegisterData } from "@/store/registerSlice";
import api from "@/lib/axios.client";
import { useRouter } from "next/navigation";
import { UserPlus, User } from "lucide-react";

export default function RegisterConfirm () {
  const dispatch = useDispatch();
  const router = useRouter();
  const registerData = useSelector((state: RootState) => state.register);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
const [showErrorModal, setShowErrorModal] = useState(false);

  const handleConfirm = async () => {
    try{
      setLoading(true);
      await api.post('auth/register/confirm', { 
        ...registerData, code
      });
      dispatch(clearRegisterData())
      setShowSuccessModal(true)
    } catch (error) {
      console.error(error);
      setError("Mã xác thực không đúng hoặc hết hạn.");
      setShowErrorModal(true)
    }
  }
  return (
    <div>
      <div className="text-center m-auto ">
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mx-14 my-16">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="flex items-center space-x-3 text-white">
              <UserPlus className="w-6 h-6" />
              <h2 className="text-xl font-semibold">User Confirm Information</h2>
            </div>
          </div>
          <div className=" mx-6 my-3.5 flex justify-center">
            <div className="p-6 space-y-6 w-xl">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Username</span>
                </label>
                <div className="relative">
                  <p className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`} 
                  > {registerData.username}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Email</span>
                </label>
                <div className="relative">
                  <p className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`} 
                  > {registerData.email}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Phone</span>
                </label>
                <div className="relative">
                  <p className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`} 
                  > {registerData.phone}</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Role</span>
                </label>
                <div className="relative">
                  <p className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200`} 
                  > {registerData.role}</p>
                </div>
              </div>           
              <div className="relative">
                  <input 
                    type="text"
                    placeholder="_ _ _ _ _ _"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  />
              </div>
              {/* Submit Button */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  onClick={handleConfirm}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Confirming...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Confirm</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>   
      </div>
      {/* ❌ Modal lỗi */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-bold text-red-600">Xác nhận thất bại</h2>
            <p className="text-gray-600">{error}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:scale-105 transition"
              onClick={() => [setShowErrorModal(false), setLoading(false)]}
            >
              Thử lại
            </button>
          </div>
        </div>
      )}
      {/* ✅ Modal thành công */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md space-y-4 text-center">
            <h2 className="text-2xl font-bold text-green-600">Đăng ký thành công!</h2>
            <p className="text-gray-600">Bạn đã đăng ký thành công tài khoản.</p>
            <button
              className="mt-4 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-md hover:scale-105 transition"
              onClick={() => router.push("/login")}
            >
              Đến trang đăng nhập
            </button>
          </div>
        </div>
      )}
    </div>
  );
}