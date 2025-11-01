import React, { useState } from "react";
import { COLUMNS } from "../constants";
import TaskCard from "./TaskCard";

export default function TaskColumn({
  column,
  tasks,
  onDrop,
  onDragStart,
  onDragEnd,
  onOpenModal,
  draggingTaskId,
}) {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  function onDragOver(e) {
    e.preventDefault();
    setIsDraggingOver(true);
  }

  function onDragLeave(e) {
    e.preventDefault();
    setIsDraggingOver(false);
  }

  function handleDrop(e) {
    onDrop(e, column.id);
    setIsDraggingOver(false);
  }

  const columnDef = COLUMNS.find((c) => c.id === column.id);

  return (
    <div
      className="bg-slate-50 rounded-lg shadow-sm flex flex-col"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-4 border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className={`w-3 h-3 rounded-full ${columnDef.color}`}
          ></span>
          <h2 className="font-semibold text-slate-700">{columnDef.title}</h2>
        </div>
        <span className="bg-slate-200 text-slate-600 rounded-full px-2 py-0.5 text-xs font-medium">
          {tasks.length}
        </span>
      </div>
      <div
        className={`flex-1 p-4 space-y-3 overflow-auto min-h-[12rem] transition-all ${
          isDraggingOver
            ? "bg-indigo-50 border-indigo-400 border-2 border-dashed"
            : "border-transparent border-2"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggingTaskId === task.id}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={() => onOpenModal(task)}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-sm text-slate-400 text-center py-4">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}