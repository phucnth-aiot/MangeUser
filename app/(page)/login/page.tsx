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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const res = await api.post("/auth/login", { phone, password });
    const userId = res.data.data.user.userid
    // localStorage.setItem('userId',userId)
    dispatch(setUser(res.data.data.user));
    router.push(`/users/${userId}`);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4 p-8">
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="border px-3 py-2"
      />
      0111111111 phuchoang123
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border px-3 py-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Login
      </button>
    </form>
  );
}
