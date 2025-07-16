import { Play, CheckCircle, Circle } from "lucide-react";
import { Task } from "@/types/task";

type Props = {
  tasks: Task[];
};
// icon is used in lucide-react 
export default function TasksTable({ tasks }: Props) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "done":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "in_progress":
        return <Play className="w-5 h-5 text-blue-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-200";
      case "in_progress":
        return "bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200";
      case "done":
        return "bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDueDateStyle = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-red-600 font-semibold";
    if (diffDays <= 3) return "text-orange-600 font-medium";
    return "text-gray-600";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Task</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Description</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Due Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasks.map(task => (
            <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-200">
              <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(task.status)}
                  <div>
                    <div className="font-semibold text-gray-900">{task.title}</div>
                    <div className="text-sm text-gray-500">ID: {task.id}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="text-gray-700 max-w-xs truncate">{task.description}</div>
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold border ${getStatusStyle(task.status)}`}>
                  {task.status.replace("_", " ").toUpperCase()}
                  {/* replace - to " " in stt word  */}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className={`text-sm ${getDueDateStyle(task.dueDate)}`}>
                  {new Date(task.dueDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
