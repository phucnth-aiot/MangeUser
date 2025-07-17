"use client";

import { FormEvent, useState } from "react";
import { 
  User, 
  Phone, 
  Mail, 
  Lock, 
  Shield, 
  ArrowLeft, 
  UserPlus,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react";
import api from "@/lib/axios.client";
import { useRouter } from "next/navigation";

export default function Register() {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = "Username is required";
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-()]+$/.test(phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: FormEvent) => {
    if (e) e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await api.post("/register", {
        username,
        phone,
        email,
        password,
        role,
      });
      
      // Show success message or redirect
      router.push("/register-confirm");
    } catch (error) {
      console.error("Error register user:", error);
      setErrors({ submit: "Failed to register. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak" };
    if (password.length < 8) return { strength: 2, label: "Fair" };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 3, label: "Strong" };
    }
    return { strength: 2, label: "Fair" };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => router.push("/users")}
            className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">REGISTER</h1>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="flex items-center space-x-3 text-white">
              <UserPlus className="w-6 h-6" />
              <h2 className="text-xl font-semibold">User Information</h2>
            </div>
          </div>

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
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {username && !errors.username && (
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {email && !errors.email && /\S+@\S+\.\S+/.test(email) && (
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {phone && !errors.phone && (
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

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-3 pr-12 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Password strength:</span>
                    <span className={`text-xs font-medium ${
                      passwordStrength.strength === 1 ? 'text-red-500' :
                      passwordStrength.strength === 2 ? 'text-yellow-500' :
                      passwordStrength.strength === 3 ? 'text-green-500' : 'text-gray-400'
                    }`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="flex space-x-1">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                          level <= passwordStrength.strength
                            ? passwordStrength.strength === 1 ? 'bg-red-500' :
                              passwordStrength.strength === 2 ? 'bg-yellow-500' :
                              'bg-green-500'
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p className="text-red-500 text-sm flex items-center space-x-1">
                  <X className="w-4 h-4" />
                  <span>{errors.password}</span>
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
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <p className="text-xs text-gray-500">
                {role === "admin" 
                  ? "Admin users have full access to all features" 
                  : "Regular users have limited access to features"
                }
              </p>
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
                disabled={loading}
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    <span>Register</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tips Card */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Shield className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-blue-900 mb-1">Security Tips</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use a strong password with at least 8 characters</li>
                <li>• Include uppercase letters, numbers, and symbols</li>
                <li>• Admin users should use extra strong passwords</li>
                <li>• Consider enabling two-factor authentication</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}