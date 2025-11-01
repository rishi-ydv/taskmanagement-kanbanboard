import React from "react";

export default function Avatar({ user }) {
  if (!user) return null;
  const initials = (user.name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  const colors = [
    "bg-red-500", "bg-blue-500", "bg-green-500", "bg-yellow-500",
    "bg-purple-500", "bg-pink-500", "bg-indigo-500", "bg-teal-500",
  ];
  const charCodeSum = user.id
    .split("")
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const color = colors[charCodeSum % colors.length];

  return (
    <div
      title={user.name}
      className={`w-6 h-6 rounded-full ${color} flex items-center justify-center text-white text-xs font-semibold`}
    >
      {initials}
    </div>
  );
}