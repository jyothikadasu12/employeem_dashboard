
import { useEffect, useState } from "react";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/tasks.css";
import {
  getEmployees,
  getTasks,
  createTask,
  updateTaskStatus,
} from "../services/api";

import type {
  Employee,
  Task,
  TaskFormData,
  TaskStatus,
} from "../types";

function Tasks() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [error, setError] = useState("");

  const loadData = async () => {
    try {
      const [employeeData, taskData] = await Promise.all([
        getEmployees(),
        getTasks(),
      ]);

      setEmployees(employeeData);
      setTasks(taskData);
      setError("");
    } catch {
      setError("Unable to load task information.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateTask = async (data: TaskFormData) => {
    await createTask(data);
    await loadData();
  };

  const handleStatusChange = async (
    id: number,
    status: TaskStatus
  ) => {
    try {
      await updateTaskStatus(id, status);
      await loadData();
    } catch {
      setError("Unable to update task status.");
    }
  };

  return (
    <div className="page-content">
      <div className="page-intro">
        <div>
          <span className="welcome-label">WORK MANAGEMENT</span>
          <h2>Tasks</h2>
          <p>Create, assign, and monitor employee tasks.</p>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="task-layout">
        <TaskForm
          employees={employees}
          onSubmit={handleCreateTask}
        />

        <TaskList
          tasks={tasks}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
}

export default Tasks;
