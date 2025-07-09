'use client'
import { useRouter } from "next/navigation";
import { useState } from "react";
import api from '../lib/axios.client'

export default function LoginForm() {
  const router = useRouter();

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    try{
      await api.post('/auth/login',
        { phone, password, },
      );

      router.push('/profile');
    } catch (error){
      console.log(error);
      alert('Đăng nhập thất bại')
    }
  }
  return (
    <form
      onSubmit={handleLogin}
      className="flex flex-col gap-4 max-w-md mx-auto mt-10"
    >
      <div>
        <label className="block text-gray-700 mb-2">phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Đăng nhập
      </button>
    </form>
  );
}
