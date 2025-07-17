import { UserPlus } from "lucide-react";

interface HeaderProps {
  onCreateUser: () => void;
}

export default function Header({ onCreateUser }: HeaderProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage your team members and their permissions</p>
      </div>
      <button
        onClick={onCreateUser}
        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center space-x-2"
      >
        <UserPlus className="w-5 h-5" />
        <span>Create User</span>
      </button>
    </div>
  );
}