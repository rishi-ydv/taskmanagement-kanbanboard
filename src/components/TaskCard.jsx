import React, { useContext } from "react";
import { MessageSquare, Paperclip, User } from "lucide-react";
import { AppContext } from "../context/AppContext";
import Avatar from "./Avatar";
import PriorityBadge from "./PriorityBadge";

export default function TaskCard({ task, onDragStart, onDragEnd, onClick, isDragging }) {
  const { usersMap } = useContext(AppContext);
  const assignee = task.assignee ? usersMap[task.assignee] : null;

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`border border-slate-200 rounded-md p-3 bg-white hover:shadow-md cursor-pointer transition-all hover:-translate-y-px ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="font-medium text-slate-800 pr-2">{task.title}</div>
      <div className="text-xs text-slate-500 mt-2 line-clamp-2">
        {task.description ? (
          task.description
        ) : (
          <em className="text-slate-400">No description</em>
        )}
      </div>
      <div className="mt-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <PriorityBadge priority={task.priority} />
          <div className="flex items-center gap-2 text-slate-500">
            {task.comments.length > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <MessageSquare size={14} /> {task.comments.length}
              </span>
            )}
            {task.attachments.length > 0 && (
              <span className="flex items-center gap-1 text-xs">
                <Paperclip size={14} /> {task.attachments.length}
              </span>
            )}
          </div>
        </div>
        {assignee ? (
          <Avatar user={assignee} />
        ) : (
          <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center">
            <User size={14} className="text-slate-500" />
          </div>
        )}
      </div>
    </div>
  );
}