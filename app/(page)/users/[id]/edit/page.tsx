"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios.client";
import { UserInterface } from "@/types/user";
import { FormEvent } from "react";
import { Check, Mail, Phone, Shield, User, X } from "lucide-react";
// import Loading from "@/components/Loading";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});



  useEffect(() => {
    if (params.id) {
      api.get(`/users/${params.id}`).then((res) => {
        setUser(res.data.data);
      });
    }
  }, [params.id]);
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!user?.username.trim()) {
      newErrors.username = "Username is required";
    } else if (user?.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!user?.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user?.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!user?.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(user?.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    if (user) {
      await api.patch(`/users/${user.userid}`, {
        username: user.username,
        phone: user.phone,
        email: user.email,
        role: user.role,
      });
      router.push(`/users/${user.userid}`);
    }
  };

  if (!user) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit User</h1>
      {/* <form onSubmit={handleUpdate} className="space-y-4">
        <input
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="border px-3 py-2 w-full"
        />
        <input
          value={user.phone}
          onChange={(e) => setUser({ ...user, phone: e.target.value })}
          className="border px-3 py-2 w-full"
        />
        <input
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="border px-3 py-2 w-full"
        />
        <select
          value={user.role}
          onChange={(e) => setUser({ ...user, role: e.target.value })}
          className="border px-3 py-2 w-full"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button
          type="submit"
          // className="bg-blue-600 text-white px-4 py-2 rounded"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"

        >
          Update
        </button>
      </form> */}
          <div className="p-6 space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Username</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter username"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {user?.username && !errors.username && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.username}</span>
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email Address</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value})}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {user?.email && !errors.email && /\S+@\S+\.\S+/.test(user?.email) && (
                  <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.email}</span>
                </p>
              )}
            </div>

            {/* Phone Field */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value})}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {user?.phone && !errors.phone && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-sm flex items-center space-x-1">
                    <X className="w-4 h-4" />
                    <span>{errors.phone}</span>
                  </p>
                )}
              </div>
          
            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>Role</span>
              </label>
              <select
                value={user.role}
                onChange={(e) => setUser({ ...user, role: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-gray-500">
                {user.role === "admin" 
                  ? "Admin users have full access to all features" 
                  : "Regular users have limited access to features"
                }
              </p>
            </div>
          </div>


            {/* Submit Error */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700 text-sm flex items-center space-x-2">
                  <X className="w-4 h-4" />
                  <span>{errors.submit}</span>
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex items-center justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.push("/users")}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleUpdate}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                <span>Update User</span>
              </button>
            </div>
    </div>
  );
}
