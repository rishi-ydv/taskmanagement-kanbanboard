import React from "react";
import { ArrowUp, ArrowRight, ArrowDown } from "lucide-react";

export default function PriorityBadge({ priority }) {
  const PRIORITY_STYLES = {
    High: {
      icon: ArrowUp,
      text: "High",
      iconClass: "text-red-600",
      bgClass: "bg-red-100 text-red-700",
    },
    Medium: {
      icon: ArrowRight,
      text: "Medium",
      iconClass: "text-yellow-600",
      bgClass: "bg-yellow-100 text-yellow-700",
    },
    Low: {
      icon: ArrowDown,
      text: "Low",
      iconClass: "text-slate-500",
      bgClass: "bg-slate-100 text-slate-600",
    },
  };

  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.Low;
  const Icon = style.icon;

  return (
    <span
      className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${style.bgClass}`}
    >
      <Icon size={14} className={style.iconClass} />
      {style.text}
    </span>
  );
}