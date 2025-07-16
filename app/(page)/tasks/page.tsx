"use client";

import { useEffect, useState } from "react";
import TasksHeader from "@/components/tasks/TasksHeader";
import TasksStats from "@/components/tasks/TasksStats";
import TasksTable from "@/components/tasks/TasksTable";
import Pagination from "@/components/tasks/Pagination";
import LoadingSpinner from "@/components/tasks/LoadingSpinner";
import api from "@/lib/axios.client";
import { Task, Meta } from "@/types/task";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [meta, setMeta] = useState<Meta | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTasks = async (page = 1) => {
    setLoading(true);
    const res = await api.get(`/tasks?limit=10&page=${page}`);
    setTasks(res.data.data);
    setMeta(res.data.meta);
    setCurrentPage(page);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <TasksHeader totalTasks={meta?.totalItems || 0} headerName = 'Task ManageMent' 
        description='Organize and track your tasks efficiently. Total Tasks:'/>
        <TasksStats tasks={tasks} totalTasks={meta?.totalItems || 0} />
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">Tasks List</h2>
          </div>
          <TasksTable tasks={tasks} />
          <Pagination meta={meta} currentPage={currentPage} onPageChange={fetchTasks} />
        </div>
      </div>
    </div>
  );
}
