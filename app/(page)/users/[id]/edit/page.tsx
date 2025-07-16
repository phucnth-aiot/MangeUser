"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios.client";
import { UserInterface } from "@/types/user";
import { FormEvent } from "react";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [user, setUser] = useState<UserInterface | null>(null);

  useEffect(() => {
    if (params.id) {
      api.get(`/users/${params.id}`).then((res) => {
        setUser(res.data.data);
      });
    }
  }, [params.id]);

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <form onSubmit={handleUpdate} className="space-y-4">
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
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}
