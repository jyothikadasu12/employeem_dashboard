import { useState } from "react";
import { CalendarDays } from "lucide-react";

import type { Task, TaskStatus } from "../types";

interface Props {
  tasks: Task[];
  onStatusChange: (
    id: number,
    status: TaskStatus
  ) => Promise<void>;
}

function TaskList({ tasks, onStatusChange }: Props) {
  const [filter, setFilter] = useState("All");

  const filteredTasks = tasks.filter((task) =>
    filter === "All" ? true : task.status === filter
  );

  return (
    <div className="table-card">
      <div className="section-heading">
        <div>
          <h2>Task Overview</h2>
          <p>Track employee task progress</p>
        </div>

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>TASK</th>
              <th>ASSIGNED TO</th>
              <th>PRIORITY</th>
              <th>DUE DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>

          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task.id}>
                <td>
                  <strong>{task.title}</strong>
                  <p className="task-description">
                    {task.description}
                  </p>
                </td>

                <td>{task.employee_name}</td>

                <td>
                  <span
                    className={`priority-badge ${task.priority.toLowerCase()}`}
                  >
                    {task.priority}
                  </span>
                </td>

                <td>
                  <span className="date-cell">
                    <CalendarDays size={15} />
                    {task.due_date}
                  </span>
                </td>

                <td>
                  <select
                    className={`status-select ${task.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                    value={task.status}
                    onChange={(e) =>
                      onStatusChange(
                        task.id,
                        e.target.value as TaskStatus
                      )
                    }
                  >
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </td>
              </tr>
            ))}

            {filteredTasks.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">
                  No tasks available for this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskList;