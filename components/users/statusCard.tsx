import { Shield, User, Users } from "lucide-react";
import { UserInterface as UserType } from '../../types/user';


export default function StatsCards({ users }: { users: UserType[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-gray-900">{users.length}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 flex items-center justify-center rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Admins</p>
            <p className="text-2xl font-bold text-purple-600">
              {users.filter(u => u.role === "admin").length}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 flex items-center justify-center rounded-lg">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Regular Users</p>
            <p className="text-2xl font-bold text-blue-600">
              {users.filter(u => u.role === "user").length}
            </p>
          </div>
          <div className="w-12 h-12 bg-blue-100 flex items-center justify-center rounded-lg">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
}
