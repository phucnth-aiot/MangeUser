"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios.client";
import { useRouter } from "next/navigation";
import { UserInterface } from '../../../types/user';
import { ArrowRight, Shield, User, Users } from "lucide-react";
import Loading from "@/components/Loading";
import Header from "../../../components/users/Header";
import StatsCard from "../../../components/users/statsCard";
import SearchFilter from "../../../components/users/SearchFilter";
import UsersTable from "../../../components/users/UserTable";
import DeleteModal from "../../../components/users/DeleteModal";

export default function UsersPage() {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<UserInterface | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (user: UserInterface) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (userToDelete) {
      try {
        await api.delete(`/users/${userToDelete.userid}`);
        await fetchUsers();
        setShowDeleteModal(false);
        setUserToDelete(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleStyle = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 border-purple-200";
      case "user":
        return "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    return role === "admin" ? <Shield className="w-4 h-4" /> : <User className="w-4 h-4" />;
  };

  const getAvatarFallback = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  if (loading) {
    return <Loading namePage="Task" />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Header onCreateUser={() => router.push('/users/create')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total Users"
            count={users.length}
            icon={<Users className="w-6 h-6 text-purple-600" />}
            color="text-gray-900"
          />
          <StatsCard
            title="Admins"
            count={users.filter(u => u.role === 'admin').length}
            icon={<Shield className="w-6 h-6 text-purple-600" />}
            color="text-purple-600"
          />
          <StatsCard
            title="Regular Users"
            count={users.filter(u => u.role === 'user').length}
            icon={<User className="w-6 h-6 text-blue-600" />}
            color="text-blue-600"
          />
        </div>
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterRole={filterRole}
          setFilterRole={setFilterRole}
        />
        <UsersTable
          filteredUsers={filteredUsers}
          onView={(id) => router.push(`/users/${id}`)}
          onEdit={(id) => router.push(`/users/${id}/edit`)}
          onDelete={handleDelete}
          getRoleStyle={getRoleStyle}
          getRoleIcon={getRoleIcon}
          getAvatarFallback={getAvatarFallback}
        />
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => router.push('/tasks')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
          >
            <span>Go to Tasks</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <DeleteModal
          show={showDeleteModal}
          user={userToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      </div>
    </div>
  );
}