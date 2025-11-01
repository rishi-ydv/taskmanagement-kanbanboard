import { useState } from "react";
import { v4 as uuid } from "uuid";

export function useToasts() {
  const [toasts, setToasts] = useState([]);

  const showToast = (title, body) => {
    const newToast = { id: uuid(), title, body };
    setToasts((prev) => [...prev, newToast]);

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      removeToast(newToast.id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return { toasts, showToast, removeToast };
}