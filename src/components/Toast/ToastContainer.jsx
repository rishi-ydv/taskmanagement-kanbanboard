import React from "react";
import Toast from "./Toast";

export default function ToastContainer({ toasts, onRemove }) {
  return (
    <div className="fixed bottom-4 right-4 z-[100] w-full max-w-sm space-y-3">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onRemove={() => onRemove(toast.id)} />
      ))}
    </div>
  );
}