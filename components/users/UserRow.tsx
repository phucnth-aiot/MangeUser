import { Edit, Eye, Mail, Phone, Trash2 } from "lucide-react";
import { UserInterface } from '../../types/user';

interface UserRowProps {
  user: UserInterface;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (user: UserInterface) => void;
  getRoleStyle: (role: string) => string;
  getRoleIcon: (role: string) => React.ReactNode;
  getAvatarFallback: (username: string) => string;
}

export default function UserRow({
  user,
  onView,
  onEdit,
  onDelete,
  getRoleStyle,
  getRoleIcon,
  getAvatarFallback
}: UserRowProps) {
  return (
    <tr key={user.userid} className="hover:bg-gray-50 transition-colors duration-200">
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
            {getAvatarFallback(user.username)}
          </div>
          <div>
            <div className="font-semibold text-gray-900">{user.username}</div>
            <div className="text-sm text-gray-500">ID: {user.userid}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{user.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{user.phone}</span>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold border ${getRoleStyle(user.role)}`}>
          {getRoleIcon(user.role)}
          <span>{user.role.toUpperCase()}</span>
        </span>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onView(user.userid)}
            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded-lg transition-colors duration-200"
            title="View User"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit(user.userid)}
            className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded-lg transition-colors duration-200"
            title="Edit User"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(user)}
            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Delete User"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}