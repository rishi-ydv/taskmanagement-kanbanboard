import React, { useEffect } from "react";
import { Bell, X } from "lucide-react";

export default function Toast({ toast, onRemove }) {
  // Auto-remove after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onRemove();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onRemove]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in">
      <div className="flex-shrink-0">
        <Bell size={20} className="text-indigo-600" />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-slate-800">{toast.title}</h4>
        <p className="text-sm text-slate-600">{toast.body}</p>
      </div>
      <div className="flex-shrink-0">
        <button
          onClick={onRemove}
          className="p-1 rounded-full text-slate-400 hover:bg-slate-100 transition-all"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}