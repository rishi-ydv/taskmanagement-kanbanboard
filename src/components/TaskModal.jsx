import React, { useState, useEffect, useRef, useContext } from "react";
import {
  X,
  Trash2,
  Paperclip,
  Send,
  FileText,
  Check,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toLocalISOString } from "../utils/dateUtils";
import { COLUMNS } from "../constants";
import Avatar from "./Avatar";

export default function TaskModal({
  task,
  onClose,
  onSave,
  onDelete,
  onMove,
  onAddComment,
  onAttach,
}) {
  const { users } = useContext(AppContext);
  const [local, setLocal] = useState({ ...task });
  const [commentText, setCommentText] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => setLocal({ ...task }), [task]);

  function save() {
    onSave(local);
    onClose();
  }

  function handleFile(e) {
    const f = e.target.files[0];
    if (f) onAttach(f);
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-lg shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h3 className="text-xl font-semibold text-slate-800">Edit Task</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-500 hover:bg-slate-100 transition-all"
          >
            <X size={22} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto">
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4">
            {/* Main Content (Left) */}
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Title
                </label>
                <input
                  className="w-full border-slate-300 rounded-md px-3 py-2 text-lg font-medium focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={local.title}
                  onChange={(e) =>
                    setLocal((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full border-slate-300 rounded-md px-3 py-2 min-h-[120px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={local.description}
                  placeholder="Add a description..."
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            {/* Sidebar (Right) */}
            <div className="md:col-span-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Assignee
                </label>
                <select
                  className="w-full border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={local.assignee || ""}
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      assignee: e.target.value || null,
                    }))
                  }
                >
                  <option value="">Unassigned</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Priority
                </label>
                <select
                  className="w-full border-slate-300 rounded-md px-3 py-2 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={local.priority}
                  onChange={(e) =>
                    setLocal((prev) => ({ ...prev, priority: e.target.value }))
                  }
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Deadline
                </label>
                <input
                  type="datetime-local"
                  className="w-full border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={toLocalISOString(local.deadline)}
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      deadline: e.target.value
                        ? new Date(e.target.value).toISOString()
                        : null,
                    }))
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Reminder (minutes before)
                </label>
                <input
                  type="number"
                  className="w-full border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={local.reminderMinutes || 0}
                  onChange={(e) =>
                    setLocal((prev) => ({
                      ...prev,
                      reminderMinutes: parseInt(e.target.value || "0"),
                    }))
                  }
                />
              </div>

              <div className="pt-2">
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Move to
                </label>
                <div className="flex flex-wrap gap-2">
                  {COLUMNS.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => onMove(c.id)}
                      className="px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-100 transition-all"
                    >
                      {c.title}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-medium text-slate-600 mb-2">
                Attachments
              </h4>
              <div className="space-y-2">
                {task.attachments.length === 0 && (
                  <div className="text-sm text-slate-400">No files</div>
                )}
                {task.attachments.map((a) => (
                  <div
                    key={a.id}
                    className="text-sm border rounded-md p-2 flex justify-between items-center bg-slate-50"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileText size={16} className="text-slate-500" />
                      <span className="truncate">{a.name}</span>
                      <span className="text-slate-400 text-xs flex-shrink-0">
                        ({Math.round(a.size / 1024)} KB)
                      </span>
                    </div>
                    <a
                      className="underline text-sm text-indigo-600"
                      href={a.dataUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open
                    </a>
                  </div>
                ))}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFile}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="mt-2 px-3 py-1 border border-slate-300 rounded-md text-sm hover:bg-slate-100 flex items-center gap-2 transition-all"
              >
                <Paperclip size={16} />
                Attach File
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="p-6 border-t border-slate-200">
            <h4 className="text-sm font-medium text-slate-600 mb-3">
              Comments
            </h4>
            <div className="space-y-3 max-h-40 overflow-auto pr-2">
              {task.comments.length === 0 && (
                <div className="text-sm text-slate-400">No comments</div>
              )}
              {task.comments.map((c) => (
                <div key={c.id} className="text-sm flex gap-2">
                  <Avatar user={{ id: c.author, name: c.author }} />
                  <div>
                    <span className="font-semibold text-slate-700">
                      {c.author}
                    </span>
                    <span className="text-xs text-slate-400 ml-2">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                    <div className="mt-0.5 text-slate-600">{c.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                className="flex-1 border-slate-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment"
              />
              <button
                onClick={() => {
                  if (commentText.trim()) {
                    onAddComment("You", commentText.trim()); // Assuming 'You' as author
                    setCommentText("");
                  }
                }}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t flex justify-between items-center flex-shrink-0">
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md font-semibold hover:bg-red-700 flex items-center gap-2 transition-all"
          >
            <Trash2 size={16} />
            Delete Task
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md font-semibold hover:bg-slate-100 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={save}
              className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 flex items-center gap-2 transition-all"
            >
              <Check size={18} />
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}