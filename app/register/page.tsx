'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '../lib/axios.client';


export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password:'',
    role: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/auth/register',formData);
      alert('đăng kí thành công');
      router.push('/login');
    } catch (error) {
      console.log('Đăng kí thất bại rồi baby ơi lỗi nè => ',error);
      alert('đăng kì thất bại');
    }
  }

  return (
    <div>
      <div className='mt-50'>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-semibold text-center">Đăng ký</h2>

            <input
              type="text"
              name="username"
              placeholder="Tên người dùng"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />

            <input
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Mật khẩu"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="user">Người dùng</option>
              <option value="admin">Quản trị viên</option>
            </select>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Đăng ký
            </button>
        </form>
      </div>
    </div>
  )
}
