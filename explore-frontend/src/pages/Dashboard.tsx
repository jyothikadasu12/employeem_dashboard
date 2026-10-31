
import { useEffect, useState } from "react";
import {
  Users,
  ClipboardList,
  CheckCircle2,
  Clock3,
  ArrowUpRight,
} from "lucide-react";
import "../styles/dashboard.css";
import StatCard from "../components/StatCard";
import TaskList from "../components/TaskList";

import {
  getDashboardSummary,
  getTasks,
  updateTaskStatus,
} from "../services/api";

import type { DashboardSummary, Task, TaskStatus } from "../types";
import "../styles/dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState<DashboardSummary>({
    total_employees: 0,
    total_tasks: 0,
    completed_tasks: 0,
    pending_tasks: 0,
  });

  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      setError("");

      const [summaryData, taskData] = await Promise.all([
        getDashboardSummary(),
        getTasks(),
      ]);

      setSummary(summaryData);
      setTasks(taskData);
    } catch {
      setError("Unable to load dashboard. Check the backend connection.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (
    id: number,
    status: TaskStatus
  ) => {
    try {
      await updateTaskStatus(id, status);
      await loadData();
    } catch {
      alert("Unable to update task status.");
    }
  };

  return (
    <div className="page-content">
      <div className="welcome-banner">
        <div>
          <span className="welcome-label">WORKSPACE OVERVIEW</span>
          <h2>Welcome to Explore 👋</h2>
          <p>
            Manage your employees, organize tasks, and track progress.
          </p>
        </div>

        <div className="welcome-decoration">
          <ArrowUpRight size={42} />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="section-title">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Live statistics from your workspace database</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Employees"
          value={summary.total_employees}
          icon={<Users size={23} />}
          color="blue"
          description="Registered team members"
        />

        <StatCard
          title="Total Tasks"
          value={summary.total_tasks}
          icon={<ClipboardList size={23} />}
          color="purple"
          description="Tasks created"
        />

        <StatCard
          title="Completed Tasks"
          value={summary.completed_tasks}
          icon={<CheckCircle2 size={23} />}
          color="green"
          description="Successfully completed"
        />

        <StatCard
          title="Pending Tasks"
          value={summary.pending_tasks}
          icon={<Clock3 size={23} />}
          color="orange"
          description="Waiting for completion"
        />
      </div>

      <div className="section-title">
        <div>
          <h2>Recent Tasks</h2>
          <p>Review and update task progress</p>
        </div>
      </div>

      <TaskList
        tasks={tasks.slice(0, 5)}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}

export default Dashboard;
