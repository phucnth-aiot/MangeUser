"use client";

import { useEffect, useState } from "react";
import api from "../lib/axios.client";
// import { useRouter } from "next/navigation";

type Task = {
  id: number;
  title: string;
  description?: string;
  status?: string;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  fileUrl?: string;
};

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [form, setForm] = useState<Partial<Task>>({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
//   const route = useRouter()

  
  const fetchTasks = async (page: number) => {
    

    const res = await api.get(`/tasks?page=${page}&limit=10`);
    // console.log('data pagination: ', res);
    // console.log('data totalpage: ', res);
    
    setTasks(res.data.data.data);
    setTotalPages(res.data.data.meta.totalPages);
  };

  useEffect(() => {
    fetchTasks(page);
  }, [page]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await api.post("/tasks", form);
    setForm({});
    fetchTasks(page);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Task Management</h1>
      {/* Form */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Task
        </h2>
        
        <div className="space-y-4">
            {/* Title Input */}
            <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title
            </label>
            <input
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                placeholder="Enter task title..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400 hover:border-gray-400"
            />
            </div>

            {/* Description Textarea */}
            <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
            </label>
            <textarea
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Describe your task..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 placeholder-gray-400 hover:border-gray-400 resize-none"
            />
            </div>

            {/* Status and Due Date Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Select */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
                </label>
                <select
                name="status"
                value={form.status || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400 bg-white"
                >
                <option value="">Select status...</option>
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                </select>
            </div>

            {/* Due Date Input */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
                </label>
                <input
                name="dueDate"
                type="date"
                value={form.dueDate || ""}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 hover:border-gray-400"
                />
            </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100">
            <div className="flex justify-end space-x-3">
                <button
                type="button"
                className="px-6 py-3 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-300 transition-all duration-200 font-medium"
                >
                Cancel
                </button>
                <button
                onClick={handleSubmit}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center"
                >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add Task
                </button>
            </div>
            </div>
        </div>
        </div>
      {/* Task Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
            <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Description
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Due Date
                </th>
            </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
            {tasks.map((task, index) => (
                <tr 
                key={task.id} 
                className={`hover:bg-gray-50 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                }`}
                >
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {task.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {task.description}
                </td>
                <td className="px-6 py-4 text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    task.status === 'completed' 
                        ? 'bg-green-100 text-green-800' 
                        : task.status === 'in-progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                    {task.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                    {task.dueDate?.slice(0, 10) || (
                    <span className="text-gray-400 italic">No due date</span>
                    )}
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
        {/* Modern Pagination */}
        <div className="mt-6 flex items-center justify-between px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm">
        
        <div className="flex items-center space-x-2">
            <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${page === 1 
                ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100'
                }
            `}
            >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
            </button>
            
            <div className="flex items-center space-x-1">
            {[...Array(totalPages)].map((_, i) => {
                const pageNum = i + 1;
                const isCurrentPage = pageNum === page;
                const showPage = 
                pageNum === 1 || 
                pageNum === totalPages || 
                (pageNum >= page - 1 && pageNum <= page + 1);
                
                if (!showPage) {
                if (pageNum === page - 2 || pageNum === page + 2) {
                    return (
                    <span key={pageNum} className="px-2 text-gray-400">
                        ...
                    </span>
                    );
                }
                return null;
                }
                
                return (
                <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    className={`
                    px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                    ${isCurrentPage
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                    }
                    `}
                >
                    {pageNum}
                </button>
                );
            })}
            </div>
            
            <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className={`
                flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200
                ${page === totalPages 
                ? 'text-gray-400 cursor-not-allowed bg-gray-100' 
                : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100'
                }
            `}
            >
            Next
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            </button>
        </div>
        </div>
    </div>
  );
}
