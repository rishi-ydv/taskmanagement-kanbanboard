import { useEffect, useRef } from "react";

export function useTaskReminders(tasks, showToast) {
  const reminderTimersRef = useRef({});

  useEffect(() => {
    // Clear all previous timers
    Object.values(reminderTimersRef.current).forEach((t) => clearTimeout(t));
    reminderTimersRef.current = {};

    Object.values(tasks).forEach((task) => {
      if (!task.deadline || task.reminderMinutes === null) return;
      
      const deadline = new Date(task.deadline).getTime();
      const notifyAt = deadline - (task.reminderMinutes || 0) * 60 * 1000;
      const now = Date.now();
      
      if (notifyAt < now) return; // Time has passed
      
      const id = task.id;
      const delay = notifyAt - now;

      const timeout = setTimeout(() => {
        showToast(
          "Task reminder: " + task.title,
          `Deadline at ${new Date(task.deadline).toLocaleString()}`
        );
      }, delay);
      
      reminderTimersRef.current[id] = timeout;
    });

    // Cleanup timers on unmount
    return () => {
      Object.values(reminderTimersRef.current).forEach((t) => clearTimeout(t));
    };
  }, [tasks, showToast]);
}