import React from "react";

export default function Footer() {
  // We can grab the current year dynamically
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 p-6 text-center text-sm text-slate-500">
      <p>
       © {currentYear} Kanban Board. **Full CI/CD Workflow Confirmed!**
      </p>
      <p className="mt-1">
        View on{" "}
        <a
          href="https://github.com/rishi-ydv/taskmanagement-kanbanboard"
          className="font-medium text-indigo-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
}