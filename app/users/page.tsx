"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios.client";
import { useRouter } from "next/navigation";

interface User {
  userid: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  avatarUrl: string | null;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchUsers = async () => {
      const res = await api.get("/users",
        
      );
      setUsers(res.data.data);
    };

    fetchUsers();
  }, []);

  return (
    <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Users</h1>

        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Role
                </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                <tr key={user.userid}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                    >
                        {user.role}
                    </span>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        <div className="text-right">
            <button onClick={() => router.push('/tasks')}
            >
                navigate
            </button>
        </div>
    </div>
  );
}
