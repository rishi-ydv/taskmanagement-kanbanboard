import React from "react";
import { Plus, Search } from "lucide-react";

export default function BoardHeader({ filter, onFilterChange, onNewTask }) {
  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <h1 className="text-3xl font-bold text-slate-800">Task Board</h1>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <div className="relative w-full sm:w-64">
          <input
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            placeholder="Search tasks..."
            className="border rounded-md px-3 py-2 pl-9 w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search
            className="absolute left-2.5 top-2.5 text-slate-400"
            size={20}
          />
        </div>
        <button
          onClick={onNewTask}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-indigo-700 shadow-sm transition-all"
        >
          <Plus size={18} />
          New Task
        </button>
      </div>
    </header>
  );
}