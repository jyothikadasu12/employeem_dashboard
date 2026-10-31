import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
  description: string;
}

function StatCard({
  title,
  value,
  icon,
  color,
  description,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>

      <p className="stat-title">{title}</p>

      <h2>{value}</h2>

      <p className="stat-description">{description}</p>
    </div>
  );
}

export default StatCard;