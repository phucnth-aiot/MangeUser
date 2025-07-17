import { Users } from "lucide-react";
import { UserInterface } from '../../types/user';
import UserRow from "./userRow";

interface UsersTableProps {
  filteredUsers: UserInterface[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (user: UserInterface) => void;
  getRoleStyle: (role: string) => string;
  getRoleIcon: (role: string) => React.ReactNode;
  getAvatarFallback: (username: string) => string;
}

export default function UsersTable({
  filteredUsers,
  onView,
  onEdit,
  onDelete,
  getRoleStyle,
  getRoleIcon,
  getAvatarFallback
}: UsersTableProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-900">Users List</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                User
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <UserRow
                key={user.userid}
                user={user}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                getRoleStyle={getRoleStyle}
                getRoleIcon={getRoleIcon}
                getAvatarFallback={getAvatarFallback}
              />
            ))}
          </tbody>
        </table>
      </div>
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No users found</p>
        </div>
      )}
    </div>
  );
}