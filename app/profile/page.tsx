"use client";

import { useEffect, useState } from "react";
import api from "../lib/axios.config";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UserProfile {
  username: string;
  phone: string;
  email: string;
  role: string;
  avatarUrl: string | null;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user_id = Cookies.get("user_id");

        const res = await api.get(`/user/profile/${user_id}`, {
          withCredentials: true,
        });
        console.log('userdata: ',res.data.data);
        
        setUser(res.data.data);
      } catch (err) {
        console.error("Lỗi load profile", err);
        alert("Không thể tải profile");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  if (loading) {
    return <p className="text-center mt-10">Đang tải profile...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">Không tìm thấy user.</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 border p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Thông tin người dùng</h2>

      {user.username ? (
        <img
          src='https://images8.alphacoders.com/135/thumb-350-1354012.webp'
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
      ) : (
        <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No Avatar</span>
        </div>
      )}

      <div className="space-y-2">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}
