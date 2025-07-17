import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  count: number;
  icon: ReactNode;
  color: string;
}

export default function StatsCard({ title, count, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{count}</p>
        </div>
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          {icon}
        </div>
      </div>
    </div>
  );
}